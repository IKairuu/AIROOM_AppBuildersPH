import { OLLAMA_HOST } from "@/lib/constants/models";

const TIMEOUT_MS = 3000;

export async function ollamaGet<T>(path: string): Promise<T> {
  const res = await fetch(`${OLLAMA_HOST}${path}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Ollama ${path} returned ${res.status}`);
  return res.json() as Promise<T>;
}

/** Tags without an explicit version are stored by Ollama as `<name>:latest`. */
export function normalizeTag(tag: string): string {
  return tag.includes(":") ? tag : `${tag}:latest`;
}

export type OllamaModel = { name: string; size: number };

export type OllamaInventory = {
  version: string;
  // Every model pulled onto this laptop, keyed by normalized tag.
  installed: Map<string, OllamaModel>;
  // Models loaded in memory right now (from /api/ps).
  loaded: Set<string>;
};

/** Throws when Ollama isn't reachable. */
export async function getOllamaInventory(): Promise<OllamaInventory> {
  const [{ version }, tags, ps] = await Promise.all([
    ollamaGet<{ version: string }>("/api/version"),
    ollamaGet<{ models: OllamaModel[] }>("/api/tags"),
    ollamaGet<{ models: { name: string }[] }>("/api/ps"),
  ]);
  return {
    version,
    installed: new Map(tags.models.map((m) => [normalizeTag(m.name), m])),
    loaded: new Set(ps.models.map((m) => normalizeTag(m.name))),
  };
}
