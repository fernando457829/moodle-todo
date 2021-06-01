export type CheckingForUpdateInfo = {
  type: 'checking-for-update',
};

export type DownloadInfo = {
  type: 'download';
  percent: number;
};

export type UpToDateInfo = {
  type: 'up-to-date';
};

export type ReadyToUpdateInfo = {
  type: 'ready-to-update',
};

export type StateInfo =
  | CheckingForUpdateInfo
  | DownloadInfo
  | UpToDateInfo
  | ReadyToUpdateInfo;

export type UpdateManagerApi = {
  getVersion(): Promise<string>;

  checkForUpdate(): void;
  install(): void;

  addStateChangeListener(handler: (state: StateInfo) => void): void;
  removeStateChangeListener(handler: (state: StateInfo) => void): void;
};
