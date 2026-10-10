// Server-only: finds the passages in one Room's files that best match a question.
import type { KnowledgeChunk } from "@/models/knowledge/knowledge-file";
import { cosineSimilarity, embedQuery } from "@/services/ollama/embed-service";
import { getRoomIndex } from "@/services/rooms/room-store";

const TOP_K = 4;
// Below this, a passage is too far from the question to help.
const MIN_SCORE = 0.45;

export async function searchRoom(roomId: string, question: string): Promise<KnowledgeChunk[]> {
  const index = await getRoomIndex(roomId);
  if (index.length === 0) return [];
  const query = await embedQuery(question);
  return index
    .map((chunk) => ({ chunk, score: cosineSimilarity(query, chunk.vector) }))
    .filter((r) => r.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K)
    .map((r) => r.chunk);
}

// A few random passages, for turns where the question names no topic
// ("start the quiz", "next") but the Room's rules still need material.
export async function samplePassages(roomId: string, count = 3): Promise<KnowledgeChunk[]> {
  const index = await getRoomIndex(roomId);
  const picked = new Set<number>();
  while (picked.size < Math.min(count, index.length)) picked.add(Math.floor(Math.random() * index.length));
  return [...picked].map((i) => index[i]);
}
