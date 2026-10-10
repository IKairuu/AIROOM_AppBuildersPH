/** Ollama model tags AIROOM uses. Change them here, nowhere else. */
export const MODELS = {
  main: "gemma3:4b",
  vision: "gemma3:4b",
  lowPower: "gemma3:1b",
  embedding: "nomic-embed-text",
} as const;

export type ModelRole = keyof typeof MODELS;

export const OLLAMA_HOST = process.env.OLLAMA_HOST ?? "http://127.0.0.1:11434";
