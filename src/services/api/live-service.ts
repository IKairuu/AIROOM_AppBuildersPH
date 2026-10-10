import type { QueueSnapshot } from "@/models/queue/queue";
import type { RoomSession } from "@/models/room/room-session";

export async function fetchQueueSnapshot(signal?: AbortSignal): Promise<QueueSnapshot> {
  const res = await fetch("/api/queue", { cache: "no-store", signal });
  if (!res.ok) throw new Error("Couldn’t load the queue.");
  return (await res.json()) as QueueSnapshot;
}

export async function setRoomSession(roomId: string, action: "start" | "end"): Promise<RoomSession> {
  const res = await fetch(`/api/rooms/${encodeURIComponent(roomId)}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error(action === "start" ? "Couldn’t start the session." : "Couldn’t end the session.");
  return (await res.json()) as RoomSession;
}

export async function skipQuestion(id: string): Promise<void> {
  await fetch(`/api/queue/${encodeURIComponent(id)}`, { method: "DELETE" });
}
