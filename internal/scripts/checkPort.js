const detectPort = require('detect-port');

const port = process.env.PORT || '1212';

detectPort(port, (error, availablePort) => {
  if (port !== String(availablePort)) {
    throw new Error(
      `Port "${port}" is already in use. Please use another port by using "PORT=5000" yarn start`,
    );
  } else process.exit(0);
});
