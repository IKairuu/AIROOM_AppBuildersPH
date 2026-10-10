import { parseChatTurns } from "@/services/chat/chat-http";
import { extractRoomDraft } from "@/services/rooms/room-draft-service";

// Reads the Assistant chat and returns the Room the host asked for, so it can be created.
export async function POST(req: Request) {
  const turns = parseChatTurns(await req.json().catch(() => null));
  if (!turns) return Response.json({ error: "Invalid request" }, { status: 400 });
  try {
    return Response.json(await extractRoomDraft(turns));
  } catch {
    return Response.json({ error: "Couldn’t read the Room details. Try again." }, { status: 503 });
  }
}
