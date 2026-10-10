import { deleteUpload } from "@/services/knowledge/upload-store";

// Removes an uploaded file that hasn't gone into a Room.
export async function DELETE(_req: Request, ctx: RouteContext<"/api/uploads/[id]">) {
  const { id } = await ctx.params;
  await deleteUpload(id);
  return new Response(null, { status: 204 });
}
