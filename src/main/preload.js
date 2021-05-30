const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'electron',
  {
    test: () => ipcRenderer.invoke('window-minimize'),
  },
);
