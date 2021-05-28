const path = require('path');
const fs = require('fs');

const { srcPath } = require('../utils/paths');

const mainPath = path.join(srcPath, 'main.prod.js');
const rendererPath = path.join(srcPath, 'dist/renderer.prod.js');

if (!fs.existsSync(mainPath) || !fs.existsSync(rendererPath)) {
  throw new Error('The app is not builded yet. Build it by running "yarn build"');
}
