import type { RoomPresetId } from "@/models/room/room-preset";

// Actions the Assistant can put in a reply (add new ones here, in the parser in
// lib/utils/assistant-actions.ts and in AssistantActionCard):
// - create_room: a card with a button that opens Room setup, prefilled.
// - create_room_now: the host agreed on a name and rules in chat, so the app
//   creates the Room right away and confirms it once it's saved.
export type AssistantAction =
  | { type: "create_room"; name?: string; preset?: RoomPresetId }
  | { type: "create_room_now"; name: string; preset: RoomPresetId; rules: string; purpose: string };

export type AssistantActionType = AssistantAction["type"];

// A reply split into the text to show and the actions found in it.
export type ParsedAssistantReply = {
  text: string;
  actions: AssistantAction[];
};

// The Room the host is about to create from the chat.
export type RoomDraftDetails = { name: string; preset: RoomPresetId; rules: string; purpose: string };

// What happened to a Room the Assistant was asked to create. It's only created
// after the host confirms the details ("confirm"), on the card or by saying yes.
export type RoomCreation =
  | { status: "confirm"; draft: RoomDraftDetails }
  // An older summary: the host changed something, confirmed or canceled it.
  | { status: "replaced" | "canceled"; draft: RoomDraftDetails }
  | { status: "creating"; name: string }
  | { status: "created"; name: string; roomId: string }
  | { status: "failed"; name: string; error: string };
