import { ipcMain } from 'electron';

import { WindowChannels } from '../../shared/channels';
import { WindowEvents } from '../../shared/events';
import window from '../window';

ipcMain.handle(WindowChannels.IS_MAXIMIZED, async () => window?.isMaximized());

ipcMain.handle(WindowChannels.MINIMIZE, () => window?.minimize());

ipcMain.handle(WindowChannels.RESTORE, () => window?.restore());

ipcMain.handle(WindowChannels.MAXIMIZE, () => window?.isMaximizable() && window?.maximize());

ipcMain.handle(WindowChannels.CLOSE, () => window?.close());

window?.on('maximize', () => window?.webContents.send(WindowEvents.MAXIMIZE));

window?.on('unmaximize', () => window?.webContents.send(WindowEvents.UNMAXIMIZE));
