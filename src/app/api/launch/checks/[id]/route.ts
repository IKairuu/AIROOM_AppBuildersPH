import { connection, type NextRequest } from "next/server";
import { isLaunchCheckId } from "@/models/system/launch-check";
import { runLaunchCheck } from "@/services/system/launch-checks";

export async function GET(req: NextRequest, ctx: RouteContext<"/api/launch/checks/[id]">) {
  await connection();
  const { id } = await ctx.params;
  if (!isLaunchCheckId(id)) return Response.json({ error: "Unknown check" }, { status: 404 });

  const port = req.nextUrl.port || process.env.PORT || "80";
  const result = await runLaunchCheck(id, { port });
  return Response.json(result, { headers: { "Cache-Control": "no-store" } });
}
