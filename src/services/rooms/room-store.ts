// Server-only: Rooms live in data/rooms/<id>/. room.json describes the Room,
// files/<fileId>/ holds its files, and index.json holds every passage with its vector.
// A Room's files are moved in when it's created, so no other Room can search them.
import { mkdir, readdir, rename, rm } from "node:fs/promises";
import { KNOWLEDGE_LIMITS, type KnowledgeChunk, type KnowledgeFile } from "@/models/knowledge/knowledge-file";
import type { CreateRoomInput, Room } from "@/models/room/room";
import { isRoomPresetId, ROOM_NAME_MAX, ROOM_PURPOSE_MAX, ROOM_RULES_MAX } from "@/models/room/room-preset";
import { KnowledgeError, getUpload, uploadDir } from "@/services/knowledge/upload-store";
import { dataPath, isSafeId, newId, readJson, writeJson } from "@/services/storage/data-store";

const roomFile = (id: string) => dataPath("rooms", id, "room.json");
const indexFile = (id: string) => dataPath("rooms", id, "index.json");

/** Checks what the browser sent. Throws KnowledgeError with a message to show. */
export function parseCreateRoomInput(body: unknown): CreateRoomInput {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim().slice(0, ROOM_NAME_MAX) : "";
  if (!name) throw new KnowledgeError("Give the Room a name.");
  if (!isRoomPresetId(b.preset)) throw new KnowledgeError("Pick a Room type.");
  const purpose = typeof b.purpose === "string" ? b.purpose.trim().slice(0, ROOM_PURPOSE_MAX) : "";
  const rules = typeof b.rules === "string" ? b.rules.trim().slice(0, ROOM_RULES_MAX) : "";
  const fileIds = Array.isArray(b.fileIds) ? [...new Set(b.fileIds.filter(isSafeId))] : [];
  if (fileIds.length > KNOWLEDGE_LIMITS.maxFilesPerRoom) {
    throw new KnowledgeError(`A Room can have up to ${KNOWLEDGE_LIMITS.maxFilesPerRoom} files.`);
  }
  return { name, preset: b.preset, purpose, rules, fileIds };
}

export async function createRoom(input: CreateRoomInput): Promise<Room> {
  const files: KnowledgeFile[] = [];
  for (const fileId of input.fileIds) {
    const meta = await getUpload(fileId);
    if (!meta) throw new KnowledgeError("One of the files is gone. Remove it and add it again.");
    files.push(meta);
  }

  const id = newId();
  await mkdir(dataPath("rooms", id, "files"), { recursive: true });
  const index: KnowledgeChunk[] = [];
  for (const file of files) {
    const target = dataPath("rooms", id, "files", file.id);
    await rename(uploadDir(file.id), target);
    index.push(...((await readJson<KnowledgeChunk[]>(dataPath("rooms", id, "files", file.id, "chunks.json"))) ?? []));
  }

  const room: Room = {
    id,
    name: input.name,
    preset: input.preset,
    purpose: input.purpose,
    rules: input.rules,
    files,
    createdAt: new Date().toISOString(),
  };
  await writeJson(indexFile(id), index);
  await writeJson(roomFile(id), room);
  return room;
}

export async function getRoom(id: string): Promise<Room | null> {
  return isSafeId(id) ? readJson<Room>(roomFile(id)) : null;
}

// A Room's index never changes after it's created, so it's read from disk once.
const indexCache = new Map<string, KnowledgeChunk[]>();

export async function getRoomIndex(id: string): Promise<KnowledgeChunk[]> {
  if (!isSafeId(id)) return [];
  const cached = indexCache.get(id);
  if (cached) return cached;
  const index = await readJson<KnowledgeChunk[]>(indexFile(id));
  if (index) indexCache.set(id, index);
  return index ?? [];
}

export async function listRooms(): Promise<Room[]> {
  let ids: string[];
  try {
    ids = await readdir(dataPath("rooms"));
  } catch {
    return [];
  }
  const rooms = await Promise.all(ids.filter(isSafeId).map(getRoom));
  return rooms
    .filter((r): r is Room => r !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Deletes a Room with its files and index. Returns false when there's no such Room. */
export async function deleteRoom(id: string): Promise<boolean> {
  if (!(await getRoom(id))) return false;
  indexCache.delete(id);
  await rm(dataPath("rooms", id), { recursive: true, force: true });
  return true;
}

/** Renames a Room. Throws KnowledgeError with a message to show. */
export async function renameRoom(id: string, name: unknown): Promise<Room | null> {
  const room = await getRoom(id);
  if (!room) return null;
  const clean = typeof name === "string" ? name.trim().slice(0, ROOM_NAME_MAX) : "";
  if (!clean) throw new KnowledgeError("Give the Room a name.");
  const updated = { ...room, name: clean };
  await writeJson(roomFile(id), updated);
  return updated;
}
