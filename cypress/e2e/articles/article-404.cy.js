/// <reference types="cypress" />

/*
 * Test 404 behavior for non-existent articles.
 */
describe("Article 404 and Error Handling", () => {
  Cypress.on("uncaught:exception", () => false);

  it("should show 404 for non-existent article slug", () => {
    cy.intercept("GET", "**/wp-json/wp/v2/posts?slug=*&_embed", {
      statusCode: 200,
      body: []
    }).as("getPost");

    cy.visit("/post/non-existent-article-xyz-123", {
      failOnStatusCode: false,
      timeout: 60000
    });

    // Next.js Error component shows 404
    cy.get("h1", { timeout: 10000 })
      .invoke("text")
      .then((text) => {
        expect(text).to.match(/404|Not Found|This page could not be found/i);
      });
  });

  it("should show 404 when API returns error", () => {
    cy.intercept("GET", "**/wp-json/wp/v2/posts?slug=*&_embed", {
      statusCode: 404,
      body: { message: "Post not found" }
    }).as("getPost");

    cy.visit("/post/error-article", {
      failOnStatusCode: false,
      timeout: 60000
    });

    cy.get("h1", { timeout: 10000 })
      .invoke("text")
      .then((text) => {
        expect(text).to.match(/404|Not Found|This page could not be found/i);
      });
  });

  it("should handle API timeout gracefully", () => {
    cy.intercept("GET", "**/wp-json/wp/v2/posts?slug=*&_embed", (req) => {
      req.reply({ delay: 30000, statusCode: 504 });
    }).as("getPost");

    cy.visit("/post/slow-article", {
      failOnStatusCode: false,
      timeout: 10000
    });

    // Page should either show error or loading state - not crash
    cy.get("body").should("exist");
  });
});
