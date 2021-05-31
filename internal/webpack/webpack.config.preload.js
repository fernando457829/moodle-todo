const { EnvironmentPlugin } = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.config.base');
const { srcPreloadPath, distPath } = require('../utils/paths');

const openAnalyzer = process.env.OPEN_ANALYZER === 'true';
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = merge(baseConfig, {
  devtool: process.env.DEBUG_PROD === 'true' ? 'source-map' : undefined,

  mode: isDevelopment ? 'development' : 'production',

  target: 'electron-preload',

  entry: path.join(srcPreloadPath, 'index.ts'),

  output: {
    path: isDevelopment ? srcPreloadPath : distPath,
    filename: 'preload.js',
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
      NODE_ENV: isDevelopment ? 'development' : 'production',
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },
});
