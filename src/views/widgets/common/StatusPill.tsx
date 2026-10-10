"use client";

import { useEffect } from "react";
import { useSystemStatusStore } from "@/state/system-status-store";
import Icon from "./Icon";

// The live strip in the top bar: internet, the model answering, its latest speed and the battery.
export default function StatusPill() {
  const status = useSystemStatusStore((s) => s.status);
  const watch = useSystemStatusStore((s) => s.watch);
  useEffect(() => watch(), [watch]);

  const item = "flex items-center gap-1.5 px-3.5";
  const bat = status?.battery;
  const lowBattery = bat && !bat.charging && bat.percent <= 30;

  return (
    <ul
      aria-label="Laptop status"
      className="ml-auto hidden items-center divide-x divide-white/10 rounded-full border border-white/10 bg-white/3 py-1.5 font-mono text-xs text-zinc-300 md:flex"
    >
      <li className={`${item} ${status?.internet ? "text-sky-300" : "text-emerald-400"}`} title="AIROOM works without the internet">
        <Icon name={status?.internet ? "globe" : "wifiOff"} className="size-3.5" />
        {status ? (status.internet ? "Internet on" : "Internet off") : "…"}
      </li>
      <li className={`${item} ${status?.batterySaver ? "text-amber-300" : ""}`}>
        <Icon name="chip" className="size-3.5" />
        {status ? `${status.modelLabel}${status.batterySaver ? " (saver)" : ""}` : "…"}
      </li>
      <li className={item} title="Speed of the latest answer">
        <Icon name="gauge" className="size-3.5" />
        {status?.tokensPerSecond ? `${status.tokensPerSecond.toFixed(1)} tok/s` : "- tok/s"}
      </li>
      <li className={`${item} ${lowBattery ? "text-amber-300" : ""}`} title={bat ? (bat.charging ? "Charging" : "On battery") : "No battery"}>
        <Icon name={bat?.charging || !bat ? "batteryCharging" : "battery"} className="size-3.5" />
        {status ? (bat ? `${bat.percent}%` : "Plugged in") : "…"}
      </li>
    </ul>
  );
}
