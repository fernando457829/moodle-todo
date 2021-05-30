const path = require('path');

const rootPath = path.resolve(__dirname, '../..');

const internalPath = path.resolve(__dirname, '..');
const dllPath = path.join(internalPath, 'dll');
const manifestPath = path.join(dllPath, 'renderer.json');

const srcPath = path.join(rootPath, 'src');
const srcMainPath = path.join(srcPath, 'main');
const srcRendererPath = path.join(srcPath, 'renderer');
const srcRendererTemplatePath = path.join(srcRendererPath, 'index.html');

const buildPath = path.join(rootPath, 'build');
const appPath = path.join(buildPath, 'app');
const appNodeModulesPath = path.join(appPath, 'node_modules');
const distPath = path.join(appPath, 'dist');

module.exports = {
  rootPath,

  internalPath,
  dllPath,
  manifestPath,

  srcPath,
  srcMainPath,
  srcRendererPath,
  srcRendererTemplatePath,

  buildPath,
  appPath,
  appNodeModulesPath,
  distPath,
};
