const { EnvironmentPlugin } = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.config.base');
const isNodeEnv = require('../utils/isNodeEnv');
const deleteSourceMaps = require('../utils/deleteSourceMaps');
const { srcMainPath, distPath } = require('../utils/paths');

isNodeEnv('production');
deleteSourceMaps();

const openAnalyzer = process.env.OPEN_ANALYZER === 'true';

module.exports = merge(baseConfig, {
  devtool: process.env.DEBUG_PROD === 'true' ? 'source-map' : undefined,

  mode: 'production',

  target: 'electron-main',

  entry: path.join(srcMainPath, 'index.ts'),

  output: {
    path: distPath,
    filename: 'main.js',
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer,

      analyzerMode: openAnalyzer ? 'server' : 'disabled',
    }),

    new EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },
});
