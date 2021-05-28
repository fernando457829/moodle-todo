const path = require('path');

const rootPath = path.resolve(__dirname, '../..');
const internalPath = path.resolve(__dirname, '..');

module.exports = {
  rootPath,
  internalPath,

  srcPath: path.join(rootPath, 'src'),
  dllPath: path.join(internalPath, 'dll'),
};
