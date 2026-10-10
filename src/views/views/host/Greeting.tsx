"use client";

import { useSyncExternalStore } from "react";
import { useSettingsView } from "@/controllers/useSettings";

// Filipino greetings by time of day. "araw" (day) is the neutral fallback
// used while prerendering, before the browser's clock is known.
function partOfDay(hour: number | null) {
  if (hour === null) return "araw";
  if (hour >= 5 && hour < 12) return "umaga";
  if (hour === 12) return "tanghali";
  if (hour > 12 && hour < 18) return "hapon";
  return "gabi";
}

const noSubscribe = () => () => {};

export default function Greeting() {
  // The name from Settings; the greeting reads fine without one.
  const name = useSettingsView()?.settings.hostName;
  const hour = useSyncExternalStore(
    noSubscribe,
    () => new Date().getHours(),
    () => null,
  );

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
        Magandang {partOfDay(hour)}
        {name && (
          <>
            ,{" "}
            <span className="bg-linear-to-r from-white via-accent to-indigo-400 bg-clip-text text-transparent">
              {name}
            </span>
          </>
        )}
        <span className="text-indigo-400">.</span>
      </h1>
      <p className="mt-3 text-[15px] text-zinc-400">Ask me to run the room, or ask me anything.</p>
    </div>
  );
}
