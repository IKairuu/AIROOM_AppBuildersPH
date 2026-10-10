import type { AppSettings, SettingsView } from "@/models/system/settings";

export async function fetchSettings(): Promise<SettingsView> {
  const res = await fetch("/api/settings", { cache: "no-store" });
  if (!res.ok) throw new Error("Couldn’t load the settings.");
  return (await res.json()) as SettingsView;
}

/** Saves part of the settings and returns the updated view. Throws a readable message. */
export async function saveSettings(patch: Partial<AppSettings>): Promise<SettingsView> {
  const res = await fetch("/api/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const body = (await res.json().catch(() => null)) as (SettingsView & { error?: string }) | null;
  if (!res.ok || !body) throw new Error(body?.error ?? "Couldn’t save. Try again.");
  return body;
}
