"use client";

import Link from "next/link";
import { roomHref } from "@/lib/constants/routes";
import type { RoomCreation, RoomDraftDetails } from "@/models/chat/assistant-action";
import { ROOM_PRESETS } from "@/models/room/room-preset";
import { useUploadStore } from "@/state/upload-store";
import Icon from "@/views/widgets/common/Icon";
import PresetIcon from "@/views/widgets/common/PresetIcon";
import Spinner from "@/views/widgets/common/Spinner";

type RoomCreationCardProps = {
  creation: RoomCreation;
  onConfirm: () => void;
  onCancel: () => void;
  onEdit: () => void;
};

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-2 text-xs">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="text-zinc-200">{children}</dd>
    </div>
  );
}

// The Room's details, shown before anything is created.
function Summary({ draft }: { draft: RoomDraftDetails }) {
  const files = useUploadStore((s) => s.pending);
  return (
    <dl className="space-y-1.5">
      <Detail label="Name">{draft.name}</Detail>
      <Detail label="Type">{ROOM_PRESETS[draft.preset].label}</Detail>
      <Detail label="Description">{draft.purpose || <span className="text-zinc-500">None</span>}</Detail>
      <Detail label="Rules">
        <span className="block whitespace-pre-line">{draft.rules}</span>
      </Detail>
      <Detail label="Files">
        {files.length ? files.map((f) => f.name).join(", ") : <span className="text-zinc-500">None</span>}
      </Detail>
    </dl>
  );
}

// A Room the Assistant set up from the chat: the details to confirm, then saving,
// saved (with a link), or failed. Nothing is created until the host confirms.
export default function RoomCreationCard({ creation, onConfirm, onCancel, onEdit }: RoomCreationCardProps) {
  if ("draft" in creation) {
    const active = creation.status === "confirm";
    return (
      <div className={`mt-3 rounded-xl border p-3.5 ${active ? "border-indigo-400/30 bg-indigo-500/8" : "border-white/8 bg-white/2 opacity-60"}`}>
        <div className="mb-3 flex items-center gap-2.5">
          <PresetIcon preset={creation.draft.preset} size="sm" />
          <p className="text-sm font-semibold text-white">
            {active ? "Create this Room?" : creation.status === "canceled" ? "Not created" : "Replaced by the new details below"}
          </p>
        </div>
        <Summary draft={creation.draft} />
        {active && (
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="flex cursor-pointer items-center gap-1.5 rounded-full bg-linear-to-b from-indigo-500 to-violet-600 px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              <Icon name="check" className="size-3.5" />
              Create Room
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="cursor-pointer rounded-full border border-white/15 px-3.5 py-2 text-xs text-zinc-200 hover:bg-white/8"
            >
              Change something
            </button>
            <button type="button" onClick={onCancel} className="cursor-pointer rounded-full px-3 py-2 text-xs text-zinc-400 hover:text-white">
              Cancel
            </button>
            <span className="text-[11px] text-zinc-500">or reply “yes”</span>
          </div>
        )}
      </div>
    );
  }
  if (creation.status === "creating") {
    return (
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 p-3 text-sm text-zinc-300">
        <Spinner className="size-4" />
        Creating “{creation.name}”…
      </div>
    );
  }
  if (creation.status === "failed") {
    return (
      <div role="alert" className="mt-3 rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-200">
        Couldn’t create “{creation.name}”: {creation.error}
      </div>
    );
  }
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/8 p-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300">
        <Icon name="check" className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">The Room “{creation.name}” is created</p>
        <p className="text-xs text-zinc-400">Open it to start the session and show the QR codes.</p>
      </div>
      <Link
        href={roomHref(creation.roomId)}
        className="flex items-center gap-1.5 rounded-full bg-linear-to-b from-indigo-500 to-violet-600 px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
      >
        Open Room
        <Icon name="arrowRight" className="size-3.5" />
      </Link>
    </div>
  );
}
