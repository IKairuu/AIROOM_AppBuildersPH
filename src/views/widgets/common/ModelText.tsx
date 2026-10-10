import { Fragment } from "react";

// Renders the little Markdown small models like to use (**bold**, `code`, bullets)
// without a Markdown library. Everything else shows as plain text.
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={i} className="rounded bg-white/8 px-1 font-mono text-[0.9em]">{part.slice(1, -1)}</code>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function ModelText({ text }: { text: string }) {
  return (
    <div className="space-y-1.5 break-words">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return null;
        const heading = line.match(/^#{1,6}\s+(.*)/);
        if (heading) return <p key={i} className="pt-1 font-semibold text-white">{inline(heading[1])}</p>;
        const bullet = line.match(/^\s*[-*•]\s+(.*)/);
        if (bullet) {
          return (
            <p key={i} className="flex gap-2 pl-1">
              <span aria-hidden className="text-accent">•</span>
              <span>{inline(bullet[1])}</span>
            </p>
          );
        }
        return <p key={i}>{inline(line)}</p>;
      })}
    </div>
  );
}
