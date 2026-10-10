import { connection } from "next/server";
import { getQueueSnapshot } from "@/services/live/queue-snapshot";

// The host's Queue & phones page polls this. Never includes question text.
export async function GET() {
  await connection();
  return Response.json(await getQueueSnapshot(), { headers: { "Cache-Control": "no-store" } });
}
