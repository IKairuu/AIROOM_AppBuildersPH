// Server-only: turns an uploaded file into plain text, page by page where the format has pages.
import mammoth from "mammoth";
import { extractText, getDocumentProxy } from "unpdf";
import type { KnowledgeFileType } from "@/models/knowledge/knowledge-file";

export type TextSegment = { page: number | null; text: string };

export type ExtractedText = {
  pages: number | null;
  segments: TextSegment[];
};

export async function extractFileText(buffer: Buffer, type: KnowledgeFileType): Promise<ExtractedText> {
  switch (type) {
    case "pdf": {
      const pdf = await getDocumentProxy(new Uint8Array(buffer));
      const { totalPages, text } = await extractText(pdf, { mergePages: false });
      return { pages: totalPages, segments: text.map((t, i) => ({ page: i + 1, text: t })) };
    }
    case "docx": {
      const { value } = await mammoth.extractRawText({ buffer });
      return { pages: null, segments: [{ page: null, text: value }] };
    }
    case "txt":
    case "md":
      return { pages: null, segments: [{ page: null, text: buffer.toString("utf8") }] };
  }
}
