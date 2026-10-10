"use client";

import { useCallback, useEffect, useRef } from "react";
import { asksToCreateRoom, parseAssistantReply, roomDraftAction } from "@/lib/utils/assistant-actions";
import { clientId } from "@/lib/utils/client-id";
import { CHAT_LIMITS, type ChatTurn } from "@/models/chat/chat";
import type { RoomPresetId } from "@/models/room/room-preset";
import { streamChat } from "@/services/api/chat-service";
import { createRoom } from "@/services/api/knowledge-service";
import { requestRoomDraft } from "@/services/api/room-draft-service";
import { useAssistantStore } from "@/state/assistant-store";
import { useUploadStore } from "@/state/upload-store";

const newId = clientId;

// Short "go ahead" replies, in English and Filipino.
const PROCEED = /^\s*(proceed|go|go ahead|create it|make it|do it|yes|yep|ok|okay|sure|sige|tuloy|ituloy|gawin mo na|g)\b[\s.!]*$/i;
// Confirming or canceling a Room summary by typing instead of clicking.
const CONFIRM = /^\s*(yes|yep|yeah|confirm|confirmed|create it|go|go ahead|ok|okay|sure|sige|oo|opo|tama|tuloy)\b[\s.!]*$/i;
const CANCEL = /^\s*(no|nope|cancel|stop|don'?t|huwag|wag|hindi|ayaw)\b[\s.!]*$/i;
// The reply talks about the Room as created or asks to confirm it.
const ROOM_READY = /\b(created|naka-?create|nagawa|ginawa|nalikha|confirm|kumpirma)\b/i;

// Type words the host might use. The latest one the host said wins over the model's guess.
const TYPE_WORDS: [RegExp, RoomPresetId][] = [
  [/\b(emergency|evacuation|disaster|sakuna)\b/i, "emergency"],
  [/\b(barangay|help ?desk)\b/i, "barangay"],
  [/\b(office|workplace|company|opisina)\b/i, "office"],
  [/\b(class|classroom|school|klase|paaralan)\b/i, "class"],
  [/\bgeneral\b/i, "general"],
];

function typeFromHost(hostMessages: { content: string }[]): RoomPresetId | null {
  for (const { content } of [...hostMessages].reverse()) {
    const match = TYPE_WORDS.find(([pattern]) => pattern.test(content));
    if (match) return match[1];
  }
  return null;
}

const pendingConfirm = () =>
  [...useAssistantStore.getState().messages].reverse().find((m) => m.roomCreation?.status === "confirm");

// When the host asked for a Room and the reply has its details (an action line),
// the host said "proceed", or the reply asks to confirm, the app shows the details
// on a card and waits. Nothing is created until the host confirms.
async function prepareRoomFromReply(replyId: string) {
  const { messages, patchMessage } = useAssistantStore.getState();
  const index = messages.findIndex((m) => m.id === replyId);
  const reply = messages[index];
  if (!reply || reply.error) return;
  const hostMessages = messages.slice(0, index).filter((m) => m.role === "user").slice(-8);
  if (!hostMessages.some((m) => asksToCreateRoom(m.content))) return;

  let action = parseAssistantReply(reply.content).actions.find((a) => a.type === "create_room_now");
  const lastHost = hostMessages.at(-1)?.content ?? "";
  if (!action && !PROCEED.test(lastHost) && !ROOM_READY.test(reply.content)) return;

  try {
    if (!action) {
      // The reply forgot the action line: read the Room details from the chat itself.
      const turns = messages.slice(0, index + 1).filter((m) => !m.error && m.content).map(({ role, content }) => ({ role, content }));
      action = roomDraftAction(await requestRoomDraft(turns)) ?? undefined;
      if (!action) return;
    }
  } catch {
    return;
  }
  // A new summary replaces any older one still waiting.
  const older = pendingConfirm();
  if (older?.roomCreation?.status === "confirm") patchMessage(older.id, { roomCreation: { ...older.roomCreation, status: "replaced" } });
  const { name, rules, purpose } = action;
  const preset = typeFromHost(hostMessages) ?? action.preset;
  patchMessage(replyId, { roomCreation: { status: "confirm", draft: { name, preset, rules, purpose } } });
}

/** Creates the Room from a confirmed summary, through the Room service. */
export async function confirmRoom(messageId: string) {
  const { messages, patchMessage } = useAssistantStore.getState();
  const creation = messages.find((m) => m.id === messageId)?.roomCreation;
  if (creation?.status !== "confirm") return;
  const { draft } = creation;
  patchMessage(messageId, { roomCreation: { status: "creating", name: draft.name } });
  try {
    const room = await createRoom({ ...draft, fileIds: useUploadStore.getState().pending.map((f) => f.id) });
    useUploadStore.getState().clearPending();
    patchMessage(messageId, { roomCreation: { status: "created", name: room.name, roomId: room.id } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Couldn’t create the Room.";
    patchMessage(messageId, { roomCreation: { status: "failed", name: draft.name, error: message } });
  }
}

export function cancelRoom(messageId: string) {
  const { messages, patchMessage } = useAssistantStore.getState();
  const creation = messages.find((m) => m.id === messageId)?.roomCreation;
  if (creation?.status === "confirm") patchMessage(messageId, { roomCreation: { ...creation, status: "canceled" } });
}

export function useAssistantChat() {
  const messages = useAssistantStore((s) => s.messages);
  const streaming = useAssistantStore((s) => s.streaming);
  const abortRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => abortRef.current?.abort(), []);
  useEffect(() => stop, [stop]);

  const send = useCallback(async (text: string) => {
    const content = text.trim().slice(0, CHAT_LIMITS.maxMessageChars);
    const store = useAssistantStore.getState();
    if (!content || store.streaming) return;

    // A "yes" or "no" to a Room summary is handled here, without asking the model.
    const pending = pendingConfirm();
    if (pending && (CONFIRM.test(content) || CANCEL.test(content))) {
      const confirming = CONFIRM.test(content);
      store.addMessage({ id: newId(), role: "user", content });
      if (confirming) {
        await confirmRoom(pending.id);
      } else {
        cancelRoom(pending.id);
        store.addMessage({ id: newId(), role: "assistant", content: "Okay, I won’t create it. Tell me what to change, or ask me anything." });
      }
      return;
    }

    // Earlier answers that failed or were cut off aren't sent back to the model.
    const history: ChatTurn[] = store.messages
      .filter((m) => !m.error && m.content)
      .map(({ role, content }) => ({ role, content }));
    const turns = [...history, { role: "user" as const, content }].slice(-CHAT_LIMITS.maxMessages);

    const replyId = newId();
    store.addMessage({ id: newId(), role: "user", content });
    store.addMessage({ id: replyId, role: "assistant", content: "", streaming: true });
    store.setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const result = await streamChat(turns, {
        signal: controller.signal,
        onToken: (t) => useAssistantStore.getState().appendToMessage(replyId, t),
      });
      useAssistantStore.getState().finishMessage(replyId);
      useAssistantStore.getState().setTokensPerSecond(result.tokensPerSecond);
      void prepareRoomFromReply(replyId);
    } catch (error) {
      const message = controller.signal.aborted
        ? "Stopped."
        : error instanceof Error
          ? error.message
          : "Something went wrong. Try again.";
      useAssistantStore.getState().finishMessage(replyId, message);
    } finally {
      abortRef.current = null;
      useAssistantStore.getState().setStreaming(false);
    }
  }, []);

  // Starts over: stops any answer and forgets the conversation (it's only kept in this tab).
  const clear = useCallback(() => {
    stop();
    useAssistantStore.getState().clear();
  }, [stop]);

  return { messages, streaming, send, stop, clear, confirmRoom, cancelRoom };
}
