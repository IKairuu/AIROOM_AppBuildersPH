import { KnowledgeError, saveUpload } from "@/services/knowledge/upload-store";

// Saves one file the host added, reads it and indexes it. It waits for a Room.
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Choose a file to upload." }, { status: 400 });

  try {
    return Response.json(await saveUpload(file), { status: 201 });
  } catch (error) {
    const message = error instanceof KnowledgeError ? error.message : "Couldn’t save the file. Try again.";
    return Response.json({ error: message }, { status: error instanceof KnowledgeError ? 400 : 500 });
  }
}
