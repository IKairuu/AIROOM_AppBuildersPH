import type { ChatTurn } from "@/models/chat/chat";
import type { RoomPresetId } from "./room-preset";

// The host describes the chatbot they want in a short chat; the model keeps
// a rules text up to date that the Room's chatbot will follow.
export type RulesBuilderRequest = {
  messages: ChatTurn[];
  rules: string;
  room: { name: string; preset: RoomPresetId; purpose: string };
};

export type RulesBuilderResponse = {
  // What the builder says back to the host.
  reply: string;
  rules: string;
};
