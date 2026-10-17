"use client";

import { useState } from "react";
import { REPO_URL } from "@/lib/constants/features";
import Icon from "./Icon";

// Shown on the hosted demo: the website has no Ollama, so the AI only answers
// when AIROOM runs on a laptop.
export default function DemoBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-3 z-[60] flex justify-center px-4">
      <div className="flex max-w-xl items-center gap-3 rounded-full border border-white/10 bg-[#080917]/90 py-2 pr-2 pl-4 text-sm text-[#a3a7c2] shadow-lg shadow-black/40 backdrop-blur-md">
        <p>
          <span className="font-semibold text-white">Live demo.</span> The AI runs offline on your own laptop.{" "}
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2 hover:text-white">
            Install AIROOM
          </a>{" "}
          to use it.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Hide demo notice"
          className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <Icon name="x" className="size-4" />
        </button>
      </div>
    </div>
  );
}
