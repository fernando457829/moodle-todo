const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const { dependencies } = require('../../package.json');
const { dllPath, srcPath } = require('../utils/paths');
const isNodeEnv = require('../utils/isNodeEnv');

isNodeEnv('development');

module.exports = merge(baseConfig, {
  context: path.join(__dirname, '..'),

  devtool: 'eval',

  mode: 'development',

  target: 'electron-renderer',

  externals: ['fsevents', 'crypto-browserify'],

  module: require('./webpack.config.renderer.dev.babel').module,

  entry: {
    renderer: Object.keys(dependencies || {}),
  },

  output: {
    library: 'renderer',
    path: dllPath,
    filename: '[name].dev.dll.js',
    libraryTarget: 'var',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(dllPath, '[name].json'),
      name: '[name]',
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: srcPath,
        output: {
          path: dllPath,
        },
      },
    }),
  ],
});
