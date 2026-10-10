import type { KnowledgeFile } from "@/models/knowledge/knowledge-file";
import type { UploadAttempt } from "@/state/upload-store";
import Icon from "@/views/widgets/common/Icon";
import Spinner from "@/views/widgets/common/Spinner";

type FileChipsProps = {
  files: KnowledgeFile[];
  attempts: UploadAttempt[];
  onRemove: (id: string) => void;
  onDismiss: (key: string) => void;
};

function detail(file: KnowledgeFile) {
  const size = file.size >= 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(file.size / 1024)} KB`;
  return file.pages ? `${file.pages} page${file.pages === 1 ? "" : "s"} · ${size}` : size;
}

// Saved files, files still uploading, and files that couldn't be added.
export default function FileChips({ files, attempts, onRemove, onDismiss }: FileChipsProps) {
  if (files.length === 0 && attempts.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2" aria-live="polite">
      {files.map((f) => (
        <li
          key={f.id}
          className="flex max-w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 py-1.5 pr-1.5 pl-2.5 text-xs"
        >
          <Icon name="file" className="size-4 shrink-0 text-indigo-300" />
          <span className="min-w-0">
            <span className="block max-w-48 truncate font-medium text-white">{f.name}</span>
            <span className="block text-[11px] text-zinc-500">{detail(f)}</span>
          </span>
          <button
            type="button"
            onClick={() => onRemove(f.id)}
            aria-label={`Remove ${f.name}`}
            className="grid size-6 cursor-pointer place-items-center rounded-lg text-zinc-400 hover:bg-white/8 hover:text-white"
          >
            <Icon name="x" className="size-3.5" />
          </button>
        </li>
      ))}
      {attempts.map((a) =>
        a.error ? (
          <li
            key={a.key}
            role="alert"
            className="flex max-w-full items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-400/8 py-1.5 pr-1.5 pl-2.5 text-xs text-rose-200"
          >
            <Icon name="alert" className="size-4 shrink-0" />
            <span className="min-w-0">{a.error}</span>
            <button
              type="button"
              onClick={() => onDismiss(a.key)}
              aria-label="Dismiss"
              className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-lg hover:bg-white/8"
            >
              <Icon name="x" className="size-3.5" />
            </button>
          </li>
        ) : (
          <li
            key={a.key}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-2.5 py-2 text-xs text-zinc-300"
          >
            <Spinner className="size-3.5" />
            Reading {a.name}…
          </li>
        ),
      )}
    </ul>
  );
}
