// A Room's session: phones can only ask while it's live. Ending it tells every
// phone to clear its chat (phone chats are never stored on the laptop).
export type RoomSessionState = "idle" | "live" | "ended";

export type RoomSession = {
  state: RoomSessionState;
  // Counts up each time the host starts this Room.
  number: number;
  startedAt: string | null;
  endedAt: string | null;
};

export const IDLE_SESSION: RoomSession = { state: "idle", number: 0, startedAt: null, endedAt: null };

// A phone's anonymous id, made on the phone and kept for its tab. It never holds a name or number.
export const PHONE_ID_PATTERN = /^[a-z0-9-]{8,64}$/;
export const PHONE_ID_HEADER = "x-airoom-phone";
