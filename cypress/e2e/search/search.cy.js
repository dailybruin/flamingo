/// <reference types="cypress" />

/*
 * Test the Daily Bruin search page.
 * Search uses Google Custom Search - we test page structure and query display.
 */
describe("Search Page", () => {
  Cypress.on("uncaught:exception", (err) => {
    Cypress.log({ name: "Uncaught Exception", message: err.message });
    if (
      err.message.includes("Script error.") ||
      err.message.includes("API Error") ||
      err.message.includes("403") ||
      err.message.includes("Failed to fetch")
    ) {
      return false;
    }
    return false;
  });

  it("should load search page with query", () => {
    cy.visit("/search?q=bruin", { timeout: 60000 });
    cy.url().should("include", "/search");
    cy.url().should("include", "q=bruin");
  });

  it("should display search query in page", () => {
    cy.visit("/search?q=ucla+news", { timeout: 60000 });
    cy.contains("Search:", { timeout: 10000 }).should("be.visible");
    cy.contains("ucla news", { timeout: 10000 }).should("be.visible");
  });

  it("should have correct page title with query", () => {
    cy.visit("/search?q=daily+bruin", { timeout: 60000 });
    cy.title().should("include", "daily bruin");
    cy.title().should("include", "Daily Bruin");
  });

  it("should display masthead on search page", () => {
    cy.visit("/search?q=test", { timeout: 60000 });
    cy.get("#masthead", { timeout: 15000 }).should("exist").and("be.visible");
  });

  it("should handle empty search query", () => {
    cy.visit("/search?q=", { timeout: 60000 });
    cy.contains("Search:", { timeout: 10000 }).should("be.visible");
  });

  it("should handle special characters in query", () => {
    cy.visit("/search?q=test%26article", { timeout: 60000 });
    cy.url().should("include", "search");
    cy.get("#masthead", { timeout: 15000 }).should("exist");
  });
});
