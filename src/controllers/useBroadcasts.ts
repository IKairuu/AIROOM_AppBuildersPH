"use client";

import { useState } from "react";
import { BROADCAST_TEXT_MAX, type Broadcast, type BroadcastKind } from "@/models/broadcast/broadcast";
import { deleteBroadcast, sendBroadcast } from "@/services/api/broadcast-service";

// The host's Broadcast page: write a message, pick its type and who gets it, send.
// Sent messages are listed newest first and can be taken back.
export function useBroadcasts(initial: Broadcast[]) {
  const [sent, setSent] = useState<Broadcast[]>(() => [...initial].reverse());
  const [kind, setKind] = useState<BroadcastKind>("announcement");
  const [target, setTarget] = useState("all");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    setError(null);
    try {
      const broadcast = await sendBroadcast({ kind, text: text.trim(), target });
      setSent((s) => [broadcast, ...s]);
      setText("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn’t send it.");
    } finally {
      setSending(false);
    }
  };

  const remove = async (id: string) => {
    const before = sent;
    setSent((s) => s.filter((b) => b.id !== id));
    try {
      await deleteBroadcast(id);
    } catch (e) {
      setSent(before);
      setError(e instanceof Error ? e.message : "Couldn’t remove it.");
    }
  };

  return {
    sent,
    kind,
    setKind,
    target,
    setTarget,
    text,
    setText: (value: string) => setText(value.slice(0, BROADCAST_TEXT_MAX)),
    sending,
    error,
    send,
    remove,
  };
}
