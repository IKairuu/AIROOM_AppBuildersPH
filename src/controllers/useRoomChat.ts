"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clientId } from "@/lib/utils/client-id";
import { phoneId } from "@/lib/utils/phone-id";
import { CHAT_LIMITS, type ChatMessage, type ChatTurn } from "@/models/chat/chat";
import { streamChat } from "@/services/api/chat-service";
import { useAssistantStore } from "@/state/assistant-store";

const newId = clientId;

// One Room's chat. The server puts each question in the fair line, searches only
// this Room's files, and sends the passages it used before the answer.
export function useRoomChat(roomId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  // The latest messages, for building the history inside send() without re-creating it.
  const historyRef = useRef<ChatMessage[]>([]);
  useEffect(() => {
    historyRef.current = messages;
  }, [messages]);

  const stop = useCallback(() => abortRef.current?.abort(), []);
  useEffect(() => stop, [stop]);

  const patch = (id: string, change: (m: ChatMessage) => ChatMessage) =>
    setMessages((ms) => ms.map((m) => (m.id === id ? change(m) : m)));

  const send = useCallback(
    async (text: string) => {
      const content = text.trim().slice(0, CHAT_LIMITS.maxMessageChars);
      if (!content || abortRef.current) return;

      const history: ChatTurn[] = historyRef.current
        .filter((m) => !m.error && m.content)
        .map(({ role, content }) => ({ role, content }));
      const turns = [...history, { role: "user" as const, content }].slice(-CHAT_LIMITS.maxMessages);
      const replyId = newId();
      setMessages((ms) => [
        ...ms,
        { id: newId(), role: "user", content, at: Date.now() },
        { id: replyId, role: "assistant", content: "", streaming: true, at: Date.now() },
      ]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const result = await streamChat(turns, {
          url: `/api/rooms/${encodeURIComponent(roomId)}/chat`,
          signal: controller.signal,
          phoneId: phoneId(),
          onSources: (sources) => patch(replyId, (m) => ({ ...m, sources })),
          onStatus: (event) =>
            patch(replyId, (m) =>
              event.type === "waiting"
                ? { ...m, waiting: true }
                : event.type === "busy"
                  ? { ...m, waiting: false, short: true }
                  : { ...m, safety: { title: event.title, lines: event.lines } },
            ),
          onToken: (t) => patch(replyId, (m) => ({ ...m, waiting: false, content: m.content + t })),
        });
        patch(replyId, (m) => ({ ...m, streaming: false }));
        useAssistantStore.getState().setTokensPerSecond(result.tokensPerSecond);
      } catch (error) {
        const message = controller.signal.aborted
          ? "Stopped."
          : error instanceof Error
            ? error.message
            : "Something went wrong. Try again.";
        patch(replyId, (m) => ({ ...m, streaming: false, waiting: false, error: message }));
      } finally {
        abortRef.current = null;
        setStreaming(false);
      }
    },
    [roomId],
  );

  // When the host ends the session, the phone forgets the conversation.
  const clear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
  }, []);

  return { messages, streaming, send, stop, clear };
}
