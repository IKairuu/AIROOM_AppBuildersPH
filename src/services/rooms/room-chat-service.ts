// Server-only: answers questions in one Room from that Room's own files.
import type { ChatStreamEvent, ChatTurn } from "@/models/chat/chat";
import type { Citation, KnowledgeChunk } from "@/models/knowledge/knowledge-file";
import type { Room } from "@/models/room/room";
import { ROOM_PRESETS } from "@/models/room/room-preset";
import { broadcastsForRoom } from "@/services/broadcast/broadcast-store";
import { samplePassages, searchRoom } from "@/services/knowledge/retrieval";
import { streamChatReply } from "@/services/ollama/chat-service";

function roomPrompt(room: Room, passages: KnowledgeChunk[], pinned: string[], short: boolean): string {
  const preset = ROOM_PRESETS[room.preset];
  // Emergency Rooms stick to approved files; the others may fall back to general knowledge.
  const filesOnly = room.preset === "emergency";
  const lines = [
    `You are the AI in the AIROOM Room “${room.name}” (${preset.label}). It runs on a laptop with no internet, for the people in one room.`,
    `Purpose: ${room.purpose || preset.blurb}`,
    "Answer in the language the person writes in (English, Filipino or Taglish). Keep answers short and clear.",
  ];
  if (short) lines.push("Many people are asking right now: answer in at most 3 short sentences.");
  if (pinned.length > 0) {
    lines.push(
      "",
      "Official answers the host pinned for this Room. When a question matches one, give that answer:",
      ...pinned.map((p) => `- ${p}`),
    );
  }
  if (room.rules) {
    lines.push(
      "",
      "The host set these rules for this Room. Follow them in every reply, unless one asks for something harmful:",
      room.rules,
      "",
    );
  }
  if (passages.length > 0) {
    lines.push(
      "Use the numbered passages from this Room's files below. Cite the passage you used like [1] or [2] right after the fact.",
      filesOnly
        ? "If the passages don't answer the question, say the Room's files don't cover it. Don't use other knowledge."
        : "If the passages don't answer the question, say so in one short line, then answer from general knowledge.",
      "",
      ...passages.map((p, i) => `[${i + 1}] (${p.fileName}${p.page ? `, page ${p.page}` : ""})\n${p.text}`),
    );
  } else if (room.files.length > 0) {
    lines.push(
      filesOnly
        ? "This Room's files have nothing on this question. Say the Room's files don't cover it, and don't use other knowledge."
        : "This Room's files have nothing on this question. Start by saying the Room's files don't cover it, then answer from general knowledge.",
    );
  }
  return lines.join("\n");
}

export async function* streamRoomReply(
  room: Room,
  turns: ChatTurn[],
  signal: AbortSignal,
  { short = false }: { short?: boolean } = {},
): AsyncGenerator<ChatStreamEvent> {
  // The chatbot's last message helps find the right passage for short replies,
  // like a quiz answer ("chlorophyll") to the question it just asked.
  const lastReply = turns.findLast((t) => t.role === "assistant")?.content ?? "";
  const question = `${lastReply.slice(-500)}
${turns.at(-1)?.content ?? ""}`.trim();
  let passages = await searchRoom(room.id, question);
  // Rules like "be a quiz bot" need material even when the message names no topic ("start", "next").
  if (passages.length === 0 && room.rules && room.files.length > 0) passages = await samplePassages(room.id);
  const sources: Citation[] = passages.map((p, i) => ({ n: i + 1, fileName: p.fileName, page: p.page }));
  if (sources.length > 0) yield { type: "sources", sources };
  const pinned = (await broadcastsForRoom(room)).filter((b) => b.kind === "pinned").map((b) => b.text);
  yield* streamChatReply(turns, signal, roomPrompt(room, passages, pinned, short));
}
