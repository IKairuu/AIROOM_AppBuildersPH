import type { RoomSession } from "@/models/room/room-session";

// How busy times work (from the AIROOM plan):
// - Up to MAX_ANSWERING answers are written at the same time; the rest start within seconds.
// - Each phone asks one question at a time, so nobody can flood the room.
// - Urgent questions (drowning, bleeding, fire…) go first and show hotlines instantly.
// - When more than RUSH_AT questions are waiting or being answered, answers are kept short.
export const QUEUE_RULES = {
  maxAnswering: 4,
  rushAt: 6,
} as const;

export type QueueItemStatus = "waiting" | "answering";

// What the host sees about a question: never its text.
export type QueueItem = {
  id: string;
  roomId: string;
  phoneLabel: string;
  status: QueueItemStatus;
  urgent: boolean;
  askedAt: string;
};

export type ConnectedPhone = {
  label: string;
  roomId: string;
  joinedAt: string;
  asking: boolean;
};

export type RoomLiveStatus = {
  roomId: string;
  name: string;
  session: RoomSession;
  phones: number;
};

// The host's Queue & phones view.
export type QueueSnapshot = {
  items: QueueItem[];
  phones: ConnectedPhone[];
  rooms: RoomLiveStatus[];
  answering: number;
  waiting: number;
  rush: boolean;
  // Urgent questions answered in the last few minutes, so the host checks on people.
  recentUrgent: number;
  answeredToday: number;
};
