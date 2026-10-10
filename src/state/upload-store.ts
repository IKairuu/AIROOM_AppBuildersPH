import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { KnowledgeFile } from "@/models/knowledge/knowledge-file";

// A file on its way to the laptop, or one that couldn't be added.
export type UploadAttempt = {
  key: string;
  name: string;
  error?: string;
};

type UploadState = {
  // Files saved on the laptop that go into the next Room the host creates.
  pending: KnowledgeFile[];
  attempts: UploadAttempt[];
  addPending: (file: KnowledgeFile) => void;
  removePending: (id: string) => void;
  clearPending: () => void;
  startAttempt: (attempt: UploadAttempt) => void;
  failAttempt: (key: string, error: string) => void;
  endAttempt: (key: string) => void;
};

// Only the file list is kept (in this tab's sessionStorage), so a refresh doesn't
// lose files already saved on the laptop. It holds names and sizes, never contents.
export const useUploadStore = create<UploadState>()(
  persist(
    (set) => ({
      pending: [],
      attempts: [],
      addPending: (file) => set((s) => ({ pending: [...s.pending.filter((f) => f.id !== file.id), file] })),
      removePending: (id) => set((s) => ({ pending: s.pending.filter((f) => f.id !== id) })),
      clearPending: () => set({ pending: [] }),
      startAttempt: (attempt) => set((s) => ({ attempts: [...s.attempts, attempt] })),
      failAttempt: (key, error) =>
        set((s) => ({ attempts: s.attempts.map((a) => (a.key === key ? { ...a, error } : a)) })),
      endAttempt: (key) => set((s) => ({ attempts: s.attempts.filter((a) => a.key !== key) })),
    }),
    {
      name: "airoom-pending-files",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ pending: s.pending }),
      // Read after the first render (see useFileUploads) so server and browser HTML match.
      skipHydration: true,
    },
  ),
);
