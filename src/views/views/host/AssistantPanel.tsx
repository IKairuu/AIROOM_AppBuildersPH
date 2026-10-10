"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAssistantChat } from "@/controllers/useAssistantChat";
import { useFileUploads } from "@/controllers/useFileUploads";
import { BROADCAST_HREF, NEW_ROOM_HREF, QUEUE_HREF } from "@/lib/constants/routes";
import { parseAssistantReply } from "@/lib/utils/assistant-actions";
import type { ChatMessage } from "@/models/chat/chat";
import AppLogo from "@/views/widgets/common/AppLogo";
import Icon, { type IconName } from "@/views/widgets/common/Icon";
import ActiveModel from "@/views/widgets/common/ActiveModel";
import ChatTextarea from "@/views/widgets/common/ChatTextarea";
import ModelText from "@/views/widgets/common/ModelText";
import AttachButton from "@/views/widgets/files/AttachButton";
import FileChips from "@/views/widgets/files/FileChips";
import FileDropTarget from "@/views/widgets/files/FileDropTarget";
import AssistantActionCard from "./AssistantActionCard";
import RoomCreationCard from "./RoomCreationCard";
import Greeting from "./Greeting";

const suggestions = [
  "Create a class Room for Grade 9 Science",
  "Tell everyone the quiz starts at 2 PM",
  "How many phones are connected?",
  "Explain photosynthesis simply",
];

// Shortcuts to the host's other pages.
const quickActions: {
  icon: IconName;
  title: string;
  body: string;
  href: string;
}[] = [
  {
    icon: "plus",
    title: "Create a Room",
    body: "Your files, your rules",
    href: NEW_ROOM_HREF,
  },
  {
    icon: "megaphone",
    title: "Message everyone",
    body: "A note on every phone",
    href: BROADCAST_HREF,
  },
  {
    icon: "users",
    title: "Queue & phones",
    body: "How busy the room is",
    href: QUEUE_HREF,
  },
];

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Thinking">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="size-1.5 animate-bounce rounded-full bg-zinc-400"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

function MessageBubble({
  message,
  hostMessage,
  onConfirmRoom,
  onCancelRoom,
  onEditRoom,
}: {
  message: ChatMessage;
  hostMessage?: string;
  onConfirmRoom: () => void;
  onCancelRoom: () => void;
  onEditRoom: () => void;
}) {
  if (message.role === "user") {
    return (
      <p className="rise-in max-w-[75%] rounded-2xl rounded-br-md bg-linear-to-b from-indigo-500 to-violet-600 px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-white shadow-[0_8px_24px_-12px] shadow-indigo-500/60">
        {message.content}
      </p>
    );
  }
  const { text, actions } = parseAssistantReply(message.content, {
    hostMessage,
    finished: !message.streaming && !message.error,
    creatingRoom: !!message.roomCreation,
  });
  return (
    <div className="rise-in max-w-[75%] rounded-2xl rounded-tl-md border border-line bg-white/4 backdrop-blur-sm px-4 py-2.5 text-sm leading-relaxed text-zinc-200">
      {/* With a Room card, the card is the summary: the model's own wording (which
          a small model sometimes gets wrong, like "it's being created") isn't shown. */}
      {message.roomCreation ? (
        <p>Here are the details for your new Room.</p>
      ) : text ? (
        <ModelText text={text} />
      ) : (
        message.streaming && <TypingDots />
      )}
      {actions
        .filter((action) => action.type !== "create_room_now")
        .map((action) => (
          <AssistantActionCard key={action.type} action={action} />
        ))}
      {message.roomCreation && (
        <RoomCreationCard
          creation={message.roomCreation}
          onConfirm={onConfirmRoom}
          onCancel={onCancelRoom}
          onEdit={onEditRoom}
        />
      )}
      {message.error && (
        <p
          className={`text-xs text-rose-300/90 ${text ? "mt-2" : ""}`}
          role="status"
        >
          {message.error}
        </p>
      )}
    </div>
  );
}

