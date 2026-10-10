import { connection } from "next/server";
import { KnowledgeError } from "@/services/knowledge/upload-store";
import { createRoom, listRooms, parseCreateRoomInput } from "@/services/rooms/room-store";

export async function GET() {
  await connection();
  return Response.json(await listRooms(), { headers: { "Cache-Control": "no-store" } });
}

// Creates a Room and moves the chosen uploads into it.
export async function POST(req: Request) {
  try {
    const input = parseCreateRoomInput(await req.json().catch(() => null));
    return Response.json(await createRoom(input), { status: 201 });
  } catch (error) {
    const message = error instanceof KnowledgeError ? error.message : "Couldn’t create the Room. Try again.";
    return Response.json({ error: message }, { status: error instanceof KnowledgeError ? 400 : 500 });
  }
}
