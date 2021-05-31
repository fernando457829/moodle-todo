import { BrowserWindow, shell } from 'electron';
import path from 'path';

import { isDevelopment } from './utils/env';
import getAsset from './utils/getAsset';

class Window {
  private instance: BrowserWindow | null = null;

  private readyListeners: Function[] = [];

  isMaximized = () => this.instance?.isMaximized();

  minimize = () => this.instance?.minimize();

  restore = () => this.instance?.restore();

  maximize = () => this.instance?.isMaximizable() && this.instance?.maximize();

  close = () => this.instance?.close();

  send = (channel: string, ...args: any[]) => this.instance?.webContents.send(channel, ...args);

  on(event: any, listener: (...args: any) => void) {
    if (event === 'ready') this.readyListeners.push(listener);
    else this.instance?.on(event, listener);
  }

  create() {
    this.instance = new BrowserWindow({
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

    this.instance.loadURL(
      isDevelopment
        ? `http://localhost:${process.env.PORT || 1212}/index.html`
        : `file://${path.resolve(__dirname, 'index.html')}`,
    );

    this.instance.setMenu(null);

    this.instance.on('ready-to-show', () => {
      if (process.env.START_MINIMIZED) {
        this.instance?.minimize();
      } else {
        this.instance?.show();
        this.instance?.focus();
      }
    });

    this.instance.on('closed', () => {
      this.instance = null;
    });

    this.instance.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);

      return {
        action: 'deny',
      };
    });

    this.readyListeners.forEach((listener) => listener());
  }
}

export default new Window();
