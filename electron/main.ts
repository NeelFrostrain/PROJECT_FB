import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let window: BrowserWindow | null;

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
      sandbox: true,
    },
  });

  window.setMenu(null);

  window.webContents.on("did-finish-load", () => {
    window?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
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
    Tick();
  }, 1000); // 1s
});

function Tick() {
  // console.log(window?.getBounds());
}

ipcMain.handle(
  "titlebar-btn-msg",
  (_, btnName: "minimize" | "maximize" | "close") => {
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
