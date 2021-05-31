const { EnvironmentPlugin } = require('webpack');

const { srcPath } = require('../utils/paths');
const { dependencies } = require('../../build/app/package.json');

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
    library: {
      type: 'commonjs2',
    },
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
