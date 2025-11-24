import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    // Increase timeouts for CI environments with slower API responses
    pageLoadTimeout: 120000, 
    defaultCommandTimeout: 20000, 
    requestTimeout: 20000, 
    responseTimeout: 20000,
    // Retry failed tests to handle network issues
    retries: {
      runMode: 2, 
      openMode: 0, 
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
