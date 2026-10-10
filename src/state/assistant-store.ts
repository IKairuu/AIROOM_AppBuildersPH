import { create } from "zustand";
import type { ChatMessage } from "@/models/chat/chat";

type AssistantState = {
  // The host's own chat with the assistant. In memory only, never saved.
  messages: ChatMessage[];
  streaming: boolean;
  // Speed of the last finished answer, shown in the top bar.
  tokensPerSecond: number | null;
  addMessage: (message: ChatMessage) => void;
  appendToMessage: (id: string, text: string) => void;
  finishMessage: (id: string, error?: string) => void;
  patchMessage: (id: string, patch: Partial<ChatMessage>) => void;
  setStreaming: (streaming: boolean) => void;
  setTokensPerSecond: (rate: number | null) => void;
  clear: () => void;
};

export const useAssistantStore = create<AssistantState>((set) => ({
  messages: [],
  streaming: false,
  tokensPerSecond: null,
  addMessage: (message) => set((s) => ({ messages: [...s.messages, message] })),
  appendToMessage: (id, text) =>
    set((s) => ({ messages: s.messages.map((m) => (m.id === id ? { ...m, content: m.content + text } : m)) })),
  finishMessage: (id, error) =>
    set((s) => ({ messages: s.messages.map((m) => (m.id === id ? { ...m, streaming: false, error } : m)) })),
  patchMessage: (id, patch) => set((s) => ({ messages: s.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)) })),
  setStreaming: (streaming) => set({ streaming }),
  setTokensPerSecond: (tokensPerSecond) => set({ tokensPerSecond }),
  clear: () => set({ messages: [], streaming: false }),
}));
