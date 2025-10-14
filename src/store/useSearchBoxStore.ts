import { create } from "zustand";

interface Store {
  // ─── Open State ──────────────────────────────
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const useSearchBoxStore = create<Store>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set(() => ({ isOpen: value })),
}));

export default useSearchBoxStore;
