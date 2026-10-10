import { connection } from "next/server";
import { KnowledgeError } from "@/services/knowledge/upload-store";
import { getSettingsView, updateSettings } from "@/services/system/settings-service";

export async function GET() {
  await connection();
  return Response.json(await getSettingsView(), { headers: { "Cache-Control": "no-store" } });
}

// Saves part of the settings (your name, model choice) and returns the updated view.
export async function PATCH(req: Request) {
  try {
    await updateSettings(await req.json().catch(() => null));
    return Response.json(await getSettingsView());
  } catch (error) {
    const message = error instanceof KnowledgeError ? error.message : "Couldn’t save. Try again.";
    return Response.json({ error: message }, { status: error instanceof KnowledgeError ? 400 : 500 });
  }
}
