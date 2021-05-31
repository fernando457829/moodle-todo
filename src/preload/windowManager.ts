import { contextBridge, ipcRenderer } from 'electron';

import { WindowChannels } from '../shared/channels';
import { WindowEvents } from '../shared/events';
import { WindowManagerApi } from '../shared/types/WindowManagerApi';

contextBridge.exposeInMainWorld(
  'windowManager',
  {
    addMaximizeListener: (handler) => ipcRenderer.addListener(WindowEvents.MAXIMIZE, handler),
    removeMaximizeListener: (handler) => ipcRenderer.removeListener(WindowEvents.MAXIMIZE, handler),

    addUnmaximizeListener: (handler) => ipcRenderer.addListener(WindowEvents.UNMAXIMIZE, handler),
    removeUnmaximizeListener:
      (handler) => ipcRenderer.addListener(WindowEvents.UNMAXIMIZE, handler),

    isMaximized: () => ipcRenderer.invoke(WindowChannels.IS_MAXIMIZED),
    minimize: () => ipcRenderer.invoke(WindowChannels.MINIMIZE),
    restore: () => ipcRenderer.invoke(WindowChannels.RESTORE),
    maximize: () => ipcRenderer.invoke(WindowChannels.MAXIMIZE),
    close: () => ipcRenderer.invoke(WindowChannels.CLOSE),
  } as WindowManagerApi,
);
