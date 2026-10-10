import type { RoomFeedEvent } from "@/models/room/room-feed";
import { PHONE_ID_PATTERN } from "@/models/room/room-session";
import { broadcastsForRoom, onBroadcastEvent } from "@/services/broadcast/broadcast-store";
import { getSession, onSessionEvent, phoneConnected, phoneDisconnected } from "@/services/live/live-state";
import { getRoom } from "@/services/rooms/room-store";

const PING_MS = 25_000;

// A phone's live feed for its Room, as Server-Sent Events: its anonymous label
// and the session state first, then every broadcast and session change.
// While it's open, the phone counts as connected on the host's Queue & phones page.
export async function GET(req: Request, ctx: RouteContext<"/api/rooms/[id]/broadcasts">) {
  const room = await getRoom((await ctx.params).id);
  if (!room) return Response.json({ error: "Room not found" }, { status: 404 });
  const phoneParam = new URL(req.url).searchParams.get("phone") ?? "";
  const phoneId = PHONE_ID_PATTERN.test(phoneParam) ? phoneParam : null;

  const encoder = new TextEncoder();
  let cleanup = () => {};
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (chunk: string) => {
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          cleanup();
        }
      };
      const send = (event: RoomFeedEvent) => write(`data: ${JSON.stringify(event)}\n\n`);

      const label = phoneId ? phoneConnected(room.id, phoneId) : "Phone";
      send({ type: "hello", label, session: await getSession(room.id) });
      send({ type: "snapshot", broadcasts: await broadcastsForRoom(room) });
      const offBroadcasts = onBroadcastEvent((event) => {
        if (event.type === "add" && event.broadcast.target !== "all" && event.broadcast.target !== room.id) return;
        send(event);
      });
      const offSessions = onSessionEvent((event) => {
        if (event.roomId === room.id) send({ type: "session", session: event.session });
      });
      // Keeps the connection open through phones' and routers' idle timeouts.
      const ping = setInterval(() => write(": ping\n\n"), PING_MS);
      let closed = false;
      cleanup = () => {
        if (closed) return;
        closed = true;
        clearInterval(ping);
        offBroadcasts();
        offSessions();
        if (phoneId) phoneDisconnected(room.id, phoneId);
      };
      req.signal.addEventListener("abort", () => {
        cleanup();
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      });
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      Connection: "keep-alive",
    },
  });
}
