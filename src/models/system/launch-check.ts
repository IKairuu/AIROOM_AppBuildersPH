export const LAUNCH_CHECK_IDS = ["model", "server", "network", "memory", "compute", "power", "internet"] as const;

export type LaunchCheckId = (typeof LAUNCH_CHECK_IDS)[number];

export function isLaunchCheckId(value: string): value is LaunchCheckId {
  return (LAUNCH_CHECK_IDS as readonly string[]).includes(value);
}

// What a finished check found. A warning still lets the host launch; a failure doesn't.
export type LaunchCheckOutcome = "ready" | "warning" | "failed";

export type LaunchCheckStatus = "waiting" | "checking" | LaunchCheckOutcome;

export type LaunchCheck = {
  id: LaunchCheckId;
  label: string;
  // Shown before the check has a result.
  detail: string;
};

export type LaunchCheckResult = {
  id: LaunchCheckId;
  outcome: LaunchCheckOutcome;
  // What was found, in plain words ("Gemma 3 4B installed, Ollama 0.40.1").
  detail: string;
  // What the host can do about a warning or failure.
  fix?: string;
};
