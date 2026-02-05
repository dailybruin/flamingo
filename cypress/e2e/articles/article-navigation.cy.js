/// <reference types="cypress" />

/*
 * Test article page navigation - links within article pages.
 * Uses a fixed, regular article URL to avoid layout variability.
 */
describe("Article Page Navigation", () => {
  // Same regular article as in article.cy.js
  const articlePath = "/post/daily-bruin-print-issue-feb-2-2026";
  const categorySlug = "print";

  Cypress.on("uncaught:exception", () => false);

  it("should navigate to category when clicking category link on article", () => {
    cy.visit(articlePath, { timeout: 60000 });

    // Only click same-origin links (href starts with /) so we stay on localhost
    cy.get(`a[href^="/category/${categorySlug}"]`, { timeout: 15000 })
      .first()
      .click();

    // Should navigate to category page (stay on localhost)
    cy.url({ timeout: 10000 }).should("include", `/category/${categorySlug}`);
  });

  it("should navigate to author page when clicking author link", () => {
    cy.visit(articlePath, { timeout: 60000 });

    // Find and click any author link (articles have author names/cards)
    cy.get('a[href^="/author/"]', { timeout: 15000 }).first().click();

    // Should navigate to author page
    cy.url({ timeout: 10000 }).should("include", "/author/");
  });
});