// Status pill above the greeting, styled like the one on the start page.
function StatusPill() {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 py-1.5 pr-3.5 pl-1.5 font-mono text-[11px] tracking-[0.12em] text-zinc-300 uppercase backdrop-blur-sm">
      <span className="relative grid size-[18px] place-items-center rounded-full border border-white/10 bg-white/4">
        <span className="ping-ring absolute inset-0 rounded-full bg-emerald-400/40" />
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" />
      </span>
      Offline AI · running on this laptop
    </p>
  );
}

function Hero() {
  return (
    <div className="flex flex-col items-center">
      <div className="rise-in relative grid size-44 place-items-center">
        <span className="glow-pulse absolute inset-2 rounded-full bg-indigo-500/30 blur-3xl" />
        <span className="orbit absolute inset-0 rounded-full border border-dashed border-indigo-300/20">
          <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-violet-300 shadow-[0_0_10px] shadow-violet-300" />
        </span>
        <span className="orbit-reverse absolute inset-5 rounded-full border border-indigo-400/15">
          <span className="absolute -top-0.75 left-1/2 size-1.5 rounded-full bg-indigo-300/80" />
        </span>
        <AppLogo
          size={104}
          priority
          className="logo-bob relative drop-shadow-[0_18px_36px_rgb(79_70_229/0.55)]"
        />
      </div>
      <div className="rise-in mt-4" style={{ animationDelay: "80ms" }}>
        <StatusPill />
      </div>
      <div className="rise-in mt-5" style={{ animationDelay: "140ms" }}>
        <Greeting />
      </div>
    </div>
  );
}

