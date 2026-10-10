"use client";

import { useHotspotForm } from "@/controllers/useHotspotForm";
import { buttonClasses } from "@/views/widgets/common/ButtonLink";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/3 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-400/60 focus:outline-none";

// Shown when Windows can't report the hotspot: the host types what's in
// Settings > Network & internet > Mobile hotspot.
export default function HotspotForm({ initialSsid = "", onSaved }: { initialSsid?: string; onSaved?: () => void }) {
  const f = useHotspotForm(initialSsid, onSaved);
  return (
    <form onSubmit={(e) => void f.submit(e)} className="space-y-2.5">
      <input
        value={f.ssid}
        onChange={(e) => f.setSsid(e.target.value)}
        placeholder="Wi-Fi name"
        aria-label="Hotspot Wi-Fi name"
        className={inputClass}
      />
      <input
        value={f.password}
        onChange={(e) => f.setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        aria-label="Hotspot password"
        autoComplete="off"
        className={inputClass}
      />
      {f.error && <p className="text-xs text-rose-300">{f.error}</p>}
      <button type="submit" disabled={f.saving || !f.ssid.trim()} className={`cursor-pointer ${buttonClasses("primary", "sm")}`}>
        {f.saving ? "Saving…" : "Save Wi-Fi details"}
      </button>
    </form>
  );
}
