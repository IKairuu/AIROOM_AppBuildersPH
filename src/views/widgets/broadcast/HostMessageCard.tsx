import { BROADCAST_KINDS, type BroadcastKind } from "@/models/broadcast/broadcast";
import Icon from "@/views/widgets/common/Icon";
import { BROADCAST_STYLE } from "./broadcast-style";

type HostMessageCardProps = {
  kind: BroadcastKind;
  text: string;
  // Dims the text, for a preview with nothing typed yet.
  placeholder?: boolean;
};

// A message from the host as phones show it, set apart from the chatbot's answers.
export default function HostMessageCard({ kind, text, placeholder }: HostMessageCardProps) {
  const style = BROADCAST_STYLE[kind];
  return (
    <div className={`w-full rounded-2xl border px-4 py-3 ${style.card}`} role={kind === "urgent" && !placeholder ? "alert" : undefined}>
      <p className={`flex items-center gap-1.5 text-xs font-semibold ${style.text}`}>
        <Icon name={style.icon} className="size-3.5" />
        Host · {BROADCAST_KINDS[kind].label}
      </p>
      <p
        className={`mt-1 text-[15px] leading-relaxed wrap-break-word whitespace-pre-wrap ${placeholder ? "text-zinc-500 italic" : "text-white"}`}
      >
        {text}
      </p>
    </div>
  );
}
