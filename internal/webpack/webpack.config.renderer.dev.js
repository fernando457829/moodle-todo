const {
  DllReferencePlugin,
  NoEmitOnErrorsPlugin,
  EnvironmentPlugin,
  LoaderOptionsPlugin,
} = require('webpack');
const path = require('path');
const { spawn } = require('child_process');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseConfig = require('./webpack.config.base');
const { srcPath, dllPath, manifestPath } = require('../utils/paths');
const isNodeEnv = require('../utils/isNodeEnv');
const buildDLL = require('../utils/buildDLL');
const rendererDevModule = require('../utils/rendererDevModule');

if (process.env.NODE_ENV === 'production') isNodeEnv('development');

buildDLL();

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}/dist`;

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',

  mode: 'development',

  target: 'electron-renderer',

  entry: [
    'core-js',
    'regenerator-runtime/runtime',
    require.resolve(path.join(srcPath, 'index.tsx')),
  ],

  output: {
    publicPath,
    filename: 'renderer.dev.js',
  },

  module: rendererDevModule,

  plugins: [
    new DllReferencePlugin({
      context: dllPath,
      manifest: require(manifestPath),
      sourceType: 'var',
    }),

    new NoEmitOnErrorsPlugin(),

    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new LoaderOptionsPlugin({
      debug: true,
    }),

    new ReactRefreshWebpackPlugin(),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },

  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),

    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100,
    },

    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },

    before() {
      console.log('Starting Main Process...');

      spawn(
        'npm',
        ['run', 'start:main'],
        {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        },
      )
        .on('close', (code) => process.exit(code))
        .on('error', (spawnError) => console.error(spawnError));
    },
  },
});
