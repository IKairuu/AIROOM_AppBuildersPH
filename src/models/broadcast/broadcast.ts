// A message the host sends to every phone, shown in the phone chat as from "Host".
export const BROADCAST_KINDS = {
  announcement: { label: "Announcement" },
  reminder: { label: "Reminder" },
  urgent: { label: "Urgent" },
  // Stays at the top of every phone's chat until the host removes it. The Room's
  // chatbot also treats it as the official answer.
  pinned: { label: "Pinned answer" },
} as const;

export type BroadcastKind = keyof typeof BROADCAST_KINDS;

export const BROADCAST_TEXT_MAX = 600;

export type Broadcast = {
  id: string;
  kind: BroadcastKind;
  text: string;
  // A Room id, or "all" for every Room.
  target: string;
  sentAt: string;
};

export type SendBroadcastInput = Pick<Broadcast, "kind" | "text" | "target">;

// What a phone's live feed receives.
export type BroadcastEvent =
  | { type: "snapshot"; broadcasts: Broadcast[] }
  | { type: "add"; broadcast: Broadcast }
  | { type: "remove"; id: string };

export function isBroadcastKind(value: unknown): value is BroadcastKind {
  return typeof value === "string" && value in BROADCAST_KINDS;
}
