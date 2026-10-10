import { access } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { MODELS } from "@/lib/constants/models";
import { hostOsFromPlatform, OS_WORDS, type HostOs } from "@/lib/utils/host-os";
import type { LaunchCheckResult } from "@/models/system/launch-check";
import { getOllamaInventory, normalizeTag } from "@/services/ollama/ollama-client";

// Optional models: AIROOM still runs without them, with less.
const OPTIONAL = [
  { tag: MODELS.lowPower, use: "battery saver" },
  { tag: MODELS.embedding, use: "file search" },
];

// Where each OS's Ollama installer puts the app.
function ollamaInstallPaths(hostOs: HostOs): string[] {
  switch (hostOs) {
    case "windows": {
      const local = process.env.LOCALAPPDATA ?? path.join(os.homedir(), "AppData", "Local");
      const programFiles = process.env.ProgramFiles ?? "C:\\Program Files";
      return [path.join(local, "Programs", "Ollama", "ollama.exe"), path.join(programFiles, "Ollama", "ollama.exe")];
    }
    case "mac":
      return [
        "/Applications/Ollama.app",
        path.join(os.homedir(), "Applications", "Ollama.app"),
        "/usr/local/bin/ollama",
        "/opt/homebrew/bin/ollama",
      ];
    case "linux":
      return ["/usr/local/bin/ollama", "/usr/bin/ollama", "/snap/bin/ollama"];
  }
}

async function isOllamaInstalled(hostOs: HostOs): Promise<boolean> {
  const found = await Promise.all(ollamaInstallPaths(hostOs).map((p) => access(p).then(() => true, () => false)));
  return found.includes(true);
}

export async function checkModel(): Promise<LaunchCheckResult> {
  let inventory;
  try {
    inventory = await getOllamaInventory();
  } catch {
    const hostOs = hostOsFromPlatform(process.platform);
    const words = OS_WORDS[hostOs];
    if (!(await isOllamaInstalled(hostOs))) {
      return {
        id: "model",
        outcome: "failed",
        detail: `Ollama isn’t installed on this ${words.name} laptop.`,
        fix: words.installOllama,
      };
    }
    return {
      id: "model",
      outcome: "failed",
      detail: "Ollama is installed but isn’t running.",
      fix: words.startOllama,
    };
  }

  const main = normalizeTag(MODELS.main);
  if (!inventory.installed.has(main)) {
    return {
      id: "model",
      outcome: "failed",
      detail: `Ollama ${inventory.version} is running, but ${MODELS.main} isn’t installed.`,
      fix: `Run “ollama pull ${MODELS.main}” in a terminal, then try again.`,
    };
  }

  const state = inventory.loaded.has(main) ? "loaded and ready" : "installed";
  const detail = `${MODELS.main} ${state}, Ollama ${inventory.version}`;
  const missing = OPTIONAL.filter((m) => !inventory.installed.has(normalizeTag(m.tag)));
  if (missing.length > 0) {
    return {
      id: "model",
      outcome: "warning",
      detail: `${detail}. Missing ${missing.map((m) => `${m.tag} (${m.use})`).join(" and ")}.`,
      fix: `AIROOM can launch without it. To add it, run ${missing.map((m) => `“ollama pull ${m.tag}”`).join(" and ")}.`,
    };
  }
  return { id: "model", outcome: "ready", detail };
}
