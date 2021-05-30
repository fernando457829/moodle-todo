const rimraf = require('rimraf');
const path = require('path');

const {
  distPath,
  buildPath,
  dllPath,
  srcPreloadPath,
} = require('../utils/paths');

const argumentMap = {
  dist: distPath,
  release: path.join(buildPath, 'release'),

  dll: dllPath,

  preload: path.join(srcPreloadPath, 'preload.js'),
};

let args = process.argv.slice(2);

if (!args.length) {
  console.log(`Available paths: ${Object.keys(argumentMap).join(', ')}`);
}

if (args.includes('all')) args = Object.keys(argumentMap);

args.forEach((arg) => {
  const pathToRemove = argumentMap[arg];

  if (pathToRemove) rimraf.sync(pathToRemove);
});
