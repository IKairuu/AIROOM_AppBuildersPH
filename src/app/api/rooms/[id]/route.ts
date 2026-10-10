import { connection } from "next/server";
import { cancelRoom } from "@/services/live/answer-queue";
import { forgetRoom } from "@/services/live/live-state";
import { KnowledgeError } from "@/services/knowledge/upload-store";
import { deleteRoom, getRoom, renameRoom } from "@/services/rooms/room-store";

export async function GET(_req: Request, ctx: RouteContext<"/api/rooms/[id]">) {
  await connection();
  const room = await getRoom((await ctx.params).id);
  if (!room) return Response.json({ error: "Room not found" }, { status: 404 });
  return Response.json(room, { headers: { "Cache-Control": "no-store" } });
}

// Removes the Room, its files and its index from the laptop.
export async function DELETE(_req: Request, ctx: RouteContext<"/api/rooms/[id]">) {
  const id = (await ctx.params).id;
  const deleted = await deleteRoom(id);
  if (!deleted) return Response.json({ error: "Room not found" }, { status: 404 });
  cancelRoom(id);
  await forgetRoom(id);
  return new Response(null, { status: 204 });
}

// Renames the Room. Phones see the new name the next time they load the page.
export async function PATCH(req: Request, ctx: RouteContext<"/api/rooms/[id]">) {
  try {
    const body = (await req.json().catch(() => null)) as { name?: unknown } | null;
    const room = await renameRoom((await ctx.params).id, body?.name);
    return room ? Response.json(room) : Response.json({ error: "Room not found" }, { status: 404 });
  } catch (error) {
    const message = error instanceof KnowledgeError ? error.message : "Couldn’t rename the Room.";
    return Response.json({ error: message }, { status: error instanceof KnowledgeError ? 400 : 500 });
  }
}
