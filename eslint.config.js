// CommonJS syntax
const globals = require('globals');
const pluginJs = require('@eslint/js');
const eslintPluginCypress = require('eslint-plugin-cypress');
const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

// Initialize compatibility layer for older configs
const compat = new FlatCompat({
  baseDirectory: __dirname, // CommonJS provides __dirname by default
});

module.exports = [
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
