const path = require('path');
const rimraf = require('rimraf');

const { srcPath } = require('./paths');

module.exports = function deleteSourceMaps() {
  rimraf.sync(path.join(srcPath, 'dist/*.js.map'));
  rimraf.sync(path.join(srcPath, '*.js.map'));
};
