const { EnvironmentPlugin } = require('webpack');

const { dependencies } = require('../../src/package.json');
const { srcPath } = require('../utils/paths');

module.exports = {
  externals: Object.keys(dependencies || {}),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    path: srcPath,
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [srcPath, 'node_modules'],
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
