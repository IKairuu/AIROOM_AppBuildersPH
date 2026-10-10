import { create } from "zustand";
import type { QueueSnapshot } from "@/models/queue/queue";
import { fetchQueueSnapshot } from "@/services/api/live-service";

const POLL_MS = 2000;

type LiveState = {
  snapshot: QueueSnapshot | null;
  offline: boolean;
  refresh: () => Promise<void>;
  // Starts polling for one more viewer; returns a function that stops it for that viewer.
  watch: () => () => void;
};

let watchers = 0;
let timer: number | undefined;

// One shared poller for the host's live view (sessions, phones, queue), however
// many parts of the page show it. Polls every 2 seconds while the tab is visible.
export const useLiveStore = create<LiveState>((set, get) => ({
  snapshot: null,
  offline: false,
  refresh: async () => {
    try {
      set({ snapshot: await fetchQueueSnapshot(), offline: false });
    } catch {
      set({ offline: true });
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
