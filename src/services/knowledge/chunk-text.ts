import type { TextSegment } from "./extract-text";

// About a paragraph or two: small enough to match a question, big enough to answer it.
const CHUNK_CHARS = 1000;
const OVERLAP_CHARS = 150;

const clean = (text: string) =>
  text
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

// Splits each page (or the whole file) into overlapping passages, breaking at
// paragraph, then sentence, then word boundaries. Passages never cross pages,
// so every one can cite its page.
export function chunkSegments(segments: TextSegment[]): TextSegment[] {
  const chunks: TextSegment[] = [];
  for (const { page, text } of segments) {
    const body = clean(text);
    let start = 0;
    while (start < body.length) {
      let end = Math.min(start + CHUNK_CHARS, body.length);
      if (end < body.length) {
        const window = body.slice(start, end);
        const breakAt = Math.max(window.lastIndexOf("\n\n"), window.lastIndexOf(". "), window.lastIndexOf(" "));
        if (breakAt > CHUNK_CHARS / 2) end = start + breakAt + 1;
      }
      const piece = body.slice(start, end).trim();
      if (piece.length > 20) chunks.push({ page, text: piece });
      if (end >= body.length) break;
      start = Math.max(end - OVERLAP_CHARS, start + 1);
    }
  }
  return chunks;
}
