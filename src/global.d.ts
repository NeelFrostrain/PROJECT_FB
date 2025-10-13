export {};

declare global {
  interface Window {
    electron: {
      sendTitleBarBTNMsg: (
        channel: string,
        data: "minimize" | "maximize" | "close"
      ) => void;
    };
  }
}
