const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    baseUrl: 'http://127.0.0.1:8080', // Updated to match your webpack-dev-server
  },
});
