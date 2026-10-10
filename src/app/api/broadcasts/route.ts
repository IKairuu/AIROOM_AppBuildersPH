import { connection } from "next/server";
import { listBroadcasts, parseBroadcastInput, sendBroadcast } from "@/services/broadcast/broadcast-store";
import { KnowledgeError } from "@/services/knowledge/upload-store";

export async function GET() {
  await connection();
  return Response.json(await listBroadcasts(), { headers: { "Cache-Control": "no-store" } });
}

// The host sends an announcement, reminder, urgent message or pinned answer to phones.
export async function POST(req: Request) {
  try {
    const input = parseBroadcastInput(await req.json().catch(() => null));
    return Response.json(await sendBroadcast(input), { status: 201 });
  } catch (error) {
    const message = error instanceof KnowledgeError ? error.message : "Couldn’t send it. Try again.";
    return Response.json({ error: message }, { status: error instanceof KnowledgeError ? 400 : 500 });
  }
}
