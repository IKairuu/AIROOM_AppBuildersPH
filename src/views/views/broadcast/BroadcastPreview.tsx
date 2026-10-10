import { BROADCAST_KINDS, type BroadcastKind } from "@/models/broadcast/broadcast";
import HostMessageCard from "@/views/widgets/broadcast/HostMessageCard";
import AppLogo from "@/views/widgets/common/AppLogo";
import Icon from "@/views/widgets/common/Icon";

type BroadcastPreviewProps = {
  kind: BroadcastKind;
  text: string;
  targetName: string;
};

const notes: Record<BroadcastKind, string> = {
  announcement: "shows in the chat, in the order phones get it.",
  reminder: "shows in the chat, in the order phones get it.",
  urgent: "shows in red, and phones buzz when it arrives.",
  pinned: "stays at the top of the chat until you unpin it.",
};

// How the message will look on a phone in the Room, updated as the host types.
export default function BroadcastPreview({ kind, text, targetName }: BroadcastPreviewProps) {
  const empty = !text.trim();
  const card = (
    <div key={kind} className="rise-in">
      <HostMessageCard kind={kind} text={empty ? "Your message shows here…" : text} placeholder={empty} />
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="mx-auto w-full max-w-[300px] rounded-[2.25rem] border border-white/12 bg-[#08080f] p-2 shadow-[0_30px_80px_-30px] shadow-indigo-500/50">
        <div className="relative flex h-[440px] flex-col overflow-hidden rounded-[1.8rem] border border-white/6 bg-background">
          <span className="absolute top-2 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
          <div className="flex items-center gap-2.5 border-b border-line px-4 pt-8 pb-3">
            <AppLogo size={26} />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">{targetName}</p>
              <p className="flex items-center gap-1 text-[10px] text-zinc-500">
                <Icon name="lock" className="size-2.5" />
                Private chat on this Wi-Fi
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3 py-3 text-[13px]">
            {kind === "pinned" && card}
            <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-linear-to-b from-indigo-500 to-violet-600 px-3 py-2 text-white">
              When is the quiz?
            </p>
            <p className="max-w-[85%] rounded-2xl rounded-tl-md border border-line bg-white/4 px-3 py-2 text-zinc-300">
              Let me check the Room’s files for you.
            </p>
            {kind !== "pinned" && card}
          </div>

          <div className="m-3 mt-0 flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3.5 py-2 text-[12px] text-zinc-500">
            Ask anything…
            <span className="ml-auto grid size-6 place-items-center rounded-full bg-indigo-500/60 text-white">
              <Icon name="arrowUp" className="size-3" />
            </span>
          </div>
        </div>
      </div>
      <p className="flex items-start justify-center gap-1.5 text-center text-xs text-zinc-500">
        <Icon name="info" className="mt-px size-3.5 shrink-0" />
        {BROADCAST_KINDS[kind].label}: {notes[kind]}
      </p>
    </div>
  );
}
