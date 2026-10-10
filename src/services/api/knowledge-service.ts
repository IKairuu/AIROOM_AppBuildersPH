import type { KnowledgeFile } from "@/models/knowledge/knowledge-file";
import type { CreateRoomInput, Room } from "@/models/room/room";

async function errorMessage(res: Response, fallback: string): Promise<string> {
  const body = (await res.json().catch(() => null)) as { error?: string } | null;
  return body?.error ?? fallback;
}

/** Uploads one file to the host laptop, which reads and indexes it. Throws a readable message. */
export async function uploadKnowledgeFile(file: File, signal?: AbortSignal): Promise<KnowledgeFile> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/uploads", { method: "POST", body: form, signal });
  if (!res.ok) throw new Error(await errorMessage(res, `Couldn’t upload “${file.name}”. Try again.`));
  return (await res.json()) as KnowledgeFile;
}

export async function deleteKnowledgeFile(id: string): Promise<void> {
  await fetch(`/api/uploads/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function createRoom(input: CreateRoomInput): Promise<Room> {
  const res = await fetch("/api/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Couldn’t create the Room. Try again."));
  return (await res.json()) as Room;
}

export async function deleteRoom(id: string): Promise<void> {
  const res = await fetch(`/api/rooms/${encodeURIComponent(id)}`, { method: "DELETE" });
  if (!res.ok && res.status !== 404) throw new Error(await errorMessage(res, "Couldn’t delete the Room. Try again."));
}

export async function saveHotspot(ssid: string, password: string): Promise<void> {
  const res = await fetch("/api/hotspot", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ssid, password }),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Couldn’t save the Wi-Fi details. Try again."));
}

export async function renameRoom(id: string, name: string): Promise<Room> {
  const res = await fetch(`/api/rooms/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Couldn’t rename the Room."));
  return (await res.json()) as Room;
}
