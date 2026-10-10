// Server-only: what's happening in each Room right now. Sessions are saved in
// data/sessions.json so a restart remembers which Rooms are live; connected
// phones live in memory only. One Node process serves the whole room, so a
// single shared object (kept on globalThis for development reloads) is enough.
import { EventEmitter } from "node:events";
import { IDLE_SESSION, type RoomSession } from "@/models/room/room-session";
import { dataPath, readJson, writeJson } from "@/services/storage/data-store";

type Phone = { label: string; joinedAt: string; connections: number; leaveTimer?: ReturnType<typeof setTimeout> };

type LiveState = {
  sessions: Map<string, RoomSession> | null;
  // roomId → phone id → phone
  phones: Map<string, Map<string, Phone>>;
  // roomId → how many phones have joined this session (for "Phone 07" labels)
  joined: Map<string, number>;
  events: EventEmitter;
};

const g = globalThis as { __airoomLive?: LiveState };
const live = (g.__airoomLive ??= { sessions: null, phones: new Map(), joined: new Map(), events: new EventEmitter() });
live.events.setMaxListeners(1000);

// A phone that drops off (screen lock, Wi-Fi blip) counts as connected for this long.
const LEAVE_GRACE_MS = 20_000;
const FILE = () => dataPath("sessions.json");

export type SessionEvent = { roomId: string; session: RoomSession };

async function sessions(): Promise<Map<string, RoomSession>> {
  if (!live.sessions) {
    const saved = (await readJson<Record<string, RoomSession>>(FILE())) ?? {};
    live.sessions = new Map(Object.entries(saved));
  }
  return live.sessions;
}

async function save() {
  await writeJson(FILE(), Object.fromEntries(await sessions()));
}

export async function getSession(roomId: string): Promise<RoomSession> {
  return (await sessions()).get(roomId) ?? IDLE_SESSION;
}

export async function startSession(roomId: string): Promise<RoomSession> {
  const all = await sessions();
  const current = all.get(roomId) ?? IDLE_SESSION;
  if (current.state === "live") return current;
  const session: RoomSession = { state: "live", number: current.number + 1, startedAt: new Date().toISOString(), endedAt: null };
  all.set(roomId, session);
  live.joined.set(roomId, 0);
  // Phones already on the page get new labels for the new session.
  for (const phone of live.phones.get(roomId)?.values() ?? []) phone.label = nextLabel(roomId);
  await save();
  live.events.emit("session", { roomId, session } satisfies SessionEvent);
  return session;
}

export async function endSession(roomId: string): Promise<RoomSession> {
  const all = await sessions();
  const current = all.get(roomId) ?? IDLE_SESSION;
  const session: RoomSession = { ...current, state: "ended", endedAt: new Date().toISOString() };
  all.set(roomId, session);
  await save();
  live.events.emit("session", { roomId, session } satisfies SessionEvent);
  return session;
}

/** Forgets a deleted Room's session and phones. */
export async function forgetRoom(roomId: string): Promise<void> {
  (await sessions()).delete(roomId);
  live.phones.delete(roomId);
  live.joined.delete(roomId);
  await save();
}

export function onSessionEvent(listener: (event: SessionEvent) => void): () => void {
  live.events.on("session", listener);
  return () => {
    live.events.off("session", listener);
  };
}

function nextLabel(roomId: string): string {
  const n = (live.joined.get(roomId) ?? 0) + 1;
  live.joined.set(roomId, n);
  return `Phone ${String(n).padStart(2, "0")}`;
}

/** A phone opened the Room's live feed. Returns its anonymous label, like "Phone 03". */
export function phoneConnected(roomId: string, phoneId: string): string {
  const room = live.phones.get(roomId) ?? new Map<string, Phone>();
  live.phones.set(roomId, room);
  const phone = room.get(phoneId);
  if (phone) {
    clearTimeout(phone.leaveTimer);
    phone.connections += 1;
    return phone.label;
  }
  const label = nextLabel(roomId);
  room.set(phoneId, { label, joinedAt: new Date().toISOString(), connections: 1 });
  return label;
}

export function phoneDisconnected(roomId: string, phoneId: string): void {
  const phone = live.phones.get(roomId)?.get(phoneId);
  if (!phone) return;
  phone.connections -= 1;
  if (phone.connections > 0) return;
  phone.leaveTimer = setTimeout(() => {
    if (phone.connections <= 0) live.phones.get(roomId)?.delete(phoneId);
  }, LEAVE_GRACE_MS);
}

/** The phone's label in this Room, joining it if it isn't connected (a question without the feed open). */
export function phoneLabel(roomId: string, phoneId: string): string {
  return live.phones.get(roomId)?.get(phoneId)?.label ?? "Phone";
}

export function connectedPhones(): { roomId: string; phoneId: string; label: string; joinedAt: string }[] {
  return [...live.phones.entries()].flatMap(([roomId, room]) =>
    [...room.entries()].map(([phoneId, p]) => ({ roomId, phoneId, label: p.label, joinedAt: p.joinedAt })),
  );
}

export async function allSessions(): Promise<Map<string, RoomSession>> {
  return sessions();
}
