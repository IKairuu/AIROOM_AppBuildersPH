// Server-only: the live status strip (internet, battery, model, speed).
import { lookup } from "node:dns/promises";
import si from "systeminformation";
import { modelLabel } from "@/lib/utils/model-label";
import type { SystemStatus } from "@/models/system/status";
import { getModelState } from "./settings-service";
import { latestSpeed } from "./speed-tracker";

// Internet and battery change slowly and take a moment to read, so each is cached briefly.
const INTERNET_MS = 30_000;
const BATTERY_MS = 15_000;

let internetCache: { at: number; value: boolean } | null = null;
let batteryCache: { at: number; value: SystemStatus["battery"] } | null = null;

async function hasInternet(): Promise<boolean> {
  if (internetCache && Date.now() - internetCache.at < INTERNET_MS) return internetCache.value;
  let value = false;
  try {
    await Promise.race([
      lookup("ollama.com"),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 1500)),
    ]);
    value = true;
  } catch {
    value = false;
  }
  internetCache = { at: Date.now(), value };
  return value;
}

async function battery(): Promise<SystemStatus["battery"]> {
  if (batteryCache && Date.now() - batteryCache.at < BATTERY_MS) return batteryCache.value;
  let value: SystemStatus["battery"] = null;
  try {
    const b = await si.battery();
    if (b.hasBattery) value = { percent: Math.round(b.percent), charging: b.isCharging || b.acConnected };
  } catch {
    value = null;
  }
  batteryCache = { at: Date.now(), value };
  return value;
}

export async function getSystemStatus(): Promise<SystemStatus> {
  const [internet, bat, { model, batterySaver }] = await Promise.all([hasInternet(), battery(), getModelState()]);
  return { internet, battery: bat, model, modelLabel: modelLabel(model), batterySaver, tokensPerSecond: latestSpeed() };
}
