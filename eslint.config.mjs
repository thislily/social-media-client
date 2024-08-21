import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginCypress from 'eslint-plugin-cypress';

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
  // Directly include the recommended configs without using "extends"
  pluginJs.configs.recommended,
  eslintPluginCypress.configs.recommended,
  {
    overrides: [
      {
        files: ['**/*.cy.js'], // Match files with .cy.js extension
        env: {
          'cypress/globals': true,
        },
        plugins: {
          cypress: eslintPluginCypress,
        },
        rules: {
          'cypress/no-unnecessary-waiting': 'off', // Disable specific Cypress rule
          'no-unused-vars': 'off', // Disable specific rule
        },
      },
    ],
  },
];
