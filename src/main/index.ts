import 'core-js/stable';
import 'regenerator-runtime/runtime';

import path from 'path';
import {
  app,
  BrowserWindow,
  ipcMain,
  shell,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development'
  || process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development'
    || process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => path.join(RESOURCES_PATH, ...paths);

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: process.env.NODE_ENV === 'production'
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../preload/preload.js'),
    },
  });

  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${process.env.PORT || 1212}/index.html`
      : `file://${path.resolve(__dirname, 'index.html')}`,
  );

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('maximize', () => mainWindow!.webContents.send('maximize'));
  mainWindow.on('unmaximize', () => mainWindow!.webContents.send('unmaximize'));

  mainWindow.setMenuBarVisibility(false);

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // eslint-disable-next-line no-new
  new AppUpdater();
};

ipcMain.handle('window-is-maximized', async () => mainWindow!.isMaximized());

ipcMain.handle('window-minimize', () => mainWindow!.minimize());

ipcMain.handle('window-maximize', () => {
  if (mainWindow!.isMaximized()) mainWindow!.restore();
  else if (mainWindow!.isMaximizable()) mainWindow!.maximize();
});

ipcMain.handle('window-close', () => mainWindow!.close());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
