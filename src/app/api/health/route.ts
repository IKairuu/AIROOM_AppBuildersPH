import { connection } from "next/server";
import { checkOllamaHealth } from "@/services/ollama/health-service";

export async function GET() {
  await connection();
  const report = await checkOllamaHealth();
  return Response.json(report, { status: report.status === "down" ? 503 : 200 });
}
