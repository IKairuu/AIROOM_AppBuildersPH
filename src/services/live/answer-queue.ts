// Server-only: the fair line for the laptop's AI. Every question is accepted;
// up to QUEUE_RULES.maxAnswering are answered at once and the rest wait their
// turn, urgent first, then first come first served. Only counts and anonymous
// labels are kept here, never the question text.
import { QUEUE_RULES, type QueueItem } from "@/models/queue/queue";
import { ChatPublicError } from "@/services/chat/chat-http";
import { newId } from "@/services/storage/data-store";

/** A problem to show on the phone as is. */
export class QueueError extends ChatPublicError {}

type Entry = QueueItem & {
  phoneId: string;
  start: () => void;
  fail: (error: Error) => void;
};

type QueueState = { entries: Entry[]; answeredToday: number; urgentAt: number[]; day: string };

const g = globalThis as { __airoomQueue?: QueueState };
const q = (g.__airoomQueue ??= { entries: [], answeredToday: 0, urgentAt: [], day: "" });

const today = () => new Date().toDateString();
const URGENT_WINDOW_MS = 5 * 60_000;

function answering() {
  return q.entries.filter((e) => e.status === "answering");
}

function waitingInOrder() {
  return q.entries
    .filter((e) => e.status === "waiting")
    .sort((a, b) => Number(b.urgent) - Number(a.urgent) || a.askedAt.localeCompare(b.askedAt));
}

// Starts as many waiting questions as there are free slots.
function pump() {
  let free = QUEUE_RULES.maxAnswering - answering().length;
  for (const e of waitingInOrder()) {
    if (free <= 0) break;
    e.status = "answering";
    free -= 1;
    e.start();
  }
}

export function isRush(): boolean {
  return q.entries.length > QUEUE_RULES.rushAt;
}

export type Ticket = {
  // Resolves when it's this question's turn.
  ready: Promise<void>;
  startedRightAway: boolean;
  // Frees the slot; call once the answer is done, failed or canceled.
  done: () => void;
};

/**
 * Puts a question in line. Throws QueueError when this phone already has a
 * question going (urgent ones are always accepted).
 */
export function enqueue(opts: { roomId: string; phoneId: string; phoneLabel: string; urgent: boolean; signal: AbortSignal }): Ticket {
  const { roomId, phoneId, phoneLabel, urgent, signal } = opts;
  if (!urgent && q.entries.some((e) => e.phoneId === phoneId)) {
    throw new QueueError("Please wait for your current answer to finish, then ask again. This keeps it fair when many people are asking.");
  }

  let start!: () => void;
  let fail!: (error: Error) => void;
  const ready = new Promise<void>((resolve, reject) => {
    start = resolve;
    fail = reject;
  });
  const entry: Entry = {
    id: newId(),
    roomId,
    phoneId,
    phoneLabel,
    status: "waiting",
    urgent,
    askedAt: new Date().toISOString(),
    start,
    fail,
  };
  q.entries.push(entry);
  if (urgent) q.urgentAt.push(Date.now());
  pump();
  const startedRightAway = entry.status === "answering";

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    const wasAnswering = entry.status === "answering";
    q.entries = q.entries.filter((e) => e !== entry);
    if (wasAnswering) {
      if (q.day !== today()) {
        q.day = today();
        q.answeredToday = 0;
      }
      q.answeredToday += 1;
    }
    pump();
  };
  // The phone left or pressed Stop while waiting: give the place to the next one.
  signal.addEventListener("abort", () => {
    if (entry.status === "waiting") entry.fail(new QueueError("Stopped."));
    done();
  });
  return { ready, startedRightAway, done };
}

/** The host skips a waiting question. The phone is told and can ask again. */
export function skip(id: string): boolean {
  const entry = q.entries.find((e) => e.id === id && e.status === "waiting");
  if (!entry) return false;
  q.entries = q.entries.filter((e) => e !== entry);
  entry.fail(new QueueError("The host skipped this question. You can ask again."));
  pump();
  return true;
}

/** Cancels waiting questions when a Room's session ends. Answers already being written finish. */
export function cancelRoom(roomId: string): void {
  for (const e of q.entries.filter((x) => x.roomId === roomId && x.status === "waiting")) {
    q.entries = q.entries.filter((x) => x !== e);
    e.fail(new QueueError("The host ended the session."));
  }
  pump();
}

export function queueView() {
  q.urgentAt = q.urgentAt.filter((t) => Date.now() - t < URGENT_WINDOW_MS);
  const items: QueueItem[] = [...answering(), ...waitingInOrder()].map(
    ({ id, roomId, phoneLabel, status, urgent, askedAt }) => ({ id, roomId, phoneLabel, status, urgent, askedAt }),
  );
  return {
    items,
    askingPhones: new Set(q.entries.map((e) => `${e.roomId}:${e.phoneId}`)),
    answering: answering().length,
    waiting: q.entries.length - answering().length,
    rush: isRush(),
    recentUrgent: q.urgentAt.length,
    answeredToday: q.day === today() ? q.answeredToday : 0,
  };
}
