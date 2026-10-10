"use client";

import Link from "next/link";
import { newRoomHref } from "@/lib/constants/routes";
import type { AssistantAction } from "@/models/chat/assistant-action";
import { ROOM_PRESETS } from "@/models/room/room-preset";
import { useUploadStore } from "@/state/upload-store";
import Icon from "@/views/widgets/common/Icon";
import PresetIcon from "@/views/widgets/common/PresetIcon";

// A suggestion from the assistant. Only the host's click acts on it.
export default function AssistantActionCard({ action }: { action: AssistantAction }) {
  const fileCount = useUploadStore((s) => s.pending.length);
  switch (action.type) {
    // Shown by RoomCreationCard once the app has saved the Room.
    case "create_room_now":
      return null;
    case "create_room": {
      const preset = action.preset ?? "general";
      const title = action.name ? `Create “${action.name}”` : "Create a Room";
      return (
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-indigo-400/25 bg-indigo-500/8 p-3">
          <PresetIcon preset={preset} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{title}</p>
            <p className="text-xs text-zinc-400">
              {ROOM_PRESETS[preset].label} Room
              {fileCount > 0 ? ` · with your ${fileCount} file${fileCount === 1 ? "" : "s"}` : " · you can change anything"}
            </p>
          </div>
          <Link
            href={newRoomHref({ name: action.name, preset: action.preset })}
            className="flex items-center gap-1.5 rounded-full bg-linear-to-b from-indigo-500 to-violet-600 px-4 py-2 text-xs font-medium text-white shadow-[0_0_16px_-4px] shadow-indigo-500/70 transition-opacity hover:opacity-90"
          >
            Set up Room
            <Icon name="arrowRight" className="size-3.5" />
          </Link>
        </div>
      );
    }
  }
}
