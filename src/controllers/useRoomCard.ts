"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { deleteRoom, renameRoom } from "@/services/api/knowledge-service";
import { setRoomSession } from "@/services/api/live-service";

type Mode = "menu" | "rename" | "delete" | null;

// The ⋯ menu on a Room card: rename, start or end the session, delete.
// Each action refreshes the Rooms page so every card shows the latest state.
export function useRoomCard(roomId: string, roomName: string) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);
  const [name, setName] = useState(roomName);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = useCallback(() => {
    setMode(null);
    setError(null);
    setName(roomName);
  }, [roomName]);

  const run = async (task: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    try {
      await task();
      setMode(null);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return {
    mode,
    name,
    busy,
    error,
    setName,
    toggleMenu: () => setMode((m) => (m === "menu" ? null : "menu")),
    close,
    askRename: () => setMode("rename"),
    askDelete: () => setMode("delete"),
    rename: () => run(() => renameRoom(roomId, name)),
    remove: () => run(() => deleteRoom(roomId)),
    startSession: () => run(() => setRoomSession(roomId, "start")),
    endSession: () => run(() => setRoomSession(roomId, "end")),
  };
}
