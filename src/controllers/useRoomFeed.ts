"use client";

import { useEffect, useRef, useState } from "react";
import { phoneId } from "@/lib/utils/phone-id";
import type { Broadcast } from "@/models/broadcast/broadcast";
import type { RoomFeedEvent } from "@/models/room/room-feed";
import type { RoomSession } from "@/models/room/room-session";
import { openRoomFeed } from "@/services/api/broadcast-service";

// A broadcast and when this phone got it, to place it among the chat messages.
export type ReceivedBroadcast = { broadcast: Broadcast; at: number };

// The phone's live link to its Room: the session (can people ask now?), this
// phone's anonymous label, and the host's broadcasts. Ones sent before the
// phone opened the chat come first; new ones appear where they arrive.
// Urgent ones buzz the phone. When the session ends, onEnded runs.
// With enabled false (the phone left the Room), the feed is closed and the phone drops off the host's list.
export function useRoomFeed(roomId: string, onEnded: () => void, enabled = true) {
  const [items, setItems] = useState<ReceivedBroadcast[]>([]);
  const [session, setSession] = useState<RoomSession | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const endedRef = useRef(onEnded);
  useEffect(() => {
    endedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    if (!enabled) return;
    const feed = openRoomFeed(roomId, phoneId());
    let wasLive = false;
    feed.onmessage = (e: MessageEvent<string>) => {
      let event: RoomFeedEvent;
      try {
        event = JSON.parse(e.data) as RoomFeedEvent;
      } catch {
        return;
      }
      switch (event.type) {
        case "hello":
        case "session":
          if (event.type === "hello") setLabel(event.label);
          if (wasLive && event.session.state !== "live") endedRef.current();
          wasLive = event.session.state === "live";
          setSession(event.session);
          break;
        case "snapshot":
          // Also arrives after a reconnect: keep the place of ones already shown.
          setItems((current) =>
            event.broadcasts.map((broadcast, i) => ({
              broadcast,
              at: current.find((c) => c.broadcast.id === broadcast.id)?.at ?? (current.length ? Date.now() : i),
            })),
          );
          break;
        case "add": {
          const { broadcast } = event;
          setItems((current) =>
            current.some((c) => c.broadcast.id === broadcast.id) ? current : [...current, { broadcast, at: Date.now() }],
          );
          if (broadcast.kind === "urgent") navigator.vibrate?.([250, 120, 250]);
          break;
        }
        case "remove":
          setItems((current) => current.filter((c) => c.broadcast.id !== event.id));
          break;
      }
    };
    return () => feed.close();
  }, [roomId, enabled]);

  return {
    session,
    label,
    pinned: items.filter((i) => i.broadcast.kind === "pinned").map((i) => i.broadcast),
    feed: items.filter((i) => i.broadcast.kind !== "pinned"),
  };
}
