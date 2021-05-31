const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');

const { rootPath, appNodeModulesPath } = require('../utils/paths');
const { dependencies } = require('../../build/app/package.json');

if (Object.keys(dependencies || {}).length && fs.existsSync(appNodeModulesPath)) {
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
