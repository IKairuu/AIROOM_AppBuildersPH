"use client";

import { useCallback, useState } from "react";
import type { RoomDraft } from "@/controllers/useCreateRoomWizard";
import { clientId } from "@/lib/utils/client-id";
import { CHAT_LIMITS, type ChatMessage } from "@/models/chat/chat";
import { requestRoomRules } from "@/services/api/room-rules-service";

// The Rules step's chat. Each host message goes to the model with the current
// rules; the model answers and returns the updated rules, which replace the draft's.
export function useRulesBuilder(draft: RoomDraft, setRules: (rules: string) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim().slice(0, CHAT_LIMITS.maxMessageChars);
      if (!content || busy) return;
      const userMessage: ChatMessage = { id: clientId(), role: "user", content };
      const history = [...messages.filter((m) => !m.error), userMessage]
        .map(({ role, content }) => ({ role, content }))
        .slice(-CHAT_LIMITS.maxMessages);
      setMessages((ms) => [...ms, userMessage]);
      setBusy(true);
      try {
        const { reply, rules } = await requestRoomRules({
          messages: history,
          rules: draft.rules,
          room: { name: draft.name, preset: draft.preset, purpose: draft.purpose },
        });
        setRules(rules);
        setMessages((ms) => [...ms, { id: clientId(), role: "assistant", content: reply }]);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Couldn’t update the rules.";
        setMessages((ms) => [...ms, { id: clientId(), role: "assistant", content: "", error: message }]);
      } finally {
        setBusy(false);
      }
    },
    [busy, draft, messages, setRules],
  );

  return { messages, busy, send };
}
