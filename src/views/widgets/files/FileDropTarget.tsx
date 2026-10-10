"use client";

import { useRef, useState, type DragEvent, type ReactNode } from "react";
import Icon from "@/views/widgets/common/Icon";

type FileDropTargetProps = {
  onFiles: (files: File[]) => void;
  label?: string;
  className?: string;
  children: ReactNode;
};

const hasFiles = (e: DragEvent) => Array.from(e.dataTransfer.types).includes("Files");

// Wraps an area so files dropped anywhere on it are added. Shows an overlay while dragging.
export default function FileDropTarget({
  onFiles,
  label = "Drop files to add them",
  className = "",
  children,
}: FileDropTargetProps) {
  const [dragging, setDragging] = useState(false);
  // dragenter and dragleave fire for every child, so count them.
  const depth = useRef(0);

  return (
    <div
      className={`relative ${className}`}
      onDragEnter={(e) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        depth.current += 1;
        setDragging(true);
      }}
      onDragOver={(e) => {
        if (hasFiles(e)) e.preventDefault();
      }}
      onDragLeave={(e) => {
        if (!hasFiles(e)) return;
        depth.current = Math.max(0, depth.current - 1);
        if (depth.current === 0) setDragging(false);
      }}
      onDrop={(e) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        depth.current = 0;
        setDragging(false);
        onFiles(Array.from(e.dataTransfer.files));
      }}
    >
      {children}
      {dragging && (
        <div className="pointer-events-none absolute inset-2 z-30 grid place-items-center rounded-3xl border-2 border-dashed border-indigo-400/60 bg-[#0b0b18]/85 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <Icon name="upload" className="size-7 text-indigo-300" />
            <p className="text-sm font-medium text-white">{label}</p>
            <p className="text-xs text-zinc-400">PDF, Word, text or Markdown, up to 20 MB each</p>
          </div>
        </div>
      )}
    </div>
  );
}
