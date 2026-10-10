// Server-only helpers shared by the chat route handlers.
import { CHAT_LIMITS, type ChatStreamEvent, type ChatTurn } from "@/models/chat/chat";

// Accepts only user and assistant turns with bounded size. The system prompt is the server's.
export function parseChatTurns(body: unknown): ChatTurn[] | null {
  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > CHAT_LIMITS.maxMessages) return null;
  const turns: ChatTurn[] = [];
  for (const m of messages) {
    const { role, content } = (m ?? {}) as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.length > CHAT_LIMITS.maxMessageChars) return null;
    turns.push({ role, content });
  }
  return turns.at(-1)?.role === "user" && turns.at(-1)?.content.trim() ? turns : null;
}

/** An error whose message is written for the person chatting, so it's shown as is. */
export class ChatPublicError extends Error {}

/** Streams events as newline-delimited JSON. A failure becomes one readable error event. */
export function chatStreamResponse(
  events: () => AsyncIterable<ChatStreamEvent>,
  signal: AbortSignal,
  errorMessage: string,
): Response {
  const encoder = new TextEncoder();
  const line = (event: ChatStreamEvent) => encoder.encode(`${JSON.stringify(event)}\n`);

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of events()) controller.enqueue(line(event));
      } catch (error) {
        if (!signal.aborted) {
          const message = error instanceof ChatPublicError ? error.message : errorMessage;
          controller.enqueue(line({ type: "error", message }));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" },
  });
}
