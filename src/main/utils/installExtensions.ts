export default async function installExtensions(...extensions: string[]) {
  const installer = require('electron-devtools-installer').default;
  const forceDownload = process.env.UPGRADE_EXTENSIONS === 'true';

  return installer(extensions.map((name) => installer[name]), forceDownload).catch(console.log);
}
