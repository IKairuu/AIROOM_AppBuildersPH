import type { LaunchCheckId, LaunchCheckResult } from "@/models/system/launch-check";

// Runs one readiness check on the host laptop. Never throws: a request that
// fails comes back as a failed check so the dialog can show it.
export async function fetchLaunchCheck(id: LaunchCheckId, signal?: AbortSignal): Promise<LaunchCheckResult> {
  try {
    const res = await fetch(`/api/launch/checks/${id}`, { cache: "no-store", signal });
    if (!res.ok) throw new Error(`Check ${id} returned ${res.status}`);
    return (await res.json()) as LaunchCheckResult;
  } catch (error) {
    if (signal?.aborted) throw error;
    return {
      id,
      outcome: "failed",
      detail: "Couldn’t reach the AIROOM server on this laptop.",
      fix: "Make sure AIROOM is still running, then try again.",
    };
  }
}
