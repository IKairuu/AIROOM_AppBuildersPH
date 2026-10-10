import type { ChatStreamEvent } from "@/models/chat/chat";
import { PHONE_ID_HEADER, PHONE_ID_PATTERN } from "@/models/room/room-session";
import { chatStreamResponse, parseChatTurns } from "@/services/chat/chat-http";
import { enqueue, isRush, QueueError, type Ticket } from "@/services/live/answer-queue";
import { getSession, phoneLabel } from "@/services/live/live-state";
import { isUrgent, SAFETY_CARD } from "@/services/live/urgent";
import { getRoom } from "@/services/rooms/room-store";
import { streamRoomReply } from "@/services/rooms/room-chat-service";
import { newId } from "@/services/storage/data-store";

// A Room's chat. It works only while the host has the Room's session running,
// waits its turn in the fair queue, and searches only this Room's files.
export async function POST(req: Request, ctx: RouteContext<"/api/rooms/[id]/chat">) {
  const room = await getRoom((await ctx.params).id);
  if (!room) return Response.json({ error: "Room not found" }, { status: 404 });
  const turns = parseChatTurns(await req.json().catch(() => null));
  if (!turns) return Response.json({ error: "Invalid chat request" }, { status: 400 });

  const session = await getSession(room.id);
  if (session.state !== "live") {
    const error = session.state === "ended" ? "The host ended this session." : "The host hasn’t started this Room yet.";
    return Response.json({ error }, { status: 409 });
  }

  const header = req.headers.get(PHONE_ID_HEADER) ?? "";
  const phoneId = PHONE_ID_PATTERN.test(header) ? header : `anon-${newId()}`;
  const urgent = isUrgent(turns.at(-1)?.content ?? "");

  let ticket: Ticket;
  try {
    ticket = enqueue({ roomId: room.id, phoneId, phoneLabel: phoneLabel(room.id, phoneId), urgent, signal: req.signal });
  } catch (error) {
    if (error instanceof QueueError) return Response.json({ error: error.message }, { status: 429 });
    throw error;
  }

  async function* answer(): AsyncGenerator<ChatStreamEvent> {
    try {
      // The emergency card needs no AI, so it shows before anything else.
      if (urgent) yield { type: "safety", ...SAFETY_CARD };
      if (!ticket.startedRightAway) {
        yield { type: "waiting" };
        await ticket.ready;
      }
      const short = isRush();
      if (short) yield { type: "busy" };
      yield* streamRoomReply(room!, turns!, req.signal, { short });
    } finally {
      ticket.done();
    }
  }

  return chatStreamResponse(answer, req.signal, "Couldn’t get an answer. Check that Ollama is running, then try again.");
}
