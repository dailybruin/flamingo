/// <reference types="cypress" />

/*
 * Test article pages on the Daily Bruin site.
 * Uses a fixed, regular article URL to avoid layout variability (galleries, features, etc.).
 *
 * NOTE: If this article is ever removed or its layout changes significantly,
 * update `articlePath` below to point to a new, regular article.
 */
describe("Article Pages", () => {
  // Known regular article rendered with the standard ArticleLayout
  const articlePath = "/post/daily-bruin-print-issue-feb-2-2026";

  Cypress.on("uncaught:exception", (err) => {
    Cypress.log({ name: "Uncaught Exception", message: err.message });
    if (
      err.message.includes("Script error.") ||
      err.message.includes("API Error") ||
      err.message.includes("403") ||
      err.message.includes("Failed to fetch") ||
      err.message.includes("NetworkError")
    ) {
      return false;
    }
    return false;
  });

  it("should load article page and return 200", () => {
    cy.visit(articlePath, { timeout: 60000 });
    cy.url().should("include", articlePath);
    cy.request({ url: articlePath, failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("should display article headline", () => {
    cy.visit(articlePath, { timeout: 60000 });
    // Regular articles rendered with ArticleLayout should have #article and a visible heading
    cy.get("#article", { timeout: 15000 }).should("exist").and("be.visible");
    cy.get("h1, h2", { timeout: 15000 })
      .first()
      .should("exist")
      .and("be.visible");
  });

  it("should have correct page title", () => {
    cy.visit(articlePath, { timeout: 60000 });
    cy.title().should("include", "Daily Bruin");
  });

  it("should display masthead on article page", () => {
    cy.visit(articlePath, { timeout: 60000 });
    cy.get("#masthead", { timeout: 15000 }).should("exist").and("be.visible");
  });

  it("should display article grid layout", () => {
    cy.visit(articlePath, { timeout: 60000 });
    cy.get("#ArticleGrid", { timeout: 15000 }).should("exist");
    cy.get("#article", { timeout: 15000 }).should("exist");
  });

  it("should display Related Posts section", () => {
    cy.visit(articlePath, { timeout: 60000 });
    cy.contains("Related Posts", { timeout: 15000 }).should("be.visible");
  });

  it("should display Featured Classifieds section", () => {
    cy.visit(articlePath, { timeout: 60000 });
    cy.contains("Featured Classifieds", { timeout: 15000 }).should(
      "be.visible"
    );
  });

  it("should work on mobile viewport", () => {
    cy.viewport("iphone-x");
    cy.visit(articlePath, { timeout: 60000 });
    cy.get("#ArticleGrid", { timeout: 15000 }).should("exist");
  });

  it("should work on tablet viewport", () => {
    cy.viewport("ipad-2");
    cy.visit(articlePath, { timeout: 60000 });
    cy.get("#article", { timeout: 15000 }).should("exist");
    cy.contains("Related Posts", { timeout: 15000 }).should("be.visible");
  });
});
