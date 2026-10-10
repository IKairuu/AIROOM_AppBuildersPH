"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQueueSnapshot } from "@/controllers/useQueue";
import Icon from "@/views/widgets/common/Icon";

function useRoomLive(roomId: string) {
  const { snapshot } = useQueueSnapshot();
  const status = snapshot?.rooms.find((r) => r.roomId === roomId);
  return { loaded: !!snapshot, live: status?.session.state === "live", phones: status?.phones ?? 0 };
}

// "Walang signal, may sagot." while the Room is open; "Starting soon" before.
export function ProjectorKicker({ roomId }: { roomId: string }) {
  const { live } = useRoomLive(roomId);
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 font-mono text-sm tracking-wide text-zinc-200">
      <span className={`size-2 rounded-full ${live ? "animate-pulse bg-emerald-400" : "bg-amber-400"}`} />
      {live ? "Walang signal, may sagot." : "Starting soon"}
    </span>
  );
}

export function ProjectorPhones({ roomId }: { roomId: string }) {
  const { loaded, live, phones } = useRoomLive(roomId);
  if (!loaded) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-base ${
        live ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-white/10 text-zinc-400"
      }`}
    >
      <span className={`size-2 rounded-full ${live ? "animate-pulse bg-emerald-400" : "bg-zinc-500"}`} />
      {live ? `${phones} phone${phones === 1 ? "" : "s"} connected` : "The chat opens when the host starts"}
    </span>
  );
}

// Full screen and Exit in the corner. Escape (outside full screen) goes back to the Room.
export function ProjectorControls({ exitHref }: { exitHref: string }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) router.push(exitHref);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [exitHref, router]);

  return (
    <div className="fixed top-5 right-5 z-10 flex gap-2">
      <button
        type="button"
        onClick={() => void document.documentElement.requestFullscreen?.().catch(() => undefined)}
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white hover:bg-white/10"
      >
        <Icon name="maximize" className="size-3.5" />
        Full screen
      </button>
      <Link
        href={exitHref}
        className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white hover:bg-white/10"
      >
        <Icon name="x" className="size-3.5" />
        Exit
      </Link>
    </div>
  );
}
