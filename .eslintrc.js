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
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', '@typescript-eslint'],
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
    'global-require': 0,
    'max-len': ['error', { code: 120, comments: 130 }],
    'no-plusplus': 0,
    'no-use-before-define': [0],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.ts', '.tsx'] }],
    '@typescript-eslint/no-use-before-define': ['error', { variables: false, functions: false }],
  },
};
