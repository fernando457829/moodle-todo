import { WindowManagerApi } from '../../shared/types/WindowManagerApi';

declare global {
  interface Window {
    windowManager: WindowManagerApi;
  }
}

export {};
