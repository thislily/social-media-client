import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginCypress from "eslint-plugin-cypress";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      cypress: eslintPluginCypress,
    },
    rules: {
      // Optionally, add or customize any rules here
    },
  },
  {
    extends: [
      pluginJs.configs.recommended,
      "plugin:cypress/recommended", // Use Cypress recommended rules
    ],
    overrides: [
      {
        files: ["**/*.cy.js"], // Match files with .cy.js extension
        env: {
          "cypress/globals": true,
        },
        plugins: ["cypress"],
        extends: ["plugin:cypress/recommended"],
        rules: {
          "cypress/no-unnecessary-waiting": "off", // Disable specific Cypress rule
          "no-unused-vars": "off", // Disable specific rule
        },
      },
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];
