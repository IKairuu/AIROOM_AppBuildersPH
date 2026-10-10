import { lookup } from "node:dns/promises";
import type { LaunchCheckResult } from "@/models/system/launch-check";

const TIMEOUT_MS = 1500;

// Informational only: AIROOM never needs the internet, so this check can't fail.
// Uses the OS resolver (lookup), which works on Windows, macOS and Linux where c-ares often can't.
export async function checkInternet(): Promise<LaunchCheckResult> {
  try {
    await Promise.race([
      lookup("ollama.com"),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)),
    ]);
    return { id: "internet", outcome: "ready", detail: "Connected, but not needed. AIROOM works offline." };
  } catch {
    return { id: "internet", outcome: "ready", detail: "Offline. AIROOM doesn’t need the internet." };
  }
}
