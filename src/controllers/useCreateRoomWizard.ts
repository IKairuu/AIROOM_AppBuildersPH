"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { roomHref } from "@/lib/constants/routes";
import { ROOM_NAME_MAX, ROOM_PURPOSE_MAX, ROOM_RULES_MAX, type RoomPresetId } from "@/models/room/room-preset";
import { createRoom } from "@/services/api/knowledge-service";
import { useUploadStore } from "@/state/upload-store";

export const WIZARD_STEPS = ["Type", "Name and files", "Rules", "Review"] as const;

export type RoomDraft = {
  preset: RoomPresetId;
  name: string;
  purpose: string;
  // How the Room's chatbot behaves. Written by chatting in the Rules step, and editable.
  rules: string;
};

// The 3-step Create Room wizard. Prefilled values (from the assistant's card)
// skip straight to naming when a type is already chosen. The files are the
// host's pending uploads; creating the Room moves them into it.
export function useCreateRoomWizard(prefill: Partial<Pick<RoomDraft, "preset" | "name">>) {
  const router = useRouter();
  const [draft, setDraft] = useState<RoomDraft>({
    preset: prefill.preset ?? "general",
    name: (prefill.name ?? "").slice(0, ROOM_NAME_MAX),
    purpose: "",
    rules: "",
  });
  const [step, setStep] = useState(prefill.preset ? 1 : 0);
  const [nameError, setNameError] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const update = (patch: Partial<RoomDraft>) => {
    setDraft((d) => ({
      ...d,
      ...patch,
      name: (patch.name ?? d.name).slice(0, ROOM_NAME_MAX),
      purpose: (patch.purpose ?? d.purpose).slice(0, ROOM_PURPOSE_MAX),
      rules: (patch.rules ?? d.rules).slice(0, ROOM_RULES_MAX),
    }));
    if (patch.name?.trim()) setNameError(false);
  };

  const next = () => {
    if (step === 1 && !draft.name.trim()) {
      setNameError(true);
      return;
    }
    setStep((s) => Math.min(s + 1, WIZARD_STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const create = async () => {
    if (creating) return;
    setCreating(true);
    setCreateError(null);
    try {
      const fileIds = useUploadStore.getState().pending.map((f) => f.id);
      const room = await createRoom({ ...draft, name: draft.name.trim(), fileIds });
      useUploadStore.getState().clearPending();
      router.push(roomHref(room.id));
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Couldn’t create the Room. Try again.");
      setCreating(false);
    }
  };

  return { draft, step, nameError, creating, createError, update, next, back, create };
}
