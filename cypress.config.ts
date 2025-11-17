import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    userAgent: 'axios/0.27.2',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
