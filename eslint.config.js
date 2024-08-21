const globals = require('globals');
const pluginJs = require('@eslint/js');
const eslintPluginCypress = require('eslint-plugin-cypress');
const { FlatCompat } = require('@eslint/eslintrc');

// Initialize compatibility layer for older configs
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      cypress: eslintPluginCypress, // Correctly define the plugin as an object
    },
    rules: {
      // General ESLint rules can be added or customized here
    },
  },
  // Directly include recommended configs without using "extends"
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
          cypress: eslintPluginCypress, // Correctly define the plugin as an object
        },
        rules: {
          'cypress/no-unnecessary-waiting': 'off',
          'no-unused-vars': 'off',
        },
      },
    ],
  },
];
