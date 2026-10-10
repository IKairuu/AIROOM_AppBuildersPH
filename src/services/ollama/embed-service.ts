// Server-only: turns text into vectors with the local embedding model.
import { Ollama } from "ollama";
import { MODELS, OLLAMA_HOST } from "@/lib/constants/models";

const ollama = new Ollama({ host: OLLAMA_HOST });
const BATCH = 32;

// nomic-embed-text expects these prefixes to tell passages and questions apart.
const DOC_PREFIX = "search_document: ";
const QUERY_PREFIX = "search_query: ";

async function embed(inputs: string[]): Promise<number[][]> {
  const vectors: number[][] = [];
  for (let i = 0; i < inputs.length; i += BATCH) {
    const { embeddings } = await ollama.embed({ model: MODELS.embedding, input: inputs.slice(i, i + BATCH) });
    vectors.push(...embeddings);
  }
  return vectors;
}

export const embedPassages = (texts: string[]) => embed(texts.map((t) => DOC_PREFIX + t));

export async function embedQuery(text: string): Promise<number[]> {
  const [vector] = await embed([QUERY_PREFIX + text]);
  return vector;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return na && nb ? dot / Math.sqrt(na * nb) : 0;
}
