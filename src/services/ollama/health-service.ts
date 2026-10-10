import { MODELS, type ModelRole } from "@/lib/constants/models";
import type { HealthReport, ModelStatus } from "@/models/system/health";
import { normalizeTag as normalize, ollamaGet as getJson } from "@/services/ollama/ollama-client";

export async function checkOllamaHealth(): Promise<HealthReport> {
  const checkedAt = new Date().toISOString();
  const roles = Object.keys(MODELS) as ModelRole[];

  try {
    const [{ version }, { models }] = await Promise.all([
      getJson<{ version: string }>("/api/version"),
      getJson<{ models: { name: string }[] }>("/api/tags"),
    ]);
    const installed = new Set(models.map((m) => normalize(m.name)));
    const statuses: ModelStatus[] = roles.map((role) => ({
      role,
      name: MODELS[role],
      installed: installed.has(normalize(MODELS[role])),
    }));

    return {
      status: statuses.every((m) => m.installed) ? "ok" : "degraded",
      ollama: { reachable: true, version },
      models: statuses,
      checkedAt,
    };
  } catch {
    return {
      status: "down",
      ollama: { reachable: false, version: null },
      models: roles.map((role) => ({ role, name: MODELS[role], installed: false })),
      checkedAt,
    };
  }
}
