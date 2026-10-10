"use client";

import { useRef } from "react";
import { KNOWLEDGE_ACCEPT } from "@/models/knowledge/knowledge-file";
import Icon from "@/views/widgets/common/Icon";

type AttachButtonProps = {
  onFiles: (files: File[]) => void;
  label?: string;
  className?: string;
};

// Opens the file picker for Room files.
export default function AttachButton({ onFiles, label, className = "" }: AttachButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label={label ?? "Add files"}
        title="Add files (PDF, Word, text)"
        className={`flex cursor-pointer items-center gap-1.5 transition-colors ${className}`}
      >
        <Icon name="paperclip" className="size-4" />
        {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={KNOWLEDGE_ACCEPT}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(Array.from(e.target.files));
          e.target.value = "";
        }}
      />
    </>
  );
}
