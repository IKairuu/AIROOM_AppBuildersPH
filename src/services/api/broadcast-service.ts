import type { Broadcast, SendBroadcastInput } from "@/models/broadcast/broadcast";

async function errorMessage(res: Response, fallback: string): Promise<string> {
  const body = (await res.json().catch(() => null)) as { error?: string } | null;
  return body?.error ?? fallback;
}

export async function sendBroadcast(input: SendBroadcastInput): Promise<Broadcast> {
  const res = await fetch("/api/broadcasts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Couldn’t send it. Try again."));
  return (await res.json()) as Broadcast;
}

export async function deleteBroadcast(id: string): Promise<void> {
  const res = await fetch(`/api/broadcasts/${encodeURIComponent(id)}`, { method: "DELETE" });
  if (!res.ok && res.status !== 404) throw new Error(await errorMessage(res, "Couldn’t remove it. Try again."));
}

/**
 * A phone's live feed for one Room: host broadcasts and the session starting or
 * ending (Server-Sent Events; reconnects by itself). While open, the phone counts as connected.
 */
export function openRoomFeed(roomId: string, phoneId: string): EventSource {
  return new EventSource(`/api/rooms/${encodeURIComponent(roomId)}/broadcasts?phone=${encodeURIComponent(phoneId)}`);
}
