const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');

const { rootPath, appPath } = require('../utils/paths');
const { dependencies } = require('../../build/app/package.json');

const nodeModulesPath = path.join(appPath, 'node_modules');

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
