import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld(
  'electron',
  {
    test: () => ipcRenderer.invoke('window-minimize'),
  },
);
