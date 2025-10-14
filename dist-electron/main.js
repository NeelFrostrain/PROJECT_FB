import { app as o, BrowserWindow as t, ipcMain as d, Tray as w, nativeImage as r } from "electron";
import { fileURLToPath as f } from "node:url";
import i from "path";
const a = i.dirname(f(import.meta.url));
process.env.APP_ROOT = i.join(a, "..");
const c = process.env.VITE_DEV_SERVER_URL, E = i.join(process.env.APP_ROOT, "dist-electron"), m = i.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = c ? i.join(process.env.APP_ROOT, "public") : m;
const u = process.platform === "win32", h = process.platform === "darwin", l = u ? i.join(a, "../release", "Icon.ico") : h ? i.join(process.env.VITE_PUBLIC, "Icon.icns") : i.join(process.env.VITE_PUBLIC, "Icon.png"), I = i.join(a, "../release", "Icon.ico");
let n;
function p() {
  n = new t({
    width: 1290,
    height: 850,
    frame: !1,
    titleBarStyle: "hidden",
    icon: l,
    backgroundColor: "#1c1c1c",
    webPreferences: {
      preload: i.join(a, "preload.mjs"),
      webviewTag: !0,
      nodeIntegration: !1,
      contextIsolation: !0,
      sandbox: !0
    }
  }), n.setMenu(null), n.webContents.session.clearCache(), new w(r.createFromPath(I)), n.setIcon(r.createFromPath(l)), n.webContents.on("did-finish-load", () => {
    n == null || n.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  }), c ? n.loadURL(c) : n.loadFile(i.join(m, "index.html"));
}
o.disableHardwareAcceleration();
o.commandLine.appendSwitch("disable-gpu");
o.commandLine.appendSwitch("disable-software-rasterizer");
o.on("window-all-closed", () => {
  process.platform !== "darwin" && (o.quit(), n = null);
});
o.on("activate", () => {
  t.getAllWindows().length === 0 && p();
});
o.whenReady().then(() => {
  p();
});
d.handle(
  "titlebar-btn-msg",
  (e, s) => {
    switch (s) {
      case "minimize":
        _();
        break;
      case "maximize":
        b();
        break;
      case "close":
        R();
        break;
    }
  }
);
d.on("update-title", (e, s) => {
  n && s && n.setTitle(s);
});
function _() {
  const e = t.getFocusedWindow();
  e && (e.isMinimized() || e.minimize());
}
function b() {
  const e = t.getFocusedWindow();
  e && (e.isMaximized() ? e.unmaximize() : e.maximize());
}
function R() {
  const e = t.getFocusedWindow();
  e && e.close();
}
export {
  E as MAIN_DIST,
  m as RENDERER_DIST,
  c as VITE_DEV_SERVER_URL
};
