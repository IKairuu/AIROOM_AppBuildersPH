import { ROOM_PRESETS, type RoomPresetId } from "@/models/room/room-preset";
import Icon, { type IconName } from "./Icon";

const presetIcons: Record<RoomPresetId, { icon: IconName; className: string }> = {
  general: { icon: "sparkles", className: "border-violet-400/25 bg-violet-400/10 text-violet-300" },
  class: { icon: "graduation", className: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300" },
  office: { icon: "briefcase", className: "border-sky-400/25 bg-sky-400/10 text-sky-300" },
  barangay: { icon: "landmark", className: "border-amber-400/25 bg-amber-400/10 text-amber-300" },
  emergency: { icon: "siren", className: "border-orange-400/25 bg-orange-400/10 text-orange-300" },
};

// A Room type's icon on its own colored tile.
export default function PresetIcon({ preset, size = "md" }: { preset: RoomPresetId; size?: "sm" | "md" }) {
  const p = presetIcons[preset];
  const box = size === "sm" ? "size-8 rounded-lg" : "size-10 rounded-xl";
  return (
    <span className={`grid shrink-0 place-items-center border ${box} ${p.className}`}>
      <Icon name={p.icon} className={size === "sm" ? "size-4" : "size-5"} />
    </span>
  );
}

// The Room type as a small colored tag, like "Class".
export function PresetBadge({ preset }: { preset: RoomPresetId }) {
  const p = presetIcons[preset];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs ${p.className}`}>
      <Icon name={p.icon} className="size-3.5" />
      {ROOM_PRESETS[preset].label}
    </span>
  );
}
