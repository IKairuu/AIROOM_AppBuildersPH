import type { RoomCreation } from "@/models/chat/assistant-action";
import type { Citation } from "@/models/knowledge/knowledge-file";

export type ChatRole = "user" | "assistant";

// What the client sends: the conversation so far. The server adds its own system prompt.
export type ChatTurn = { role: ChatRole; content: string };

export type ChatMessage = ChatTurn & {
  id: string;
  // True while the reply is still streaming in.
  streaming?: boolean;
  // Set when the reply stopped early (model error or the host pressed Stop).
  error?: string;
  // When it was added on this device (ms), to place host broadcasts among messages.
  at?: number;
  // Room chats: waiting for a free slot, kept short because it's busy, or an emergency card.
  waiting?: boolean;
  short?: boolean;
  safety?: { title: string; lines: string[] };
  // The Room files the answer drew on, numbered as the model cites them ([1], [2]).
  sources?: Citation[];
  // Assistant chat: a Room it created for the host from this reply.
  roomCreation?: RoomCreation;
};

export type ChatRequestBody = { messages: ChatTurn[] };

// The /api/chat response is newline-delimited JSON, one event per line.
export type ChatStreamEvent =
  | { type: "sources"; sources: Citation[] }
  // Room chats only: the question is waiting for a free slot ("Many people are asking right now").
  | { type: "waiting" }
  // Room chats only: answers are kept short because the room is busy.
  | { type: "busy" }
  // Room chats only: an urgent question gets this pre-written card right away, before any AI.
  | { type: "safety"; title: string; lines: string[] }
  | { type: "token"; text: string }
  | { type: "done"; model: string; tokensPerSecond: number | null }
  | { type: "error"; message: string };

export const CHAT_LIMITS = {
  maxMessages: 40,
  maxMessageChars: 8000,
} as const;
