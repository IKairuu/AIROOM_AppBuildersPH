"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROOMS_HREF } from "@/lib/constants/routes";
import { deleteRoom } from "@/services/api/knowledge-service";

// Deleting asks once more before it happens, since a Room's files go with it.
export function useDeleteRoom(roomId: string) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    setDeleting(true);
    setError(null);
    try {
      await deleteRoom(roomId);
      router.push(ROOMS_HREF);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn’t delete the Room.");
      setDeleting(false);
    }
  };

  return { confirming, deleting, error, ask: () => setConfirming(true), cancel: () => setConfirming(false), remove };
}
