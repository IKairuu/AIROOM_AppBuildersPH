"use client";

import { useCallback, useEffect } from "react";
import { clientId } from "@/lib/utils/client-id";
import { fileTypeFromName, KNOWLEDGE_LIMITS } from "@/models/knowledge/knowledge-file";
import { deleteKnowledgeFile, uploadKnowledgeFile } from "@/services/api/knowledge-service";
import { useUploadStore } from "@/state/upload-store";

// Quick checks before sending, so the host hears about a wrong file at once.
// The server checks again; these are only for speed.
function precheck(file: File, alreadyPending: number): string | null {
  if (!fileTypeFromName(file.name)) return `“${file.name}” can’t be read. Use PDF, Word, text or Markdown files.`;
  if (file.size > KNOWLEDGE_LIMITS.maxFileBytes) {
    return `“${file.name}” is over ${KNOWLEDGE_LIMITS.maxFileBytes / 1024 / 1024} MB.`;
  }
  if (alreadyPending >= KNOWLEDGE_LIMITS.maxFilesPerRoom) {
    return `A Room can have up to ${KNOWLEDGE_LIMITS.maxFilesPerRoom} files.`;
  }
  return null;
}

// Adds files for the next Room: uploads each one (the laptop reads and indexes it)
// and keeps the list in the upload store.
export function useFileUploads() {
  const pending = useUploadStore((s) => s.pending);
  const attempts = useUploadStore((s) => s.attempts);

  useEffect(() => {
    void useUploadStore.persist.rehydrate();
  }, []);

  const addFiles = useCallback(async (files: Iterable<File>) => {
    for (const file of files) {
      const store = useUploadStore.getState();
      const key = clientId();
      store.startAttempt({ key, name: file.name });
      const problem = precheck(file, store.pending.length);
      if (problem) {
        store.failAttempt(key, problem);
        continue;
      }
      try {
        const saved = await uploadKnowledgeFile(file);
        useUploadStore.getState().addPending(saved);
        useUploadStore.getState().endAttempt(key);
      } catch (error) {
        useUploadStore
          .getState()
          .failAttempt(key, error instanceof Error ? error.message : `Couldn’t upload “${file.name}”.`);
      }
    }
  }, []);

  const removeFile = useCallback(async (id: string) => {
    useUploadStore.getState().removePending(id);
    await deleteKnowledgeFile(id).catch(() => undefined);
  }, []);

  const dismissError = useCallback((key: string) => useUploadStore.getState().endAttempt(key), []);

  const uploading = attempts.some((a) => !a.error);
  return { pending, attempts, uploading, addFiles, removeFile, dismissError };
}
