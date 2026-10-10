import { create } from "zustand";
import type { SettingsView } from "@/models/system/settings";
import { fetchSettings } from "@/services/api/settings-service";

type SettingsState = {
  // Null until loaded from the laptop.
  view: SettingsView | null;
  setView: (view: SettingsView) => void;
  // Loads once; the greeting, top bar and Settings page all share it.
  load: () => Promise<void>;
};

let loading: Promise<void> | null = null;

export const useSettingsStore = create<SettingsState>((set, get) => ({
  view: null,
  setView: (view) => set({ view }),
  load: () => {
    if (get().view) return Promise.resolve();
    loading ??= fetchSettings()
      .then((view) => set({ view }))
      .catch(() => undefined)
      .finally(() => {
        loading = null;
      });
    return loading;
  },
}));
