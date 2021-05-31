const {
  DllReferencePlugin,
  NoEmitOnErrorsPlugin,
  EnvironmentPlugin,
  LoaderOptionsPlugin,
} = require('webpack');
const path = require('path');
const { spawn } = require('child_process');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const baseConfig = require('./webpack.config.base');
const {
  dllPath,
  manifestPath,
  distPath,
  srcRendererTemplatePath,
  appNodeModulesPath,
  srcRendererPath,
} = require('../utils/paths');
const isNodeEnv = require('../utils/isNodeEnv');
const buildDLL = require('../utils/buildDLL');
const rendererDevModule = require('../utils/rendererDevModule');

if (process.env.NODE_ENV === 'production') isNodeEnv('development');

buildDLL();

const port = process.env.PORT || 1212;

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',

  mode: 'development',

  target: ['web', 'electron-renderer'],

  entry: [
    'core-js',
    'regenerator-runtime/runtime',
    require.resolve(path.join(srcRendererPath, 'index.tsx')),
  ],

  output: {
    path: distPath,
    publicPath: '/',
    filename: 'renderer.js',
    library: {
      type: 'umd',
    },
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

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: srcRendererTemplatePath,
      isBrowser: false,
      env: process.env.NODE_ENV,
      isDevelopment: process.env.NODE_ENV !== 'production',
      nodeModules: appNodeModulesPath,

      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
    }),
  ],

  node: {
    __dirname: false,
    __filename: false,
  },

  devServer: {
    port,
    publicPath: '/',
    compress: true,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,

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
