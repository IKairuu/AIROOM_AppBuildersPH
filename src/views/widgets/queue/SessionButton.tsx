"use client";

import type { RoomSessionState } from "@/models/room/room-session";
import Icon from "@/views/widgets/common/Icon";
import Spinner from "@/views/widgets/common/Spinner";

type SessionButtonProps = {
  state: RoomSessionState;
  busy: boolean;
  onStart: () => void;
  onEnd: () => void;
  size?: "sm" | "md";
};

// Start or end one Room's session.
export default function SessionButton({ state, busy, onStart, onEnd, size = "md" }: SessionButtonProps) {
  const pad = size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm";
  if (state === "live") {
    return (
      <button
        type="button"
        onClick={onEnd}
        disabled={busy}
        className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-rose-400/40 font-medium text-rose-200 transition-colors hover:bg-rose-500/15 disabled:opacity-60 ${pad}`}
      >
        {busy ? <Spinner className="size-3.5" /> : <Icon name="stop" className="size-3.5" />}
        End session
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onStart}
      disabled={busy}
      className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-linear-to-b from-emerald-400 to-emerald-600 font-medium text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-60 ${pad}`}
    >
      {busy ? <Spinner className="size-3.5" /> : <Icon name="play" className="size-3.5" />}
      {state === "ended" ? "Start again" : "Start session"}
    </button>
  );
}

export function SessionBadge({ state }: { state: RoomSessionState }) {
  if (state === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-zinc-400">
      {state === "ended" ? "Ended" : "Not started"}
    </span>
  );
}
