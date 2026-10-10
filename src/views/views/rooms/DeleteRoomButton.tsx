"use client";

import { useDeleteRoom } from "@/controllers/useDeleteRoom";
import { buttonClasses } from "@/views/widgets/common/ButtonLink";
import Icon from "@/views/widgets/common/Icon";
import Spinner from "@/views/widgets/common/Spinner";

export default function DeleteRoomButton({ roomId, roomName }: { roomId: string; roomName: string }) {
  const { confirming, deleting, error, ask, cancel, remove } = useDeleteRoom(roomId);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={ask}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-rose-400/25 px-4 py-2 text-sm text-rose-300 transition-colors hover:bg-rose-400/10"
      >
        <Icon name="x" />
        Delete Room
      </button>
    );
  }

  return (
    <div role="alertdialog" aria-label="Delete this Room?" className="rounded-2xl border border-rose-400/30 bg-rose-400/8 p-4">
      <p className="text-sm font-semibold text-white">Delete “{roomName}”?</p>
      <p className="mt-1 text-xs text-zinc-300">Its files are deleted from this laptop too. This can’t be undone.</p>
      {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={cancel} disabled={deleting} className={`cursor-pointer ${buttonClasses("quiet", "sm")}`}>
          Keep it
        </button>
        <button
          type="button"
          onClick={() => void remove()}
          disabled={deleting}
          className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full bg-rose-500 px-3 text-xs font-medium text-white hover:bg-rose-400 disabled:opacity-60"
        >
          {deleting && <Spinner className="size-3.5" />}
          Delete Room
        </button>
      </div>
    </div>
  );
}
