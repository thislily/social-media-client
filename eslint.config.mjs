import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginCypress from 'eslint-plugin-cypress';
import { FlatCompat } from '@eslint/eslintrc';

// Initialize compatibility layer for older configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
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
      // General ESLint rules can be added or customized here
    },
  },
  // Include traditional configs with compatibility utility
  pluginJs.configs.recommended,
  eslintPluginCypress.configs.recommended,
  {
    overrides: [
      {
        files: ['**/*.cy.js'], // Target Cypress test files
        env: {
          'cypress/globals': true,
        },
        plugins: {
          cypress: eslintPluginCypress,
        },
        rules: {
          'cypress/no-unnecessary-waiting': 'off',
          'no-unused-vars': 'off',
        },
      },
    ],
  },
];

