import { skip } from "@/services/live/answer-queue";

// The host skips a waiting question; the phone is told it can ask again.
export async function DELETE(_req: Request, ctx: RouteContext<"/api/queue/[id]">) {
  const skipped = skip((await ctx.params).id);
  return skipped ? new Response(null, { status: 204 }) : Response.json({ error: "Already started or done" }, { status: 404 });
}
