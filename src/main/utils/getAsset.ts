import { app } from 'electron';
import path from 'path';

const resourcesPath = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../assets');

export default function getAsset(...paths: string[]) {
  return path.join(resourcesPath, ...paths);
}
