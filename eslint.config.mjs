import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import eslintPluginCypress from 'eslint-plugin-cypress';

// Initialize compatibility layer
const compat = new FlatCompat({
  baseDirectory: __dirname, // Required to locate the config files
});

export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      cypress: eslintPluginCypress,
    },
    rules: {
      // Add or customize rules here
    },
  },
  // Include traditional .eslintrc configurations wrapped for flat config compatibility
  ...compat.extends('eslint:recommended'),
  ...compat.extends('plugin:cypress/recommended'),
  {
    overrides: [
      {
        files: ['**/*.cy.js'],
        env: {
          'cypress/globals': true,
        },
        rules: {
          'cypress/no-unnecessary-waiting': 'off',
          'no-unused-vars': 'off',
        },
      },
    ],
  },
];
