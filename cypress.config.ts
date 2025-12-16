import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    // Increase timeouts for CI environments with slower API responses
    pageLoadTimeout: 120000, // 2 minutes
    defaultCommandTimeout: 20000, // 20 seconds
    requestTimeout: 20000, // 20 seconds
    responseTimeout: 20000, // 20 seconds
    // Retry failed tests to handle flaky network issues
    retries: {
      runMode: 2, // Retry up to 2 times in CI
      openMode: 0, // Don't retry in interactive mode
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
