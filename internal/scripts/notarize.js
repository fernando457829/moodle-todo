const { notarize } = require('electron-notarize');

const { build } = require('../../package.json');

exports.default = async function notarizeMacOS({ electronPlatformName, appOutDir, packager }) {
  if (electronPlatformName !== 'darwin') return;

  if (!process.env.CI) {
    console.warn('Skipping notarizing step. Packaging is not running in CI');
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASS) {
    console.warn('Skipping notarizing step. APPLE_ID and APPLE_ID_PASS env variables must be set');
    return;
  }

  await notarize({
    appBundleId: build.appId,
    appPath: `${appOutDir}/${packager.appInfo.productFilename}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS,
  });
};
