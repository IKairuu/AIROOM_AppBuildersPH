// Server-only: reads and saves the host's settings, and works out which model chats use.
import si from "systeminformation";
import { MODELS } from "@/lib/constants/models";
import { modelLabel } from "@/lib/utils/model-label";
import {
  DEFAULT_SETTINGS,
  HOST_NAME_MAX,
  LOW_BATTERY_PERCENT,
  type AppSettings,
  type InstalledModel,
  type SettingsView,
} from "@/models/system/settings";
import { KnowledgeError } from "@/services/knowledge/upload-store";
import { getOllamaInventory, normalizeTag } from "@/services/ollama/ollama-client";
import { dataPath, readJson, writeJson } from "@/services/storage/data-store";
import { getHotspotConfig } from "@/services/system/hotspot-service";

const FILE = () => dataPath("settings.json");

// Embedding models can't chat, so they're never offered.
const NOT_FOR_CHAT = /embed|minilm|bge-|nomic/i;

export async function getSettings(): Promise<AppSettings> {
  return { ...DEFAULT_SETTINGS, ...((await readJson<Partial<AppSettings>>(FILE())) ?? {}) };
}

async function installedChatModels(): Promise<{ models: InstalledModel[]; reachable: boolean }> {
  try {
    const { installed } = await getOllamaInventory();
    const models = [...installed.values()]
      .filter((m) => !NOT_FOR_CHAT.test(m.name))
      .map((m) => ({ tag: normalizeTag(m.name), label: modelLabel(m.name), size: m.size }))
      .sort((a, b) => a.label.localeCompare(b.label));
    return { models, reachable: true };
  } catch {
    return { models: [], reachable: false };
  }
}

// Battery is read at most once a minute; it changes slowly and the reading takes a moment.
let batteryCache: { at: number; low: boolean } | null = null;
async function onLowBattery(): Promise<boolean> {
  if (batteryCache && Date.now() - batteryCache.at < 60_000) return batteryCache.low;
  let low = false;
  try {
    const b = await si.battery();
    low = b.hasBattery && !b.acConnected && !b.isCharging && b.percent <= LOW_BATTERY_PERCENT;
  } catch {
    low = false;
  }
  batteryCache = { at: Date.now(), low };
  return low;
}

async function resolveModel(settings: AppSettings, installed: InstalledModel[]) {
  const has = (tag: string) => installed.some((m) => m.tag === normalizeTag(tag));
  if (settings.modelMode !== "auto" && has(settings.modelMode)) {
    return { model: normalizeTag(settings.modelMode), batterySaver: false };
  }
  if (settings.modelMode === "auto" && has(MODELS.lowPower) && (await onLowBattery())) {
    return { model: MODELS.lowPower, batterySaver: true };
  }
  return { model: MODELS.main, batterySaver: false };
}

/** The model every chat uses right now. Falls back to the main model if the chosen one is gone. */
export async function getActiveModel(): Promise<string> {
  return (await getModelState()).model;
}

/** The model answering now, and whether "Automatic" switched to it to save battery. */
export async function getModelState(): Promise<{ model: string; batterySaver: boolean }> {
  const [settings, { models }] = await Promise.all([getSettings(), installedChatModels()]);
  return resolveModel(settings, models);
}

export async function getSettingsView(): Promise<SettingsView> {
  const [settings, { models, reachable }, wifi] = await Promise.all([
    getSettings(),
    installedChatModels(),
    getHotspotConfig(),
  ]);
  const { model, batterySaver } = await resolveModel(settings, models);
  return {
    settings,
    activeModel: model,
    activeModelLabel: modelLabel(model),
    batterySaver,
    installed: models,
    ollamaReachable: reachable,
    wifi: wifi ? { ssid: wifi.ssid, source: wifi.source } : null,
  };
}

/** Checks and saves a partial update. Throws KnowledgeError with a message to show. */
export async function updateSettings(body: unknown): Promise<AppSettings> {
  const b = (body ?? {}) as Record<string, unknown>;
  const next = await getSettings();
  if ("hostName" in b) {
    if (typeof b.hostName !== "string") throw new KnowledgeError("Type a name.");
    next.hostName = b.hostName.trim().slice(0, HOST_NAME_MAX);
  }
  if ("modelMode" in b) {
    if (typeof b.modelMode !== "string") throw new KnowledgeError("Pick a model.");
    if (b.modelMode !== "auto") {
      const { models } = await installedChatModels();
      if (!models.some((m) => m.tag === normalizeTag(b.modelMode as string))) {
        throw new KnowledgeError("That model isn’t installed in Ollama on this laptop.");
      }
    }
    next.modelMode = b.modelMode === "auto" ? "auto" : normalizeTag(b.modelMode);
  }
  await writeJson(FILE(), next);
  return next;
}
