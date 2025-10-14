import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let window;
function createWindow() {
  window = new BrowserWindow({
    width: 1290,
    height: 850,
    frame: false,
    titleBarStyle: "hidden",
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    backgroundColor: "#1c1c1c",
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      webviewTag: true,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });
  window.setMenu(null);
  window.webContents.on("did-finish-load", () => {
    window == null ? void 0 : window.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  });
  if (VITE_DEV_SERVER_URL) {
    window.loadURL(VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    window = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  createWindow();
  setInterval(() => {
  }, 1e3);
});
ipcMain.handle(
  "titlebar-btn-msg",
  (_, btnName) => {
    switch (btnName) {
      case "minimize":
        handleMinimize();
        break;
      case "maximize":
        handleMaximize();
        break;
      case "close":
        handleClose();
        break;
    }
  }
);
function handleMinimize() {
  const w = BrowserWindow.getFocusedWindow();
  if (!w) return;
  if (!w.isMinimized()) {
    w.minimize();
  }
}
function handleMaximize() {
  const w = BrowserWindow.getFocusedWindow();
  if (!w) return;
  if (!w.isMaximized()) {
    w.maximize();
  } else {
    w.unmaximize();
  }
}
function handleClose() {
  const w = BrowserWindow.getFocusedWindow();
  if (!w) return;
  w.close();
}
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
