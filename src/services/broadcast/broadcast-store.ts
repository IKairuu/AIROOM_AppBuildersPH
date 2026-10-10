// Server-only: broadcasts live in data/broadcasts.json, and phones get them live
// through an in-memory event hub (one Node process serves the whole room).
import { EventEmitter } from "node:events";
import {
  BROADCAST_TEXT_MAX,
  isBroadcastKind,
  type Broadcast,
  type BroadcastEvent,
  type SendBroadcastInput,
} from "@/models/broadcast/broadcast";
import { KnowledgeError } from "@/services/knowledge/upload-store";
import { dataPath, isSafeId, newId, readJson, writeJson } from "@/services/storage/data-store";

const FILE = () => dataPath("broadcasts.json");
const KEEP = 100;

// One hub for the whole server, even when Next loads this module more than once in development.
const store = globalThis as { __airoomBroadcasts?: EventEmitter };
const hub = (store.__airoomBroadcasts ??= new EventEmitter());
hub.setMaxListeners(500);

let queue: Promise<unknown> = Promise.resolve();
// Writes one at a time so two quick sends can't overwrite each other.
function serial<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

export async function listBroadcasts(): Promise<Broadcast[]> {
  return (await readJson<Broadcast[]>(FILE())) ?? [];
}

/**
 * Broadcasts a Room's phones should see: ones sent to this Room, and ones sent
 * to all Rooms after this Room was created. A new Room starts clean, without
 * older announcements, reminders, urgent messages or pinned answers.
 */
export async function broadcastsForRoom(room: { id: string; createdAt: string }): Promise<Broadcast[]> {
  return (await listBroadcasts()).filter(
    (b) => b.target === room.id || (b.target === "all" && b.sentAt >= room.createdAt),
  );
}

export function parseBroadcastInput(body: unknown): SendBroadcastInput {
  const b = (body ?? {}) as Record<string, unknown>;
  if (!isBroadcastKind(b.kind)) throw new KnowledgeError("Pick a type: announcement, reminder, urgent or pinned answer.");
  const text = typeof b.text === "string" ? b.text.trim().slice(0, BROADCAST_TEXT_MAX) : "";
  if (!text) throw new KnowledgeError("Type the message to send.");
  const target = b.target === "all" || isSafeId(b.target) ? (b.target as string) : null;
  if (!target) throw new KnowledgeError("Choose who gets it.");
  return { kind: b.kind, text, target };
}

export function sendBroadcast(input: SendBroadcastInput): Promise<Broadcast> {
  return serial(async () => {
    const broadcast: Broadcast = { id: newId(), ...input, sentAt: new Date().toISOString() };
    await writeJson(FILE(), [...(await listBroadcasts()), broadcast].slice(-KEEP));
    hub.emit("event", { type: "add", broadcast } satisfies BroadcastEvent);
    return broadcast;
  });
}

export function deleteBroadcast(id: string): Promise<boolean> {
  return serial(async () => {
    const all = await listBroadcasts();
    if (!all.some((b) => b.id === id)) return false;
    await writeJson(FILE(), all.filter((b) => b.id !== id));
    hub.emit("event", { type: "remove", id } satisfies BroadcastEvent);
    return true;
  });
}

/** Calls back with every new or removed broadcast. Returns the unsubscribe function. */
export function onBroadcastEvent(listener: (event: BroadcastEvent) => void): () => void {
  hub.on("event", listener);
  return () => {
    hub.off("event", listener);
  };
}
