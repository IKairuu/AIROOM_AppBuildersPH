import { connection } from "next/server";
import { getSystemStatus } from "@/services/system/status-service";

// The host's top-bar status: internet, battery, the model answering, and its latest speed.
export async function GET() {
  await connection();
  return Response.json(await getSystemStatus(), { headers: { "Cache-Control": "no-store" } });
}
