import { cancelRoom } from "@/services/live/answer-queue";
import { endSession, startSession } from "@/services/live/live-state";
import { getRoom } from "@/services/rooms/room-store";

// The host starts or ends a Room's session. Phones see the change right away.
export async function POST(req: Request, ctx: RouteContext<"/api/rooms/[id]/session">) {
  const room = await getRoom((await ctx.params).id);
  if (!room) return Response.json({ error: "Room not found" }, { status: 404 });
  const { action } = ((await req.json().catch(() => null)) ?? {}) as { action?: unknown };
  if (action === "start") return Response.json(await startSession(room.id));
  if (action === "end") {
    cancelRoom(room.id);
    return Response.json(await endSession(room.id));
  }
  return Response.json({ error: "Use start or end." }, { status: 400 });
}
