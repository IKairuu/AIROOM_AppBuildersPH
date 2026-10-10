// Server-only: reads this laptop's hardware and services. Import from route handlers only.
import type { LaunchCheckId, LaunchCheckResult } from "@/models/system/launch-check";
import { checkCompute, checkMemory, checkPower } from "./hardware-checks";
import { checkInternet } from "./internet-check";
import { checkModel } from "./model-check";
import { checkNetwork, checkServer } from "./network-checks";

type CheckContext = { port: string };

const runners: Record<LaunchCheckId, (ctx: CheckContext) => Promise<LaunchCheckResult> | LaunchCheckResult> = {
  model: checkModel,
  server: ({ port }) => checkServer(port),
  network: ({ port }) => checkNetwork(port),
  memory: checkMemory,
  compute: checkCompute,
  power: checkPower,
  internet: checkInternet,
};

export async function runLaunchCheck(id: LaunchCheckId, ctx: CheckContext): Promise<LaunchCheckResult> {
  try {
    return await runners[id](ctx);
  } catch {
    return {
      id,
      outcome: "warning",
      detail: "This laptop didn’t report this one.",
      fix: "AIROOM can still launch. Try again to re-check.",
    };
  }
}
