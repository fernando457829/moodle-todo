import { BrowserWindow, shell } from 'electron';
import path from 'path';

import { isDevelopment } from './utils/env';
import getAsset from './utils/getAsset';

let window: BrowserWindow | null = null;

export default window;

export async function create() {
  window = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAsset('icon.png'),
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: isDevelopment
        ? path.join(__dirname, '../preload/preload.js')
        : path.join(__dirname, 'preload.js'),
    },
  });

  window.loadURL(
    isDevelopment
      ? `http://localhost:${process.env.PORT || 1212}/index.html`
      : `file://${path.resolve(__dirname, 'index.html')}`,
  );

  window.setMenu(null);

  window.on('ready-to-show', () => {
    if (process.env.START_MINIMIZED) {
      window?.minimize();
    } else {
      window?.show();
      window?.focus();
    }
  });

  window.on('closed', () => {
    window = null;
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);

    return {
      action: 'deny',
    };
  });
}
