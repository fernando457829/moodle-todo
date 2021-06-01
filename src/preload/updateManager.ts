import { contextBridge, ipcRenderer } from 'electron';
import { UpdateChannels } from '../shared/channels';
import { UpdateEvents } from '../shared/events';

import { UpdateManagerApi } from '../shared/types/UpdateManagerApi';

contextBridge.exposeInMainWorld(
  'updateManager',
  {
    getVersion: async () => ipcRenderer.invoke(UpdateChannels.VERSION),

    checkForUpdate: () => ipcRenderer.invoke(UpdateChannels.CHECK_FOR_UPDATE),

    install: () => ipcRenderer.invoke(UpdateChannels.INSTALL),

    addStateChangeListener:
      (handler) => ipcRenderer.addListener(
        UpdateEvents.STATE_CHANGE,
        (_event, info) => handler(info),
      ),

    removeStateChangeListener:
      (handler) => ipcRenderer.removeListener(
        UpdateEvents.STATE_CHANGE,
        (_event, info) => handler(info),
      ),
  } as UpdateManagerApi,
);
