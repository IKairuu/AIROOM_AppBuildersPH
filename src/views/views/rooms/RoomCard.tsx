"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRoomCard } from "@/controllers/useRoomCard";
import { roomHref } from "@/lib/constants/routes";
import type { RoomPresetId } from "@/models/room/room-preset";
import { ROOM_NAME_MAX } from "@/models/room/room-preset";
import type { RoomSessionState } from "@/models/room/room-session";
import Icon from "@/views/widgets/common/Icon";
import PresetIcon, { PresetBadge } from "@/views/widgets/common/PresetIcon";
import Spinner from "@/views/widgets/common/Spinner";
import { SessionBadge } from "@/views/widgets/queue/SessionButton";

export type RoomCardData = {
  id: string;
  name: string;
  purpose: string;
  preset: RoomPresetId;
  files: number;
  // Short tags from the Room's rules, like "Tutor" or "Quiz".
  tags: string[];
  session: RoomSessionState;
};

const menuItem =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-zinc-200 hover:bg-white/8 disabled:opacity-50";

// One Room in the list. The whole card opens the Room; the ⋯ menu renames it,
// starts or ends its session, or deletes it.
export default function RoomCard({ room }: { room: RoomCardData }) {
  const c = useRoomCard(room.id, room.name);
  const live = room.session === "live";
  const menuRef = useRef<HTMLDivElement>(null);
  const { mode, close } = c;

  // A click outside the menu, or Escape, closes it.
  useEffect(() => {
    if (mode !== "menu") return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [mode, close]);

  return (
    <article
      className={`relative flex min-h-48 flex-col gap-3 rounded-3xl border p-5 transition-colors hover:border-indigo-400/40 ${
        live ? "border-indigo-400/50 bg-indigo-500/6 shadow-[0_0_30px_-12px] shadow-indigo-500/50" : "border-line bg-panel/80"
      }`}
    >
      {/* Covers the card so a click anywhere opens the Room; the menu sits above it. */}
      <Link href={roomHref(room.id)} aria-label={`Open ${room.name}`} className="absolute inset-0 z-0 rounded-3xl" />

      <div className="flex items-start justify-between gap-3">
        <PresetIcon preset={room.preset} />
        <div ref={menuRef} className="relative z-10 flex items-center gap-2">
          {live && <SessionBadge state="live" />}
          <button
            type="button"
            onClick={c.toggleMenu}
            aria-haspopup="menu"
            aria-expanded={c.mode === "menu"}
            aria-label={`More actions for ${room.name}`}
            className="grid size-8 cursor-pointer place-items-center rounded-full text-zinc-400 hover:bg-white/8 hover:text-white"
          >
            <Icon name="more" className="size-4" />
          </button>
          {c.mode === "menu" && (
            <div role="menu" className="absolute top-9 right-0 z-20 w-48 rounded-xl border border-white/10 bg-[#14141f] p-1.5 shadow-2xl shadow-black/60">
              <button type="button" role="menuitem" className={menuItem} onClick={c.askRename}>
                <Icon name="pencil" className="size-4" />
                Rename
              </button>
              <button
                type="button"
                role="menuitem"
                className={menuItem}
                disabled={c.busy}
                onClick={() => void (live ? c.endSession() : c.startSession())}
              >
                <Icon name={live ? "stop" : "play"} className="size-4" />
                {live ? "End session" : "Start session"}
              </button>
              <div className="my-1 h-px bg-white/8" />
              <button type="button" role="menuitem" className={`${menuItem} text-rose-300!`} onClick={c.askDelete}>
                <Icon name="trash" className="size-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-white">{room.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{room.purpose}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <PresetBadge preset={room.preset} />
        {room.tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-200">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-auto flex items-center gap-1.5 text-xs text-zinc-500">
        <Icon name="file" className="size-3.5" />
        {room.files ? `${room.files} file${room.files === 1 ? "" : "s"}` : "No files"}
      </p>

      {(c.mode === "rename" || c.mode === "delete") && (
        <div className="absolute inset-0 z-30 flex flex-col justify-center gap-3 rounded-3xl border border-white/10 bg-[#11111b]/97 p-5">
          {c.mode === "rename" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void c.rename();
              }}
              className="space-y-3"
            >
              <label className="block text-sm font-medium text-white">
                Rename Room
                <input
                  value={c.name}
                  onChange={(e) => c.setName(e.target.value)}
                  maxLength={ROOM_NAME_MAX}
                  autoFocus
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-sm text-white focus:border-indigo-400/60 focus:outline-none"
                />
              </label>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={c.close} className="cursor-pointer rounded-full px-3 py-1.5 text-sm text-zinc-300 hover:bg-white/8">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={c.busy || !c.name.trim()}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-indigo-500 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-60"
                >
                  {c.busy && <Spinner className="size-3.5" />}
                  Save
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-sm font-semibold text-white">Delete “{room.name}”?</p>
              <p className="text-xs text-zinc-400">Its files and rules are deleted from this laptop. This can’t be undone.</p>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={c.close} className="cursor-pointer rounded-full px-3 py-1.5 text-sm text-zinc-300 hover:bg-white/8">
                  Keep it
                </button>
                <button
                  type="button"
                  onClick={() => void c.remove()}
                  disabled={c.busy}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-rose-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-rose-400 disabled:opacity-60"
                >
                  {c.busy && <Spinner className="size-3.5" />}
                  Delete Room
                </button>
              </div>
            </>
          )}
          {c.error && <p className="text-xs text-rose-300">{c.error}</p>}
        </div>
      )}
    </article>
  );
}
