import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import window from './window';
import { debugProduction, isDevelopment } from './utils/env';
import installExtensions from './utils/installExtensions';

import './apis/windowManager';
import './apis/updateManager';

if (!isDevelopment) require('source-map-support').install();

if (isDevelopment || debugProduction) require('electron-debug')();

async function start() {
  if (isDevelopment || debugProduction) await installExtensions();

  window.create();

  log.transports.file.level = 'info';

  autoUpdater.logger = log;

  // TODO: Disable pre releases when publish stable version
  autoUpdater.allowPrerelease = true;

  autoUpdater.checkForUpdates();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(start).catch(console.log);

app.on('activate', () => {
  if (window === null) start();
});
