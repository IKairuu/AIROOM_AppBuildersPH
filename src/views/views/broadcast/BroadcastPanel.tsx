"use client";

import { useRef, type FormEvent, type KeyboardEvent } from "react";
import { useBroadcasts } from "@/controllers/useBroadcasts";
import { BROADCAST_KINDS, BROADCAST_TEXT_MAX, type Broadcast, type BroadcastKind } from "@/models/broadcast/broadcast";
import { BROADCAST_STYLE } from "@/views/widgets/broadcast/broadcast-style";
import { buttonClasses } from "@/views/widgets/common/ButtonLink";
import Icon from "@/views/widgets/common/Icon";
import PageTitle from "@/views/widgets/common/PageTitle";
import Spinner from "@/views/widgets/common/Spinner";
import BroadcastHistory from "./BroadcastHistory";
import BroadcastPreview from "./BroadcastPreview";

type RoomOption = { id: string; name: string };

const hints: Record<BroadcastKind, string> = {
  announcement: "News for everyone, like “The quiz starts at 2 PM.”",
  reminder: "A nudge, like “10 minutes left. Submit your answers.”",
  urgent: "Shows in red and makes phones buzz. For safety and time-critical news.",
  pinned: "Stays at the top of every chat, and the chatbot uses it as the official answer.",
};

function StepLabel({ n, children }: { n: number; children: string }) {
  return (
    <p className="mb-2.5 flex items-center gap-2 text-xs font-medium text-zinc-400">
      <span className="grid size-5 place-items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 font-mono text-[10px] text-indigo-200">
        {n}
      </span>
      {children}
    </p>
  );
}

export default function BroadcastPanel({ rooms, initial }: { rooms: RoomOption[]; initial: Broadcast[] }) {
  const b = useBroadcasts(initial);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const roomName = (target: string) => (target === "all" ? "All Rooms" : (rooms.find((r) => r.id === target)?.name ?? "A deleted Room"));
  const pinnedCount = b.sent.filter((m) => m.kind === "pinned").length;
  const left = BROADCAST_TEXT_MAX - b.text.length;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    void b.send();
  };

  // Ctrl+Enter (or Cmd+Enter) sends.
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      void b.send();
    }
  };

  const reuse = (m: Broadcast) => {
    b.setKind(m.kind);
    b.setTarget(m.target === "all" || rooms.some((r) => r.id === m.target) ? m.target : "all");
    b.setText(m.text);
    textRef.current?.focus();
    textRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-5 py-8 sm:px-8">
      <div className="rise-in flex flex-wrap items-end justify-between gap-4">
        <div>
          <PageTitle>Broadcast</PageTitle>
          <p className="mt-1.5 text-sm text-zinc-400">
            Send a message to every phone. It shows in their chat from “Host”, not from the chatbot.
          </p>
        </div>
        <ul className="flex gap-2 font-mono text-xs text-zinc-300">
          <li className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3 py-1.5">
            <Icon name="megaphone" className="size-3.5 text-indigo-300" />
            {b.sent.length} sent
          </li>
          <li className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3 py-1.5">
            <Icon name="pin" className="size-3.5 text-amber-300" />
            {pinnedCount} pinned
          </li>
        </ul>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form
          onSubmit={submit}
          className="rise-in space-y-6 rounded-3xl border border-line bg-[#0e0e1c]/90 p-5 sm:p-6"
          style={{ animationDelay: "60ms" }}
          aria-labelledby="broadcast-compose"
        >
          <h2 id="broadcast-compose" className="flex items-center gap-2 font-semibold text-white">
            <Icon name="broadcast" className="size-4 text-indigo-300" />
            Compose
          </h2>

          <div>
            <StepLabel n={1}>Type</StepLabel>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Type">
              {(Object.keys(BROADCAST_KINDS) as BroadcastKind[]).map((kind) => {
                const style = BROADCAST_STYLE[kind];
                const selected = b.kind === kind;
                return (
                  <button
                    key={kind}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => b.setKind(kind)}
                    className={`flex cursor-pointer flex-col items-start gap-2 rounded-2xl border p-3 text-left text-sm transition ${
                      selected
                        ? `${style.chip} shadow-[0_8px_24px_-14px] shadow-current`
                        : "border-white/8 bg-white/2 text-zinc-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/5"
                    }`}
                  >
                    <Icon name={style.icon} className="size-4.5" />
                    <span className="font-medium">{BROADCAST_KINDS[kind].label}</span>
                  </button>
                );
              })}
            </div>
            <p key={b.kind} className="rise-in mt-2.5 text-xs text-zinc-500">
              {hints[b.kind]}
            </p>
          </div>

          <div>
            <StepLabel n={2}>Message</StepLabel>
            <div className="rounded-2xl border border-white/10 bg-white/3 transition-colors focus-within:border-indigo-400/60">
              <textarea
                ref={textRef}
                value={b.text}
                onChange={(e) => b.setText(e.target.value)}
                onKeyDown={onKeyDown}
                maxLength={BROADCAST_TEXT_MAX}
                rows={5}
                placeholder={b.kind === "pinned" ? "e.g. The Module 2 quiz is on Friday and covers pages 1 to 2." : "Type your message…"}
                aria-label="Message"
                className="block w-full resize-y bg-transparent p-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <div className="flex items-center justify-between gap-3 border-t border-white/6 px-4 py-2 text-[11px] text-zinc-500">
                <span className="hidden sm:inline">Ctrl + Enter to send</span>
                <span className={`ml-auto font-mono ${left < 50 ? "text-amber-300" : ""}`}>
                  {b.text.length}/{BROADCAST_TEXT_MAX}
                </span>
              </div>
            </div>
          </div>

          <div>
            <StepLabel n={3}>Send to</StepLabel>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  value={b.target}
                  onChange={(e) => b.setTarget(e.target.value)}
                  aria-label="Send to"
                  className="cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#141420] py-2.5 pr-9 pl-3.5 text-sm text-white focus:border-indigo-400/60 focus:outline-none"
                >
                  <option value="all">All Rooms</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <Icon
                  name="chevronDown"
                  className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-zinc-400"
                />
              </div>
              <button
                type="submit"
                disabled={!b.text.trim() || b.sending}
                className={`ml-auto cursor-pointer ${buttonClasses("primary")}`}
              >
                {b.sending ? <Spinner /> : <Icon name={BROADCAST_STYLE[b.kind].icon} />}
                {b.sending ? "Sending…" : "Send to phones"}
              </button>
            </div>
          </div>

          {b.error && (
            <p role="alert" className="text-sm text-rose-300">
              {b.error}
            </p>
          )}
        </form>

        <aside className="rise-in lg:sticky lg:top-6" style={{ animationDelay: "120ms" }} aria-label="Preview">
          <h2 className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" />
            Preview on phones
          </h2>
          <BroadcastPreview kind={b.kind} text={b.text} targetName={roomName(b.target)} />
        </aside>
      </div>

      <div className="rise-in" style={{ animationDelay: "180ms" }}>
        <BroadcastHistory sent={b.sent} roomName={roomName} onReuse={reuse} onRemove={(id) => void b.remove(id)} />
      </div>
    </div>
  );
}
