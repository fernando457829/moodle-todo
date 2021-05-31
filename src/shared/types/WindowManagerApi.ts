export type WindowManagerApi = {
  isMaximized(): Promise<boolean>;

  minimize(): Promise<void>;
  restore(): Promise<void>;
  maximize(): Promise<void>;
  close(): Promise<void>;

  addMaximizeListener(handler: () => void): void;
  removeMaximizeListener(handler: () => void): void;

  addUnmaximizeListener(handler: () => void): void;
  removeUnmaximizeListener(handler: () => void): void;
};
