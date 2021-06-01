import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

import window from '../window';
import { UpdateChannels } from '../../shared/channels';
import { UpdateEvents } from '../../shared/events';
import { isDevelopment } from '../utils/env';

ipcMain.handle(
  UpdateChannels.VERSION,
  isDevelopment
    ? async () => `Development build - Electron: ${autoUpdater.currentVersion.version}`
    : async () => autoUpdater.currentVersion.version,
);

ipcMain.handle(UpdateChannels.CHECK_FOR_UPDATE, () => autoUpdater.checkForUpdates());

ipcMain.handle(UpdateChannels.INSTALL, () => autoUpdater.quitAndInstall());

autoUpdater.on(
  'checking-for-update',
  () => window.send(UpdateEvents.STATE_CHANGE, { type: 'checking-for-update' }),
);

autoUpdater.on(
  'download-progress',
  ({ percent }) => window.send(UpdateEvents.STATE_CHANGE, { type: 'download', percent }),
);

autoUpdater.on(
  'update-not-available',
  () => window.send(UpdateEvents.STATE_CHANGE, { type: 'up-to-date' }),
);

autoUpdater.on(
  'update-downloaded',
  () => window.send(UpdateEvents.STATE_CHANGE, { type: 'ready-to-update' }),
);
