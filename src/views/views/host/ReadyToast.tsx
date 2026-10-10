"use client";

import { useEffect } from "react";
import { useLaunchStore } from "@/state/launch-store";
import Icon from "@/views/widgets/common/Icon";

const VISIBLE_MS = 5000;

// Confirms the launch when the host lands here from the launch checks.
export default function ReadyToast() {
  const visible = useLaunchStore((s) => s.justLaunched);
  const clear = useLaunchStore((s) => s.clearJustLaunched);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(clear, VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [visible, clear]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed right-6 bottom-6 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-emerald-400/20 bg-[#0f1514]/95 p-4 shadow-2xl shadow-black/60 backdrop-blur-md"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300">
        <Icon name="check" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">AIROOM is ready</p>
        <p className="mt-0.5 text-xs text-zinc-400">
          Create a Room, then phones join by scanning its QR codes.
        </p>
      </div>
      <button
        type="button"
        onClick={clear}
        aria-label="Dismiss"
        className="cursor-pointer text-zinc-500 transition-colors hover:text-white"
      >
        <Icon name="x" className="size-3.5" />
      </button>
    </div>
  );
}
