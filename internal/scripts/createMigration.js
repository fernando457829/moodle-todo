const path = require('path');
const fs = require('fs');

const { srcMainPath } = require('../utils/paths');
const { yyyymmddhhmmss } = require('../utils/timestamp');

const migrationName = process.argv[2];

if (!migrationName) {
  console.log('Migration name is required');
  process.exit(1);
}

fs.writeFileSync(
  path.join(srcMainPath, 'database/migrations', `${yyyymmddhhmmss()}_${migrationName}.ts`),
  '',
  {
    encoding: 'utf-8',
  },
);
