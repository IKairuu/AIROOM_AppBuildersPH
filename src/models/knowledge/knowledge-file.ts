// A file the host added, read into text so a Room's chatbot can answer from it.

export const KNOWLEDGE_FILE_TYPES = {
  pdf: { label: "PDF", mime: "application/pdf" },
  docx: { label: "Word", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  txt: { label: "Text", mime: "text/plain" },
  md: { label: "Markdown", mime: "text/markdown" },
} as const;

export type KnowledgeFileType = keyof typeof KNOWLEDGE_FILE_TYPES;

export const KNOWLEDGE_LIMITS = {
  maxFileBytes: 20 * 1024 * 1024,
  maxFilesPerRoom: 20,
} as const;

// What the browser can know about a file (no text, no vectors).
export type KnowledgeFile = {
  id: string;
  name: string;
  type: KnowledgeFileType;
  size: number;
  // Null for formats without pages (Word, text).
  pages: number | null;
  // How many searchable passages the file became.
  passages: number;
  uploadedAt: string;
};

// One searchable piece of a file, stored on the laptop only.
export type KnowledgeChunk = {
  fileId: string;
  fileName: string;
  page: number | null;
  text: string;
  vector: number[];
};

// Where an answer came from, shown as a chip under the answer.
export type Citation = {
  n: number;
  fileName: string;
  page: number | null;
};

export function fileTypeFromName(name: string): KnowledgeFileType | null {
  const ext = name.split(".").pop()?.toLowerCase();
  return ext && ext in KNOWLEDGE_FILE_TYPES ? (ext as KnowledgeFileType) : null;
}

/** Accept attribute for file inputs. */
export const KNOWLEDGE_ACCEPT = ".pdf,.docx,.txt,.md";
