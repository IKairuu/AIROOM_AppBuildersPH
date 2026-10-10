import { create } from "zustand";

type LaunchState = {
  dialogOpen: boolean;
  // Set when the host arrives on the dashboard straight from a successful launch.
  justLaunched: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  markLaunched: () => void;
  clearJustLaunched: () => void;
};

export const useLaunchStore = create<LaunchState>((set) => ({
  dialogOpen: false,
  justLaunched: false,
  openDialog: () => set({ dialogOpen: true }),
  closeDialog: () => set({ dialogOpen: false }),
  markLaunched: () => set({ dialogOpen: false, justLaunched: true }),
  clearJustLaunched: () => set({ justLaunched: false }),
}));
