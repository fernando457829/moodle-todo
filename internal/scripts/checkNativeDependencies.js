const fs = require('fs');
const { execSync } = require('child_process');

const { dependencies } = require('../../package.json');

const dependenciesKeys = Object.keys(dependencies);
const nativeDependencies = fs
  .readdirSync('node_modules')
  .filter((folder) => fs.existsSync(`node_modules/${folder}/binding.gyp`));

if (!nativeDependencies.length) process.exit(0);

try {
  const invalidNativeDependencies = Object
    .keys(
      JSON.parse(execSync(`npm ls ${nativeDependencies.join(' ')} --json`).toString()).dependencies,
    )
    .filter((rootDependency) => dependenciesKeys.includes(rootDependency));

  if (invalidNativeDependencies.length) {
    console.log('Webpack does not work with native dependencies.');
    console.log(`Invalid native dependencies: ${invalidNativeDependencies.join(', ')}`);
    console.log('Please, install them inside "build/app"');

    process.exit(1);
  }
} catch (error) {
  console.log('Native dependencies could not be checked');
}
