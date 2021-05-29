const fs = require('fs');
const { execSync } = require('child_process');

const { dllPath, manifestPath } = require('./paths');

module.exports = function buildDLL() {
  if (fs.existsSync(dllPath) && fs.existsSync(manifestPath)) {
    console.log('The DLL files are missing. Building DLL...');

    try {
      execSync('yarn postinstall');
    } catch (error) {
      console.log(Buffer.from(error.stdout).toString());
      process.exit(1);
    }
  }
};
