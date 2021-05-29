const path = require('path');

const rootPath = path.resolve(__dirname, '../..');
const internalPath = path.resolve(__dirname, '..');
const dllPath = path.join(internalPath, 'dll');

module.exports = {
  rootPath,
  internalPath,
  dllPath,

  srcPath: path.join(rootPath, 'src'),
  manifestPath: path.join(dllPath, 'renderer.json'),
};
