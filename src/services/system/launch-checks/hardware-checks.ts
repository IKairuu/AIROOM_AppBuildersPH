import os from "node:os";
import si from "systeminformation";
import { MODELS } from "@/lib/constants/models";
import type { LaunchCheckResult } from "@/models/system/launch-check";
import { getOllamaInventory, normalizeTag } from "@/services/ollama/ollama-client";

const GB = 1024 ** 3;
// Room for the model's context, the server and the browser on top of the model file.
const HEADROOM_BYTES = 1.5 * GB;
// Used when Ollama can't tell us the model size.
const FALLBACK_MODEL_BYTES = 3.5 * GB;

const gb = (bytes: number) => `${(bytes / GB).toFixed(1)} GB`;

export async function checkMemory(): Promise<LaunchCheckResult> {
  const total = os.totalmem();
  const free = os.freemem();
  const main = normalizeTag(MODELS.main);

  let modelBytes = FALLBACK_MODEL_BYTES;
  let loaded = false;
  try {
    const inventory = await getOllamaInventory();
    modelBytes = inventory.installed.get(main)?.size ?? FALLBACK_MODEL_BYTES;
    loaded = inventory.loaded.has(main);
  } catch {
    // The model check reports Ollama problems. Here we only need a size estimate.
  }

  const detail = `${gb(total)} total, ${gb(free)} free`;
  const needed = modelBytes + HEADROOM_BYTES;
  if (total < needed) {
    return {
      id: "memory",
      outcome: "failed",
      detail: `${detail}. ${MODELS.main} needs about ${gb(needed)}.`,
      fix: `Use a laptop with more memory, or switch to ${MODELS.lowPower}.`,
    };
  }
  // A loaded model already holds its memory, so what's free is extra.
  if (loaded) return { id: "memory", outcome: "ready", detail: `${detail}, model already loaded` };
  if (free < needed) {
    return {
      id: "memory",
      outcome: "warning",
      detail: `${detail}. The model needs about ${gb(needed)}, so answers may be slow.`,
      fix: `Close other apps to free about ${gb(needed - free)}.`,
    };
  }
  return { id: "memory", outcome: "ready", detail };
}

// Ollama runs on a graphics card with enough of its own memory; otherwise on the processor.
const MIN_VRAM_MB = 3500;

export async function checkCompute(): Promise<LaunchCheckResult> {
  const [cpu, graphics] = await Promise.all([si.cpu(), si.graphics()]);
  const cpuName = `${cpu.manufacturer} ${cpu.brand}`.trim();
  const cores = cpu.physicalCores || cpu.cores;
  const appleSilicon = cpu.manufacturer === "Apple";

  const gpu = graphics.controllers
    .filter((c) => !c.vramDynamic && (c.vram ?? 0) > 0)
    .sort((a, b) => (b.vram ?? 0) - (a.vram ?? 0))[0];
  const gpuText = gpu ? `${gpu.model} (${gb((gpu.vram ?? 0) * 1024 ** 2)})` : null;
  const detail = [`${cpuName}, ${cores} cores`, gpuText].filter(Boolean).join(" · ");

  if (appleSilicon || (gpu && (gpu.vram ?? 0) >= MIN_VRAM_MB)) {
    return { id: "compute", outcome: "ready", detail };
  }
  return {
    id: "compute",
    outcome: "warning",
    detail: `${detail}. No graphics card with enough memory, so answers run on the processor.`,
    fix: `Answers will be slower. Fewer phones at once, or ${MODELS.lowPower}, keeps it quick.`,
  };
}

const LOW_BATTERY = 20;
const SHORT_BATTERY = 50;

export async function checkPower(): Promise<LaunchCheckResult> {
  const battery = await si.battery();
  if (!battery.hasBattery) return { id: "power", outcome: "ready", detail: "Plugged in (no battery)" };

  const pluggedIn = battery.acConnected || battery.isCharging;
  const detail = `${battery.percent}%${battery.isCharging ? ", charging" : pluggedIn ? ", plugged in" : " on battery"}`;
  if (pluggedIn) return { id: "power", outcome: "ready", detail };
  if (battery.percent < LOW_BATTERY) {
    return { id: "power", outcome: "failed", detail, fix: "Plug in the charger, then try again." };
  }
  if (battery.percent < SHORT_BATTERY) {
    return { id: "power", outcome: "warning", detail, fix: "Plug in the charger for a long session." };
  }
  return { id: "power", outcome: "ready", detail };
}
