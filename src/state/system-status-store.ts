import { create } from "zustand";
import type { SystemStatus } from "@/models/system/status";

const POLL_MS = 5000;

type StatusState = {
  status: SystemStatus | null;
  refresh: () => Promise<void>;
  // Starts polling for one more viewer; returns a function that stops it for that viewer.
  watch: () => () => void;
};

let watchers = 0;
let timer: number | undefined;

// The top bar's live status, polled every 5 seconds while the tab is visible.
export const useSystemStatusStore = create<StatusState>((set, get) => ({
  status: null,
  refresh: async () => {
    try {
      const res = await fetch("/api/system/status", { cache: "no-store" });
      if (res.ok) set({ status: (await res.json()) as SystemStatus });
    } catch {
      // Keep the last reading; the next poll tries again.
    }
  },
  watch: () => {
    watchers += 1;
    if (watchers === 1) {
      const tick = () => {
        if (document.visibilityState === "visible") void get().refresh();
      };
      // Load once right away, then keep polling only while the tab is visible.
      void get().refresh();
      timer = window.setInterval(tick, POLL_MS);
    }
    return () => {
      watchers -= 1;
      if (watchers === 0) window.clearInterval(timer);
    };
  },
}));
