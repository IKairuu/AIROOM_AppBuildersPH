// The host's settings, saved on the laptop in data/settings.json.
export type ModelMode = "auto" | string;

export type AppSettings = {
  // Used when the Assistant greets the host.
  hostName: string;
  // "auto": the main model, switching to the low-power one on low battery.
  // Otherwise an installed Ollama model tag, used for every chat.
  modelMode: ModelMode;
};

export const DEFAULT_SETTINGS: AppSettings = { hostName: "", modelMode: "auto" };

export const HOST_NAME_MAX = 30;

// Battery level (on battery only) at which "auto" switches to the low-power model.
export const LOW_BATTERY_PERCENT = 30;

export type InstalledModel = {
  tag: string;
  label: string;
  // Size on disk in bytes, which is roughly the memory it needs.
  size: number;
};

// What the Settings page and the top bar show.
export type SettingsView = {
  settings: AppSettings;
  // The model chats use right now, after "auto" and fallbacks.
  activeModel: string;
  activeModelLabel: string;
  // True when "auto" switched to the low-power model because of the battery.
  batterySaver: boolean;
  installed: InstalledModel[];
  ollamaReachable: boolean;
  wifi: { ssid: string; source: "windows" | "saved" } | null;
};