export default function AssistantPanel() {
  const [draft, setDraft] = useState("");
  const { messages, streaming, send: sendMessage, stop, clear, confirmRoom, cancelRoom } = useAssistantChat();
  // Back from a chat shows the start view again (suggestions and shortcut cards); the chat is kept.
  const [viewingHome, setViewingHome] = useState(false);
  const uploads = useFileUploads();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const started = messages.length > 0 && !viewingHome;

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: streaming ? "auto" : "smooth",
      block: "nearest",
    });
  }, [messages, streaming]);

  const fillDraft = (text: string) => {
    setDraft(text);
    inputRef.current?.focus();
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || streaming) return;
    setDraft("");
    setViewingHome(false);
    void sendMessage(text);
  };

  const composer = (
    <form onSubmit={send} className="w-full">
      <div className="sheen-border rounded-3xl border border-white/6 bg-[#0e0e1c]/90 px-5 pt-4 pb-3 shadow-[0_0_40px_-12px] shadow-indigo-500/40 backdrop-blur-md transition-shadow focus-within:shadow-[0_0_56px_-10px] focus-within:shadow-indigo-500/60">
        {(uploads.pending.length > 0 || uploads.attempts.length > 0) && (
          <div className="mb-3 space-y-2 border-b border-white/8 pb-3">
            <FileChips
              files={uploads.pending}
              attempts={uploads.attempts}
              onRemove={(id) => void uploads.removeFile(id)}
              onDismiss={uploads.dismissError}
            />
            {uploads.pending.length > 0 && (
              <p className="text-[11px] text-zinc-500">
                Saved on this laptop for your next Room. Ask me to create a Room
                to use {uploads.pending.length === 1 ? "it" : "them"}.
              </p>
            )}
          </div>
        )}
        <ChatTextarea
          ref={inputRef}
          value={draft}
          onValueChange={setDraft}
          placeholder="Try “create a barangay Room” or ask anything…"
          aria-label="Message the assistant"
          className="w-full bg-transparent py-1 text-[15px] leading-relaxed text-white placeholder:text-zinc-500 focus:outline-none"
        />
        <div className="mt-3 flex items-center gap-2">
          <AttachButton
            onFiles={(files) => void uploads.addFiles(files)}
            className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/3 text-zinc-300 hover:border-indigo-400/40 hover:text-white"
          />
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-zinc-300">
            <Icon name="chip" className="size-3.5" />
            <ActiveModel suffix=" · on this computer" />
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-zinc-300 sm:flex">
            <Icon name="lock" className="size-3.5" />
            Only you see this chat
          </span>
          {streaming ? (
            <button
              type="button"
              onClick={stop}
              aria-label="Stop the answer"
              className="ml-auto grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:bg-white/15"
            >
              <Icon name="stop" className="size-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send"
              className="ml-auto grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-linear-to-b from-indigo-500 to-violet-600 text-white shadow-[0_0_20px_-4px] shadow-indigo-500/80 transition hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 disabled:translate-y-0 disabled:cursor-default disabled:opacity-50"
            >
              <Icon name="arrowUp" className="size-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );

  return (
    <FileDropTarget
      onFiles={(files) => void uploads.addFiles(files)}
      label="Drop files to save them for your next Room"
      className="flex min-h-0 flex-1 flex-col"
    >
      {started ? (
        <>
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 pt-4">
            <button
              type="button"
              onClick={() => setViewingHome(true)}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/3 px-3.5 py-1.5 text-sm text-zinc-200 transition-colors hover:bg-white/8 hover:text-white"
            >
              <Icon name="arrowLeft" className="size-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                clear();
                setViewingHome(true);
              }}
              className="flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/6 hover:text-white"
            >
              <Icon name="plus" className="size-4" />
              New chat
            </button>
          </div>
          <div
            className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-5 py-6"
            aria-live="polite"
          >
            <ul className="space-y-4">
              {messages.map((m, i) => (
                <li
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "gap-3"}`}
                >
                  {m.role === "assistant" && (
                    <AppLogo size={32} className="rise-in mt-0.5" />
                  )}
                  <MessageBubble
                    message={m}
                    hostMessage={messages[i - 1]?.content}
                    onConfirmRoom={() => void confirmRoom(m.id)}
                    onCancelRoom={() => cancelRoom(m.id)}
                    onEditRoom={() => fillDraft("Change the ")}
                  />
                </li>
              ))}
            </ul>
            <div ref={endRef} />
          </div>
          <div className="mx-auto w-full max-w-3xl px-5 pb-6">{composer}</div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 py-8 sm:px-8">
          <div className="m-auto flex w-full max-w-205 flex-col items-center gap-8">
            <Hero />
            <div className="rise-in w-full" style={{ animationDelay: "220ms" }}>
              {composer}
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setViewingHome(false)}
                className="-mt-3 flex cursor-pointer items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-100 transition-colors hover:bg-indigo-500/20"
              >
                <Icon name="chat" className="size-4" />
                Back to your chat ({messages.filter((m) => m.role === "user").length})
              </button>
            )}
            <div className="flex flex-wrap justify-center gap-2.5">
              {suggestions.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => fillDraft(s)}
                  style={{ animationDelay: `${300 + i * 50}ms` }}
                  className="rise-in cursor-pointer rounded-full border border-white/10 bg-white/3 px-4 py-2 text-[13px] text-zinc-200 transition-colors hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex w-full flex-wrap justify-center gap-3">
              {quickActions.map((a, i) => (
                <Link
                  key={a.title}
                  href={a.href}
                  style={{ animationDelay: `${420 + i * 60}ms` }}
                  className="rise-in group relative flex w-full cursor-pointer flex-col items-start gap-3 sm:w-56 rounded-2xl border border-line bg-panel/80 p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-indigo-500/5 hover:shadow-[0_16px_40px_-20px] hover:shadow-indigo-500/60"
                >
                  <Icon
                    name="arrowUpRight"
                    className="absolute top-4 right-4 size-3.5 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  />
                  <span className="grid size-9 place-items-center rounded-lg border border-indigo-400/25 bg-indigo-500/10 text-indigo-300 transition-colors group-hover:bg-indigo-500/20 group-hover:text-indigo-200">
                    <Icon name={a.icon} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {a.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-zinc-400">
                      {a.body}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </FileDropTarget>
  );
}
