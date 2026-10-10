"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { MODELS } from "@/lib/constants/models";
import { detectBrowserOs, type HostOs, OS_WORDS } from "@/lib/utils/host-os";
import type { LaunchCheck, LaunchCheckId, LaunchCheckResult, LaunchCheckStatus } from "@/models/system/launch-check";
import { fetchLaunchCheck } from "@/services/api/launch-service";

export const LAUNCH_CHECKS: LaunchCheck[] = [
  { id: "model", label: "Local AI model", detail: `${MODELS.main} through Ollama` },
  { id: "server", label: "Local server", detail: "Serves the chat page to phones" },
  { id: "network", label: "Room network", detail: "The laptop’s hotspot or the room’s Wi-Fi" },
  { id: "memory", label: "Memory", detail: "Free memory for the model" },
  { id: "compute", label: "Processor and graphics", detail: "Where answers are worked out" },
  { id: "power", label: "Power", detail: "Battery and charger" },
  { id: "internet", label: "Internet", detail: "Not needed. AIROOM runs offline." },
];

// Swaps in the detected OS's own name for its hotspot before any check runs.
function checksFor(hostOs: HostOs | null): LaunchCheck[] {
  if (!hostOs) return LAUNCH_CHECKS;
  const { hotspot } = OS_WORDS[hostOs];
  return LAUNCH_CHECKS.map((c) => (c.id === "network" ? { ...c, detail: `${hotspot} or the room’s Wi-Fi` } : c));
}

const noSubscribe = () => () => {};

// Null while server rendering, so the first paint matches; the OS fills in on hydration.
export function useHostOs(): HostOs | null {
  return useSyncExternalStore(noSubscribe, detectBrowserOs, () => null);
}

export type LaunchPhase = "idle" | "running" | "failed" | "done";

type Statuses = Record<LaunchCheckId, LaunchCheckStatus>;
type Results = Partial<Record<LaunchCheckId, LaunchCheckResult>>;

const allAs = (status: LaunchCheckStatus) =>
  Object.fromEntries(LAUNCH_CHECKS.map((c) => [c.id, status])) as Statuses;

// Runs every readiness check on the host laptop at once. Each row updates as
// its own result comes back. Any failure blocks launch; warnings don't.
export function useLaunchChecks() {
  const [statuses, setStatuses] = useState<Statuses>(() => allAs("waiting"));
  const [results, setResults] = useState<Results>({});
  const [phase, setPhase] = useState<LaunchPhase>("idle");
  const abortRef = useRef<AbortController | null>(null);
  const hostOs = useHostOs();

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  useEffect(() => cancel, [cancel]);

  const reset = useCallback(() => {
    cancel();
    setStatuses(allAs("waiting"));
    setResults({});
    setPhase("idle");
  }, [cancel]);

  const start = useCallback(async () => {
    cancel();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatuses(allAs("checking"));
    setResults({});
    setPhase("running");

    try {
      const outcomes = await Promise.all(
        LAUNCH_CHECKS.map(async ({ id }) => {
          const result = await fetchLaunchCheck(id, controller.signal);
          setResults((r) => ({ ...r, [id]: result }));
          setStatuses((s) => ({ ...s, [id]: result.outcome }));
          return result.outcome;
        }),
      );
      setPhase(outcomes.includes("failed") ? "failed" : "done");
    } catch {
      // Aborted by reset or unmount; nothing to update.
    }
  }, [cancel]);

  return { checks: checksFor(hostOs), hostOs, statuses, results, phase, start, reset };
}
