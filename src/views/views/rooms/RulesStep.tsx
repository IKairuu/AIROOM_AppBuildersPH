"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { RoomDraft } from "@/controllers/useCreateRoomWizard";
import type { ChatMessage } from "@/models/chat/chat";
import { ROOM_PRESETS, ROOM_RULES_MAX } from "@/models/room/room-preset";
import ChatTextarea from "@/views/widgets/common/ChatTextarea";
import Icon from "@/views/widgets/common/Icon";
import AppLogo from "@/views/widgets/common/AppLogo";
import Spinner from "@/views/widgets/common/Spinner";

type RulesStepProps = {
  draft: RoomDraft;
  update: (patch: Partial<RoomDraft>) => void;
  messages: ChatMessage[];
  busy: boolean;
  send: (text: string) => Promise<void>;
};

// Configure the Room's chatbot by describing it. The rules on the right are
// what the chatbot follows; the host can also edit them by hand.
export default function RulesStep({ draft, update, messages, busy, send }: RulesStepProps) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages, busy]);

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || busy) return;
    void send(text);
    setText("");
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-white">How should the chatbot act?</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Describe it, like “make it a quiz bot”. I’ll write the rules. Phones in this Room get a chatbot that follows them.
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="flex min-h-80 flex-col rounded-2xl border border-line bg-white/2">
          <div className="max-h-96 flex-1 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-2">
                {ROOM_PRESETS[draft.preset].ruleStarters.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    disabled={busy}
                    className="cursor-pointer rounded-full border border-white/10 bg-white/3 px-3.5 py-1.5 text-left text-xs text-zinc-200 transition-colors hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {messages.map((m) => (
                  <li key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "gap-2.5"}`}>
                    {m.role === "assistant" && <AppLogo size={32} />}
                    <p
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-line ${
                        m.role === "user"
                          ? "rounded-br-md bg-linear-to-b from-indigo-500 to-violet-600 text-white"
                          : m.error
                            ? "rounded-tl-md border border-rose-400/25 bg-rose-400/8 text-rose-200"
                            : "rounded-tl-md border border-line bg-white/4 text-zinc-200"
                      }`}
                    >
                      {m.error ?? m.content}
                    </p>
                  </li>
                ))}
                {busy && (
                  <li className="flex items-center gap-2 pl-11 text-xs text-zinc-400">
                    <Spinner className="size-3.5" />
                    Writing the rules…
                  </li>
                )}
              </ul>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={submit} className="border-t border-line p-3">
            <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/3 py-1.5 pr-1.5 pl-3 focus-within:border-indigo-400/50">
              <ChatTextarea
                value={text}
                onValueChange={setText}
                maxHeight={120}
                placeholder={`e.g. ${ROOM_PRESETS[draft.preset].ruleStarters[0]}`}
                aria-label="Describe the chatbot"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!text.trim() || busy}
                aria-label="Send"
                className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-linear-to-b from-indigo-500 to-violet-600 text-white disabled:cursor-default disabled:opacity-50"
              >
                <Icon name="arrowUp" className="size-3.5" />
              </button>
            </div>
          </form>
        </div>

        <label className="flex flex-col">
          <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-white">
            Rules
            <span className="font-normal text-zinc-500">optional · you can edit them</span>
          </span>
          <textarea
            value={draft.rules}
            onChange={(e) => update({ rules: e.target.value })}
            maxLength={ROOM_RULES_MAX}
            placeholder="No rules yet. The chatbot answers questions from the Room’s files."
            className="min-h-80 flex-1 resize-y rounded-2xl border border-white/10 bg-white/3 p-4 font-mono text-[13px] leading-relaxed text-zinc-200 placeholder:font-sans placeholder:text-zinc-500 focus:border-indigo-400/60 focus:outline-none"
          />
        </label>
      </div>
    </>
  );
}
