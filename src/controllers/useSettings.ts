"use client";

import { useEffect, useState } from "react";
import type { AppSettings } from "@/models/system/settings";
import { saveSettings } from "@/services/api/settings-service";
import { useSettingsStore } from "@/state/settings-store";

// Loads the shared settings once (the greeting and top bar use them too).
export function useSettingsView() {
  const view = useSettingsStore((s) => s.view);
  const load = useSettingsStore((s) => s.load);
  useEffect(() => {
    void load();
  }, [load]);
  return view;
}

// The Settings page: each change saves right away and says so.
export function useSettings() {
  const view = useSettingsView();
  const [saving, setSaving] = useState<keyof AppSettings | null>(null);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const save = async (patch: Partial<AppSettings>, done: string) => {
    const key = Object.keys(patch)[0] as keyof AppSettings;
    setSaving(key);
    setNotice(null);
    try {
      useSettingsStore.getState().setView(await saveSettings(patch));
      setNotice({ ok: true, text: done });
    } catch (e) {
      setNotice({ ok: false, text: e instanceof Error ? e.message : "Couldn’t save." });
    } finally {
      setSaving(null);
    }
  };

  const refresh = async () => {
    useSettingsStore.setState({ view: null });
    await useSettingsStore.getState().load();
  };

  return { view, saving, notice, save, refresh };
}
