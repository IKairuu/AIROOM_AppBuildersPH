import type { BroadcastKind } from "@/models/broadcast/broadcast";
import type { IconName } from "@/views/widgets/common/Icon";

// How each broadcast type looks, on the host's page and on phones.
export const BROADCAST_STYLE: Record<BroadcastKind, { icon: IconName; chip: string; card: string; text: string; dot: string }> = {
  announcement: {
    icon: "megaphone",
    chip: "border-indigo-400/40 bg-indigo-500/15 text-indigo-200",
    card: "border-indigo-400/30 bg-indigo-500/10",
    text: "text-indigo-200",
    dot: "bg-indigo-400",
  },
  reminder: {
    icon: "bell",
    chip: "border-cyan-400/40 bg-cyan-400/15 text-cyan-200",
    card: "border-cyan-400/30 bg-cyan-400/10",
    text: "text-cyan-200",
    dot: "bg-cyan-400",
  },
  urgent: {
    icon: "alert",
    chip: "border-rose-400/50 bg-rose-500/20 text-rose-200",
    card: "border-rose-400/50 bg-rose-500/15",
    text: "text-rose-200",
    dot: "bg-rose-400",
  },
  pinned: {
    icon: "pin",
    chip: "border-amber-400/40 bg-amber-400/15 text-amber-200",
    card: "border-amber-400/35 bg-amber-400/10",
    text: "text-amber-200",
    dot: "bg-amber-400",
  },
};
