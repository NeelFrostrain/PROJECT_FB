import { create } from "zustand";

interface WebviewActions {
  goBack: () => void;
  goForward: () => void;
  reload: () => void;
  navigate: (url: string) => void;
}

interface Store {
  // ─── Loading State ──────────────────────────────
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  // ─── URL ─────────────────────────────────────────
  currentURL: string;
  setCurrentURL: (value: string) => void;

  // ─── Navigation Flags ────────────────────────────
  canGoForward: boolean;
  setCanGoForward: (value: boolean) => void;

  canGoBack: boolean;
  setCanGoBack: (value: boolean) => void;

  // ─── Webview Actions ─────────────────────────────
  webActions: WebviewActions;
  setWebActions: (actions: WebviewActions) => void;
}

const useWebStore = create<Store>((set) => ({
  // ─── Loading State ──────────────────────────────
  isLoading: false,
  setIsLoading: (value) => set(() => ({ isLoading: value })),

  // ─── URL ─────────────────────────────────────────
  currentURL: "",
  setCurrentURL: (value) => set(() => ({ currentURL: value })),

  // ─── Navigation Flags ────────────────────────────
  canGoForward: false,
  setCanGoForward: (value) => set(() => ({ canGoForward: value })),

  canGoBack: false,
  setCanGoBack: (value) => set(() => ({ canGoBack: value })),

  // ─── Webview Actions ─────────────────────────────
  webActions: {
    goBack: () => {},
    goForward: () => {},
    reload: () => {},
    navigate: () => {},
  },
  setWebActions: (actions) => set(() => ({ webActions: actions })),
}));

export default useWebStore;
