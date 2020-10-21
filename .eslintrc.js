module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'global-require': 0,
    'max-len': ['error', { code: 120 }],
    'no-use-before-define': [0],
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.ts', '.tsx'] }],
    '@typescript-eslint/no-use-before-define': ['error', { variables: false, functions: false }],
  },
};
