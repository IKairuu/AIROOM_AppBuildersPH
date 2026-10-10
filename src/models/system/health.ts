import type { ModelRole } from "@/lib/constants/models";

export interface ModelStatus {
  role: ModelRole;
  name: string;
  installed: boolean;
}

export interface HealthReport {
  status: "ok" | "degraded" | "down";
  ollama: {
    reachable: boolean;
    version: string | null;
  };
  models: ModelStatus[];
  checkedAt: string;
}
