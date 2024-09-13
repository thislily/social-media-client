const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    baseUrl: 'http://127.0.0.1:5500/' // Update this to the port your server uses
  },
});
