"use client";

import { useState } from "react";
import { BROADCAST_KINDS, type Broadcast, type BroadcastKind } from "@/models/broadcast/broadcast";
import { BROADCAST_STYLE } from "@/views/widgets/broadcast/broadcast-style";
import Icon from "@/views/widgets/common/Icon";

type BroadcastHistoryProps = {
  sent: Broadcast[];
  roomName: (target: string) => string;
  onReuse: (broadcast: Broadcast) => void;
  onRemove: (id: string) => void;
};

type Filter = "all" | BroadcastKind;

const timeOf = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

function dayLabel(iso: string) {
  const day = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (day.toDateString() === today.toDateString()) return "Today";
  if (day.toDateString() === yesterday.toDateString()) return "Yesterday";
  return day.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

// Everything sent, newest first, grouped by day. Pinned answers stay until unpinned.
export default function BroadcastHistory({ sent, roomName, onReuse, onRemove }: BroadcastHistoryProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = sent.filter(
    (m) => (filter === "all" || m.kind === filter) && (!q || m.text.toLowerCase().includes(q) || roomName(m.target).toLowerCase().includes(q)),
  );
  const groups: { label: string; items: Broadcast[] }[] = [];
  for (const m of shown) {
    const label = dayLabel(m.sentAt);
    const last = groups.at(-1);
    if (last?.label === label) last.items.push(m);
    else groups.push({ label, items: [m] });
  }

  const count = (kind: BroadcastKind) => sent.filter((m) => m.kind === kind).length;
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: sent.length },
    ...(Object.keys(BROADCAST_KINDS) as BroadcastKind[]).map((kind) => ({
      id: kind,
      label: BROADCAST_KINDS[kind].label,
      count: count(kind),
    })),
  ];

  return (
    <section aria-labelledby="broadcast-history" className="rounded-3xl border border-line bg-[#0e0e1c]/90 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id="broadcast-history" className="flex items-center gap-2 font-semibold text-white">
          <Icon name="bell" className="size-4 text-indigo-300" />
          History
        </h2>
        <label className="relative ml-auto w-full sm:w-56">
          <span className="sr-only">Search sent messages</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages…"
            className="w-full rounded-full border border-white/10 bg-white/3 px-4 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-400/60 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Filter by type">
        {filters.map((f) => {
          const selected = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(f.id)}
              className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                selected
                  ? f.id === "all"
                    ? "border-indigo-400/40 bg-indigo-500/15 text-white"
                    : BROADCAST_STYLE[f.id].chip
                  : "border-white/8 text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {f.id !== "all" && <Icon name={BROADCAST_STYLE[f.id].icon} className="size-3.5" />}
              {f.label}
              <span className="font-mono text-[10px] opacity-70">{f.count}</span>
            </button>
          );
        })}
      </div>

      {sent.length === 0 ? (
        <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-white/12 px-6 py-10 text-center">
          <span className="grid size-11 place-items-center rounded-2xl border border-indigo-400/25 bg-indigo-500/10 text-indigo-300">
            <Icon name="megaphone" />
          </span>
          <p className="mt-3 text-sm font-medium text-white">Nothing sent yet.</p>
          <p className="mt-1 text-xs text-zinc-500">Messages you send show up here, newest first.</p>
        </div>
      ) : groups.length === 0 ? (
        <p className="mt-5 rounded-2xl border border-dashed border-white/12 p-8 text-center text-sm text-zinc-400">
          No messages match.
        </p>
      ) : (
        <div className="mt-5 space-y-5">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="mb-2 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">{g.label}</h3>
              <ol className="relative space-y-2.5 border-l border-white/8 pl-4">
                {g.items.map((m) => {
                  const style = BROADCAST_STYLE[m.kind];
                  return (
                    <li key={m.id} className="rise-in group relative">
                      <span
                        className={`absolute top-4 -left-[21px] size-2.5 rounded-full ring-4 ring-[#0e0e1c] ${style.dot}`}
                        aria-hidden="true"
                      />
                      <div className={`flex items-start gap-3 rounded-2xl border p-4 transition-colors ${style.card}`}>
                        <Icon name={style.icon} className={`mt-0.5 size-4.5 shrink-0 ${style.text}`} />
                        <div className="min-w-0 flex-1">
                          <p className={`flex flex-wrap items-center gap-x-1.5 text-xs font-medium ${style.text}`}>
                            {BROADCAST_KINDS[m.kind].label}
                            <span className="text-white/30">·</span>
                            <span className="text-zinc-300">{roomName(m.target)}</span>
                            <span className="text-white/30">·</span>
                            <time dateTime={m.sentAt} className="font-mono text-zinc-400">
                              {timeOf(m.sentAt)}
                            </time>
                          </p>
                          <p className="mt-1 text-sm wrap-break-word whitespace-pre-wrap text-white">{m.text}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center">
                          <button
                            type="button"
                            onClick={() => onReuse(m)}
                            title="Put this message back in the composer"
                            className="cursor-pointer rounded-full px-3 py-1 text-xs text-zinc-300 transition-colors hover:bg-white/8 hover:text-white"
                          >
                            Reuse
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemove(m.id)}
                            className="cursor-pointer rounded-full px-3 py-1 text-xs text-zinc-300 transition-colors hover:bg-rose-500/15 hover:text-rose-200"
                          >
                            {m.kind === "pinned" ? "Unpin" : "Remove"}
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
