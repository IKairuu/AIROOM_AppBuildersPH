"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRoomFeed } from "@/controllers/useRoomFeed";
import { useRoomChat } from "@/controllers/useRoomChat";
import type { ChatMessage } from "@/models/chat/chat";
import type { Citation } from "@/models/knowledge/knowledge-file";
import type { RoomPresetId } from "@/models/room/room-preset";
import BouncingDots from "@/views/widgets/common/BouncingDots";
import ChatTextarea from "@/views/widgets/common/ChatTextarea";
import Icon from "@/views/widgets/common/Icon";
import AppLogo from "@/views/widgets/common/AppLogo";
import ModelText from "@/views/widgets/common/ModelText";
import PresetIcon from "@/views/widgets/common/PresetIcon";
import HostMessageCard from "@/views/widgets/broadcast/HostMessageCard";

type PhoneRoomChatProps = {
  roomId: string;
  name: string;
  preset: RoomPresetId;
  purpose: string;
  hasFiles: boolean;
};

function SourceChips({ sources }: { sources: Citation[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5 border-t border-white/8 pt-2.5" aria-label="Sources">
      {sources.map((s) => (
        <li
          key={s.n}
          className="flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-2.5 py-1 text-[11px] text-cyan-200"
        >
          <span className="font-mono text-cyan-300">[{s.n}]</span>
          {s.fileName}
          {s.page ? ` · p. ${s.page}` : ""}
        </li>
      ))}
    </ul>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-linear-to-b from-indigo-500 to-violet-600 px-4 py-2.5 text-[15px] whitespace-pre-wrap text-white">
        {message.content}
      </p>
    );
  }
  // Show only the sources the answer cites; all of them if it cites none.
  const cited = (message.sources ?? []).filter((s) => message.content.includes(`[${s.n}]`));
  const sources = !message.streaming && cited.length > 0 ? cited : (message.sources ?? []);
  return (
    <div className="max-w-[85%] space-y-2 rounded-2xl rounded-tl-md border border-line bg-white/5 px-4 py-2.5 text-[15px] leading-relaxed text-zinc-200">
      {message.safety && (
        <div role="alert" className="rounded-xl border border-rose-400/50 bg-rose-500/15 p-3">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-rose-200">
            <Icon name="siren" className="size-4" />
            {message.safety.title}
          </p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-white">
            {message.safety.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      )}
      {message.content ? (
        <ModelText text={message.content} />
      ) : message.waiting ? (
        <p className="text-sm text-zinc-400">Many people are asking right now. Yours starts in a few seconds.</p>
      ) : (
        message.streaming && <p className="text-sm text-zinc-400">Looking it up…</p>
      )}
      {message.short && message.content && <p className="text-[11px] text-amber-300/80">Short: busy room</p>}
      {sources.length > 0 && <SourceChips sources={sources} />}
      {message.error && <p className="mt-2 text-xs text-rose-300/90">{message.error}</p>}
    </div>
  );
}

// The chat phones get after scanning a Room's QR code. Answers come from this Room's files only.
export default function PhoneRoomChat({ roomId, name, preset, purpose, hasFiles }: PhoneRoomChatProps) {
  const { messages, streaming, send, stop, clear } = useRoomChat(roomId);
  // Leaving clears the chat from this phone and disconnects it from the Room.
  const [left, setLeft] = useState(false);
  const { session, pinned, feed } = useRoomFeed(roomId, clear, !left);
  const live = session?.state === "live" && !left;
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Chat messages and host broadcasts in the order this phone got them.
  const timeline = [
    ...messages.map((m) => ({ key: m.id, at: m.at ?? 0, message: m })),
    ...feed.map((f) => ({ key: f.broadcast.id, at: f.at, broadcast: f.broadcast })),
  ].sort((a, b) => a.at - b.at);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, feed.length]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || streaming || !live) return;
    void send(draft);
    setDraft("");
  };

  const leave = () => {
    clear();
    setDraft("");
    setLeft(true);
  };

  if (left) {
    return (
      <div className="mx-auto flex h-dvh w-full max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
        <AppLogo size={64} />
        <h1 className="text-xl font-semibold text-white">You left {name}</h1>
        <p className="max-w-xs text-sm text-zinc-400">Your chat was cleared from this phone. Scan the Room’s QR code, or tap below, to come back.</p>
        <button
          type="button"
          onClick={() => setLeft(false)}
          className="rounded-full bg-linear-to-b from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-medium text-white"
        >
          Rejoin
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-dvh w-full max-w-xl flex-col border-line sm:border-x">
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <PresetIcon preset={preset} size="sm" />
        <div className="min-w-0">
          <h1 className="truncate font-semibold text-white">{name}</h1>
          <p className="flex items-center gap-1 text-[11px] text-zinc-500">
            <Icon name="lock" className="size-3" />
            The host can’t read your questions
          </p>
        </div>
        <button
          type="button"
          onClick={leave}
          className="ml-auto flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-200 transition-colors hover:bg-white/8"
        >
          <Icon name="arrowLeft" className="size-3.5" />
          Leave room
        </button>
      </header>

      {pinned.length > 0 && (
        <div className="space-y-2 border-b border-line px-4 py-3" aria-label="Pinned by the host">
          {pinned.map((p) => (
            <HostMessageCard key={p.id} kind={p.kind} text={p.text} />
          ))}
        </div>
      )}

      <main className="flex-1 overflow-y-auto px-4 py-5" aria-live="polite">
        {!live && session ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <AppLogo size={64} />
            <h2 className="mt-5 text-xl font-semibold text-white">
              Waiting for the host
            </h2>
            <p className="mt-1.5 max-w-xs text-sm text-zinc-400">
              {session.state === "ended"
                ? "The last session ended and your chat was cleared from this phone. A new one opens here."
                : "The chat opens when the host starts this Room. Keep this page open."}
            </p>
            <span className="mt-5 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-xs text-zinc-300">
              <BouncingDots className="bg-indigo-300" />
              Waiting for the host to start
            </span>
          </div>
        ) : timeline.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <AppLogo size={64} />
            <h2 className="mt-5 text-xl font-semibold text-white">Ask anything</h2>
            <p className="mt-1.5 max-w-xs text-sm text-zinc-400">{purpose}</p>
            {hasFiles && (
              <p className="mt-3 max-w-xs text-xs text-zinc-500">Answers come from this Room’s files and show where.</p>
            )}
          </div>
        ) : (
          <ul className="space-y-4">
            {timeline.map((item) =>
              "broadcast" in item ? (
                <li key={item.key}>
                  <HostMessageCard kind={item.broadcast.kind} text={item.broadcast.text} />
                </li>
              ) : (
                <li key={item.key} className={`flex ${item.message.role === "user" ? "justify-end" : "gap-2.5"}`}>
                  {item.message.role === "assistant" && <AppLogo size={32} />}
                  <Bubble message={item.message} />
                </li>
              ),
            )}
          </ul>
        )}
        <div ref={endRef} />
      </main>

      <form onSubmit={submit} className="border-t border-line px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/4 py-1.5 pr-1.5 pl-4 focus-within:border-indigo-400/50">
          <ChatTextarea
            value={draft}
            onValueChange={setDraft}
            placeholder={live ? "Type your question…" : "The chat opens when the host starts"}
            aria-label={`Ask ${name}`}
            enterKeyHint="send"
            disabled={!live}
            maxHeight={128}
            className="min-w-0 flex-1 bg-transparent py-2 text-base text-white placeholder:text-zinc-500 focus:outline-none"
          />
          {streaming ? (
            <button
              type="button"
              onClick={stop}
              aria-label="Stop the answer"
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/8 text-white"
            >
              <Icon name="stop" className="size-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send"
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-linear-to-b from-indigo-500 to-violet-600 text-white disabled:opacity-50"
            >
              <Icon name="arrowUp" className="size-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
