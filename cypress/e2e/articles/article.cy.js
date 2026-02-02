/// <reference types="cypress" />

/*
 * Test article pages on the Daily Bruin site.
 * Uses real WordPress API data - Next.js fetches server-side so cy.intercept cannot mock.
 */
describe("Article Pages", () => {
  const WP_API = "https://wp.dailybruin.com/wp-json/wp/v2";

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

  // Fetch a real article slug before tests (Next.js fetches server-side, so we need real data)
  let articleSlug = "";
  let articleTitle = "";

  before(() => {
    cy.request({
      url: `${WP_API}/posts?per_page=1&_embed`,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200 && response.body?.length > 0) {
        articleSlug = response.body[0].slug;
        articleTitle = response.body[0].title?.rendered || "";
      }
    });
  });

  beforeEach(function () {
    if (!articleSlug) {
      this.skip();
    }
  });

  it("should load article page and return 200", () => {
    const articlePath = `/post/${articleSlug}`;
    cy.visit(articlePath, { timeout: 60000 });
    cy.url().should("include", articlePath);
    cy.request({ url: articlePath, failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("should display article headline", () => {
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });
    // Article page should have headline - check for Daily Bruin (all articles have this)
    cy.get("#article", { timeout: 15000 }).should("exist").and("be.visible");
    cy.get("h1, h2", { timeout: 15000 }).first().should("exist").and("be.visible");
  });

  it("should have correct page title", () => {
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });
    cy.title().should("include", "Daily Bruin");
  });

  it("should display masthead on article page", () => {
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });
    cy.get("#masthead", { timeout: 15000 }).should("exist").and("be.visible");
  });

  it("should display article grid layout", () => {
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });
    cy.get("#ArticleGrid", { timeout: 15000 }).should("exist");
    cy.get("#article", { timeout: 15000 }).should("exist");
  });

  it("should display Related Posts section", () => {
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });
    cy.contains("Related Posts", { timeout: 15000 }).should("be.visible");
  });

  it("should display Featured Classifieds section", () => {
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });
    cy.contains("Featured Classifieds", { timeout: 15000 }).should(
      "be.visible"
    );
  });

  it("should work on mobile viewport", () => {
    cy.viewport("iphone-x");
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });
    cy.get("#ArticleGrid", { timeout: 15000 }).should("exist");
  });

  it("should work on tablet viewport", () => {
    cy.viewport("ipad-2");
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });
    cy.get("#article", { timeout: 15000 }).should("exist");
    cy.contains("Related Posts", { timeout: 15000 }).should("be.visible");
  });
});
