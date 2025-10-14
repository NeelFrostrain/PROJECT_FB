import { app, BrowserWindow, ipcMain, nativeImage, Tray } from "electron";
import { fileURLToPath } from "node:url";
import path from "path";

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

const isWin = process.platform === "win32";
const isMac = process.platform === "darwin";

const windowIcon = isWin
  ? path.join(__dirname, "../release", "Icon.ico")
  : isMac
  ? path.join(process.env.VITE_PUBLIC, "Icon.icns")
  : path.join(process.env.VITE_PUBLIC, "Icon.png");

// Tray icon (PNG recommended)
const trayIcon = path.join(__dirname, "../release", "Icon.ico");

let window: BrowserWindow | null;

function createWindow() {
  window = new BrowserWindow({
    width: 1290,
    height: 850,
    frame: false,
    titleBarStyle: "hidden",
    icon: windowIcon,
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
  window.webContents.session.clearCache();
  new Tray(nativeImage.createFromPath(trayIcon));
  window.setIcon(nativeImage.createFromPath(windowIcon));

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

// Disable GPU
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-software-rasterizer");

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
  // new Tray(windowIcon);
});

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

ipcMain.on("update-title", (_event, title: string) => {
  if (window && title) {
    window.setTitle(title);
  }
});

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
