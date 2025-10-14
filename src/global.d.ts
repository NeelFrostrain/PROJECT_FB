export {};

// import { IpcRendererEvent } from "electron";

declare global {
  interface Window {
    electron: {
      sendTitleBarBTNMsg: (
        channel: string,
        data: "minimize" | "maximize" | "close"
      ) => void;
      send: (channel: string, data: unknown) => void;
    };
    // electronAPI: {
    //   // Listener for toggling the SearchBox from main
    //   onToggleSearchbox: (
    //     callback: (event: IpcRendererEvent, ...args: unknown[]) => void
    //   ) => void;

    //   // Listener for closing the SearchBox
    //   onCloseSearchbox: (
    //     callback: (event: IpcRendererEvent, ...args: unknown[]) => void
    //   ) => void;
    // };
  }
}
