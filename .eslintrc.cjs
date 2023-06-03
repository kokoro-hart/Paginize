module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['import', 'unused-imports', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/prefer-default-export': 'off',
    'unused-imports/no-unused-imports': 'error',
    'no-underscore-dangle': 'off',
  },
  ignorePatterns: ['vite.config.ts'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
