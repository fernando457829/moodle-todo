const register = require('@babel/register');

const { rootPath } = require('../utils/paths');

register({
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
  cwd: rootPath,
});
