"use client";

import { useSettingsView } from "@/controllers/useSettings";

// The model answering right now, as chosen in Settings.
export default function ActiveModel({ suffix = "" }: { suffix?: string }) {
  const view = useSettingsView();
  if (!view) return <>…</>;
  return (
    <>
      {view.activeModelLabel}
      {view.batterySaver ? " (saver)" : ""}
      {suffix}
    </>
  );
}
