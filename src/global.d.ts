export {};

declare global {
  interface Window {
    electron: {
      sendWebInfo: (channel: string, data: unknown) => void;
    };
  }
}
