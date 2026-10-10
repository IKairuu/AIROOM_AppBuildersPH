// Server-only: files the host uploaded that don't belong to a Room yet.
// data/uploads/<id>/ holds the original file, meta.json and chunks.json.
import { mkdir, rm, writeFile } from "node:fs/promises";
import {
  fileTypeFromName,
  KNOWLEDGE_FILE_TYPES,
  KNOWLEDGE_LIMITS,
  type KnowledgeChunk,
  type KnowledgeFile,
} from "@/models/knowledge/knowledge-file";
import { embedPassages } from "@/services/ollama/embed-service";
import { dataPath, isSafeId, newId, readJson, writeJson } from "@/services/storage/data-store";
import { chunkSegments } from "./chunk-text";
import { extractFileText } from "./extract-text";

/** A problem the host can fix; its message is safe to show. */
export class KnowledgeError extends Error {}

const uploadDir = (id: string) => dataPath("uploads", id);

const supported = Object.values(KNOWLEDGE_FILE_TYPES)
  .map((t) => t.label)
  .join(", ");

export async function saveUpload(file: File): Promise<KnowledgeFile> {
  const type = fileTypeFromName(file.name);
  if (!type) throw new KnowledgeError(`“${file.name}” can’t be read. Use ${supported} (.pdf, .docx, .txt, .md).`);
  if (file.size === 0) throw new KnowledgeError(`“${file.name}” is empty.`);
  if (file.size > KNOWLEDGE_LIMITS.maxFileBytes) {
    throw new KnowledgeError(`“${file.name}” is over ${KNOWLEDGE_LIMITS.maxFileBytes / 1024 / 1024} MB.`);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let extracted;
  try {
    extracted = await extractFileText(buffer, type);
  } catch {
    throw new KnowledgeError(`“${file.name}” couldn’t be opened. It may be damaged or password-protected.`);
  }
  const pieces = chunkSegments(extracted.segments);
  if (pieces.length === 0) {
    throw new KnowledgeError(`No text found in “${file.name}”. Scanned pages and images can’t be read yet.`);
  }

  let vectors: number[][];
  try {
    vectors = await embedPassages(pieces.map((p) => p.text));
  } catch {
    throw new KnowledgeError("Couldn’t index the file. Check that Ollama is running and nomic-embed-text is installed.");
  }

  const id = newId();
  const name = file.name.slice(0, 200);
  const meta: KnowledgeFile = {
    id,
    name,
    type,
    size: file.size,
    pages: extracted.pages,
    passages: pieces.length,
    uploadedAt: new Date().toISOString(),
  };
  const chunks: KnowledgeChunk[] = pieces.map((p, i) => ({
    fileId: id,
    fileName: name,
    page: p.page,
    text: p.text,
    vector: vectors[i],
  }));

  await mkdir(uploadDir(id), { recursive: true });
  await writeFile(dataPath("uploads", id, `original.${type}`), buffer);
  await writeJson(dataPath("uploads", id, "chunks.json"), chunks);
  await writeJson(dataPath("uploads", id, "meta.json"), meta);
  return meta;
}

export async function getUpload(id: string): Promise<KnowledgeFile | null> {
  return isSafeId(id) ? readJson<KnowledgeFile>(dataPath("uploads", id, "meta.json")) : null;
}

export async function deleteUpload(id: string): Promise<void> {
  if (isSafeId(id)) await rm(uploadDir(id), { recursive: true, force: true });
}

export { uploadDir };
