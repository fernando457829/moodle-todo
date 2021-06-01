import { WindowManagerApi } from '../../shared/types/WindowManagerApi';
import { UpdateManagerApi } from '../../shared/types/UpdateManagerApi';

declare global {
  interface Window {
    windowManager: WindowManagerApi;
    updateManager: UpdateManagerApi;
  }
}

export {};
