"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useQueueSnapshot, useRoomSessionControl } from "@/controllers/useQueue";
import { roomHref } from "@/lib/constants/routes";
import { QUEUE_RULES, type QueueItem } from "@/models/queue/queue";
import Icon from "@/views/widgets/common/Icon";
import PageTitle from "@/views/widgets/common/PageTitle";
import Spinner from "@/views/widgets/common/Spinner";
import SessionButton, { SessionBadge } from "@/views/widgets/queue/SessionButton";

function ago(iso: string) {
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  return m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
}

function Stat({ label, value, hint }: { label: string; value: ReactNode; hint: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panel/80 p-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
      <p className="text-xs text-zinc-400">{hint}</p>
    </div>
  );
}

function Card({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-line bg-[#0e0e1c]/90 p-5">
      <h2 className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">{title}</h2>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function QuestionRow({ item, room, onSkip }: { item: QueueItem; room: string; onSkip: () => void }) {
  const answering = item.status === "answering";
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-line bg-white/2 px-3.5 py-2.5">
      <span className={`grid size-8 shrink-0 place-items-center rounded-full ${answering ? "bg-indigo-500/15 text-indigo-300" : "bg-white/5 text-zinc-400"}`}>
        {answering ? <Spinner className="size-4" /> : <Icon name="gauge" className="size-4" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-white">
          {item.phoneLabel}
          {item.urgent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2 py-0.5 text-[11px] text-rose-200">
              <Icon name="siren" className="size-3" />
              Urgent
            </span>
          )}
        </p>
        <p className="text-xs text-zinc-500">
          {room} · asked {ago(item.askedAt)}
        </p>
      </div>
      {answering ? (
        <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] text-indigo-200">Answering</span>
      ) : (
        <>
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-300">Starting soon</span>
          <button
            type="button"
            onClick={onSkip}
            aria-label={`Skip ${item.phoneLabel}'s question`}
            title="Skip this question"
            className="grid size-8 cursor-pointer place-items-center rounded-full text-zinc-400 hover:bg-white/8 hover:text-white"
          >
            <Icon name="x" className="size-4" />
          </button>
        </>
      )}
    </li>
  );
}

// Who's in the room. Every question is accepted right away; up to 4 are answered
// at once, urgent ones first. The host sees how busy it is, never what people asked.
export default function QueuePanel() {
  const { snapshot, offline, refresh, skip } = useQueueSnapshot();
  const control = useRoomSessionControl(() => void refresh());

  if (!snapshot) {
    return (
      <div className="flex items-center gap-2 px-8 py-12 text-sm text-zinc-400">
        <Spinner /> {offline ? "Can’t reach the AIROOM server." : "Loading…"}
      </div>
    );
  }

  const roomName = (id: string) => snapshot.rooms.find((r) => r.roomId === id)?.name ?? "Room";
  const liveRooms = snapshot.rooms.filter((r) => r.session.state === "live");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 px-5 py-8 sm:px-8">
      <div>
        <PageTitle>Who’s in the room</PageTitle>
        <p className="mt-1.5 max-w-2xl text-sm text-zinc-400">
          Every question is accepted right away. AIROOM answers up to {QUEUE_RULES.maxAnswering} at once, urgent ones
          first. You see how busy it is, never what people asked.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Phones" value={snapshot.phones.length} hint={`In ${liveRooms.length} live Room${liveRooms.length === 1 ? "" : "s"}`} />
        <Stat label="Being answered" value={snapshot.answering} hint={`Up to ${QUEUE_RULES.maxAnswering} at once`} />
        <Stat label="Starting soon" value={snapshot.waiting} hint={snapshot.waiting ? "A few seconds each" : "No wait"} />
        <Stat
          label="Speed"
          value={snapshot.rush ? <span className="text-amber-300">Busy</span> : "Normal"}
          hint={snapshot.rush ? "Shorter answers on" : `${snapshot.answeredToday} answered today`}
        />
      </div>

      {snapshot.recentUrgent > 0 && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4">
          <Icon name="siren" className="mt-0.5 size-5 shrink-0 text-rose-300" />
          <p className="text-sm text-rose-100">
            <b>Someone may need help.</b> An urgent question came in (like an injury, fire or drowning). It went first and
            showed emergency hotlines. Look around the room and check on people.
          </p>
        </div>
      )}

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card title="Questions right now" hint="Anonymous. The text stays between the phone and the AI.">
          {snapshot.items.length === 0 ? (
            <p className="py-8 text-center text-sm text-zinc-400">
              {liveRooms.length ? "No questions right now. They appear here the moment a phone asks." : "Start a Room’s session to accept questions."}
            </p>
          ) : (
            <ul className="space-y-2">
              {snapshot.items.map((item) => (
                <QuestionRow key={item.id} item={item} room={roomName(item.roomId)} onSkip={() => void skip(item.id)} />
              ))}
            </ul>
          )}
        </Card>

        <div className="space-y-5">
          <Card title="Rooms">
            {snapshot.rooms.length === 0 ? (
              <p className="text-sm text-zinc-400">No Rooms yet.</p>
            ) : (
              <ul className="space-y-2.5">
                {snapshot.rooms.map((r) => (
                  <li key={r.roomId} className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <Link href={roomHref(r.roomId)} className="block truncate text-sm font-medium text-white hover:text-indigo-200">
                        {r.name}
                      </Link>
                      <p className="flex items-center gap-2 text-xs text-zinc-500">
                        <SessionBadge state={r.session.state} />
                        {r.session.state === "live" && `${r.phones} phone${r.phones === 1 ? "" : "s"}`}
                      </p>
                    </div>
                    <SessionButton
                      size="sm"
                      state={r.session.state}
                      busy={control.busyRoom === r.roomId}
                      onStart={() => void control.start(r.roomId)}
                      onEnd={() => void control.end(r.roomId)}
                    />
                  </li>
                ))}
              </ul>
            )}
            {control.error && <p className="mt-2 text-xs text-rose-300">{control.error}</p>}
          </Card>

          <Card title="Phones" hint="Anonymous labels. No names or numbers.">
            {snapshot.phones.length === 0 ? (
              <p className="text-sm text-zinc-400">No phones yet. They show up when someone opens a Room’s QR code.</p>
            ) : (
              <ul className="space-y-2">
                {snapshot.phones.map((p) => (
                  <li key={`${p.roomId}-${p.label}`} className="flex items-center gap-2.5 text-sm">
                    <span className="grid size-7 place-items-center rounded-full bg-white/6 font-mono text-[11px] text-zinc-300">
                      {p.label.slice(-2)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-white">{p.label}</span>
                      <span className="block text-xs text-zinc-500">
                        {roomName(p.roomId)} · joined {ago(p.joinedAt)}
                      </span>
                    </span>
                    {p.asking && <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-[11px] text-indigo-200">Asking</span>}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="How busy times work">
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-300">
              <li>
                Up to <b>{QUEUE_RULES.maxAnswering} answers</b> are written at the same time.
              </li>
              <li>
                Each phone asks <b>one question at a time</b>, so nobody can flood it.
              </li>
              <li>
                When more than {QUEUE_RULES.rushAt} are asking, answers get <b>shorter</b> so everyone gets one sooner.
              </li>
              <li>
                Urgent questions (drowning, bleeding, fire) <b>go first</b> and show hotlines instantly.
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
