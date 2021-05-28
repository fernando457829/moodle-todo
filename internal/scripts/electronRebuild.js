const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');

const { dependencies } = require('../../src/package.json');
const { rootPath, srcPath } = require('../utils/paths');

const nodeModulesPath = path.join(srcPath, 'node_modules');

if (Object.keys(dependencies || {}).length && fs.existsSync(nodeModulesPath)) {
  spawnSync(
    path.join(rootPath, 'node_modules/.bin/electron-rebuild'),
    [
      '--parallel',
      '--force',
      '--types prod,dev,optional',
      '--module-dir .',
    ],
    {
      stdio: 'inherit',
    },
  );
}
