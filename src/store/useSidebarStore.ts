import { create } from "zustand";

interface Store {
  // ─── Open State ──────────────────────────────
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const useSidebarStore = create<Store>((set) => ({
  // ─── Loading State ──────────────────────────────
  isOpen: true,
  setIsOpen: (value) => set(() => ({ isOpen: value })),
}));

export default useSidebarStore;
