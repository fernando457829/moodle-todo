const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.config.base');
const isNodeEnv = require('../utils/isNodeEnv');
const deleteSourceMaps = require('../utils/deleteSourceMaps');
const { rootPath } = require('../utils/paths');

isNodeEnv('production');
deleteSourceMaps();

module.exports = merge(baseConfig, {
  devtool: process.env.DEBUG_PROD ? 'source-map' : undefined,

  mode: 'production',

  target: 'electron-main',

  entry: './src/main.dev.ts',

  output: {
    path: rootPath,
    filename: './src/main.prod.js',
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
      analyzerMode:
        process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
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
