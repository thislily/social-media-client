const globals = require('globals');
const pluginJs = require('@eslint/js');
const eslintPluginCypress = require('eslint-plugin-cypress');
const { FlatCompat } = require('@eslint/eslintrc');

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
      cypress: eslintPluginCypress, // Ensure this is an object, not an array
    },
    rules: {
      // General ESLint rules can be added or customized here
    },
  },
  pluginJs.configs.recommended,
  eslintPluginCypress.configs.recommended,
  {
    overrides: [
      {
        files: ['**/*.cy.js'],
        env: {
          'cypress/globals': true,
        },
        plugins: {
          cypress: eslintPluginCypress, // Ensure this is an object, not an array
        },
        rules: {
          'cypress/no-unnecessary-waiting': 'off',
          'no-unused-vars': 'off',
        },
      },
    ],
  },
];
