module.exports = {
  extends: 'airbnb-typescript',
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: require.resolve('./webpack/webpack.config.eslint.js'),
      },
    },
  },
  overrides: [
    {
      files: [
        'webpack/**',
        'scripts/**',
        'babel.config.js',
        'src/main.dev.ts',
      ],
      rules: {
        'global-require': 'off',
        'no-console': 'off',

        'import/no-dynamic-require': 'off',
      },
    },
  ],
};
