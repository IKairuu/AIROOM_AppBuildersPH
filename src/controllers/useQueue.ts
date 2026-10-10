"use client";

import { useEffect, useState } from "react";
import { setRoomSession, skipQuestion } from "@/services/api/live-service";
import { useLiveStore } from "@/state/live-store";

// The host's live view of the room (sessions, phones, queue), shared by every
// part of the page and refreshed every 2 seconds while the tab is visible.
export function useQueueSnapshot() {
  const snapshot = useLiveStore((s) => s.snapshot);
  const offline = useLiveStore((s) => s.offline);
  const refresh = useLiveStore((s) => s.refresh);
  const watch = useLiveStore((s) => s.watch);

  useEffect(() => watch(), [watch]);

  const skip = async (id: string) => {
    await skipQuestion(id);
    await refresh();
  };

  return { snapshot, offline, refresh, skip };
}

// Start or end one Room's session from the Room page or the Queue page.
export function useRoomSessionControl(onChange?: () => void) {
  const [busyRoom, setBusyRoom] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const change = async (roomId: string, action: "start" | "end") => {
    setBusyRoom(roomId);
    setError(null);
    try {
      await setRoomSession(roomId, action);
      onChange?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn’t change the session.");
    } finally {
      setBusyRoom(null);
    }
  };

  return { busyRoom, error, start: (id: string) => change(id, "start"), end: (id: string) => change(id, "end") };
}
