import { create } from "zustand";

interface Store {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  currentURL: string;
  setCurrentURL: (value?: string) => void;
}

const useWebStore = create<Store>((set) => ({
  isLoading: false,
  setIsLoading: (value: boolean) => set(() => ({ isLoading: value })),

  currentURL: "",
  setCurrentURL: (value?: string) => set(() => ({ currentURL: value })),
}));

export default useWebStore;
