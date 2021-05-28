module.exports = function isNodeEnv(env) {
  if (process.env.NODE_ENV !== env) {
    console.log(`"process.env.NODE_ENV" must be "${env}"`);

    process.exit(2);
  }
};
