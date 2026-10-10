import type { ChatTurn } from "@/models/chat/chat";

export type RoomDraftResponse = { name: string; preset: string; rules: string; purpose: string };

/** Asks the laptop's model which Room the host asked for in the Assistant chat. */
export async function requestRoomDraft(turns: ChatTurn[]): Promise<RoomDraftResponse> {
  const res = await fetch("/api/assistant/room-draft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // The chat endpoint's rules apply: it must end with a host message.
    body: JSON.stringify({ messages: [...turns, { role: "user", content: "Which Room should be created?" }] }),
  });
  const body = (await res.json().catch(() => null)) as (RoomDraftResponse & { error?: string }) | null;
  if (!res.ok || !body) throw new Error(body?.error ?? "Couldn’t read the Room details.");
  return body;
}
