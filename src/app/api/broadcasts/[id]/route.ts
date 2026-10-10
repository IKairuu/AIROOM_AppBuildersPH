import { deleteBroadcast } from "@/services/broadcast/broadcast-store";

// Takes a broadcast back (or unpins a pinned answer); phones drop it right away.
export async function DELETE(_req: Request, ctx: RouteContext<"/api/broadcasts/[id]">) {
  const deleted = await deleteBroadcast((await ctx.params).id);
  return deleted ? new Response(null, { status: 204 }) : Response.json({ error: "Not found" }, { status: 404 });
}
