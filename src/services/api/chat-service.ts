import type { ChatStreamEvent, ChatTurn } from "@/models/chat/chat";
import type { Citation } from "@/models/knowledge/knowledge-file";
import { PHONE_ID_HEADER } from "@/models/room/room-session";

type StreamHandlers = {
  onToken: (text: string) => void;
  // Room chats send the files an answer draws on before the answer itself.
  onSources?: (sources: Citation[]) => void;
  // Room chats: waiting for a free slot, answers kept short, or an urgent question's safety card.
  onStatus?: (event: Extract<ChatStreamEvent, { type: "waiting" | "busy" | "safety" }>) => void;
  // Sent as the phone's anonymous id, for the fair one-question-per-phone line.
  phoneId?: string;
  signal?: AbortSignal;
  // The host's Assistant by default; a Room's chat is /api/rooms/<id>/chat.
  url?: string;
};

export type ChatStreamResult = { model: string; tokensPerSecond: number | null };

/**
 * Sends the conversation to the host laptop's model and streams the reply.
 * Calls onToken for each piece of text. Throws with a readable message on failure,
 * and with an AbortError when the signal stops it.
 */
export async function streamChat(
  turns: ChatTurn[],
  { onToken, onSources, onStatus, phoneId, signal, url = "/api/chat" }: StreamHandlers,
): Promise<ChatStreamResult> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(phoneId ? { [PHONE_ID_HEADER]: phoneId } : {}) },
    body: JSON.stringify({ messages: turns }),
    signal,
  });
  if (!res.ok || !res.body) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "The assistant couldn’t take that message. Try again.");
  }

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  let result: ChatStreamResult | null = null;

  const handle = (raw: string) => {
    if (!raw.trim()) return;
    const event = JSON.parse(raw) as ChatStreamEvent;
    if (event.type === "token") onToken(event.text);
    else if (event.type === "sources") onSources?.(event.sources);
    else if (event.type === "waiting" || event.type === "busy" || event.type === "safety") onStatus?.(event);
    else if (event.type === "done") result = { model: event.model, tokensPerSecond: event.tokensPerSecond };
    else throw new Error(event.message);
  };

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    lines.forEach(handle);
  }
  handle(buffer);

  if (!result) throw new Error("The answer stopped before it finished. Try again.");
  return result;
}
