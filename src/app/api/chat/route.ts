import { chatStreamResponse, parseChatTurns } from "@/services/chat/chat-http";
import { getChatModel, streamChatReply } from "@/services/ollama/chat-service";

// The host's own Assistant chat on the dashboard.
export async function POST(req: Request) {
  const turns = parseChatTurns(await req.json().catch(() => null));
  if (!turns) return Response.json({ error: "Invalid chat request" }, { status: 400 });

  return chatStreamResponse(
    () => streamChatReply(turns, req.signal),
    req.signal,
    `Couldn’t get an answer from ${await getChatModel()}. Check that Ollama is running, then try again.`,
  );
}
