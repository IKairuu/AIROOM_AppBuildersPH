import type { BroadcastEvent } from "@/models/broadcast/broadcast";
import type { RoomSession } from "./room-session";

// What a phone's live feed for its Room receives: host broadcasts, the Room's
// session starting or ending, and (once, on connect) this phone's anonymous label.
export type RoomFeedEvent =
  | BroadcastEvent
  | { type: "session"; session: RoomSession }
  | { type: "hello"; label: string; session: RoomSession };
