import type { RulesBuilderRequest, RulesBuilderResponse } from "@/models/room/room-rules";

/** Asks the laptop's model to update the Room's rules from the host's message. */
export async function requestRoomRules(req: RulesBuilderRequest, signal?: AbortSignal): Promise<RulesBuilderResponse> {
  const res = await fetch("/api/rooms/rules", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
    signal,
  });
  const body = (await res.json().catch(() => null)) as (RulesBuilderResponse & { error?: string }) | null;
  if (!res.ok || !body) throw new Error(body?.error ?? "Couldn’t update the rules. Try again.");
  return body;
}
