import { connection } from "next/server";

// A tiny "is the server reachable here?" answer, used by the Launch server check.
export async function GET() {
  await connection();
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
