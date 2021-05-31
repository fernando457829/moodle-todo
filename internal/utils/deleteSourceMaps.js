const path = require('path');
const rimraf = require('rimraf');

const { distPath } = require('./paths');

module.exports = function deleteSourceMaps() {
  rimraf.sync(path.join(distPath, '*.js.map'));
};
