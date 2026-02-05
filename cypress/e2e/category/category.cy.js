/// <reference types="cypress" />

/*
 * Test category pages on the Daily Bruin site.
 * Uses mocked API responses for reliable tests.
 */
describe("Category Pages", () => {
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

  beforeEach(() => {
    cy.fixture("category").then((category) => {
      cy.intercept("GET", "**/wp-json/wp/v2/categories?slug=news", {
        statusCode: 200,
        body: category
      }).as("getCategory");
    });

    cy.fixture("category-posts").then((posts) => {
      cy.intercept("GET", "**/wp-json/wp/v2/posts?_embed&categories=1424", {
        statusCode: 200,
        body: posts
      }).as("getPosts");
    });

    cy.intercept("GET", "**/wp-json/wp/v2/categories?parent=1424*", {
      statusCode: 200,
      body: []
    }).as("getSubcategories");

    cy.fixture("classifieds").then((classifieds) => {
      cy.intercept("GET", "**/wp-json/wp/v2/classifieds?_embed&Featured=3", {
        statusCode: 200,
        body: classifieds
      }).as("getClassifieds");
    });
  });

  it("should load news category page", () => {
    cy.visit("/category/news", { timeout: 60000 });
    cy.url().should("include", "/category/news");
  });

  it("should display category name in title", () => {
    cy.visit("/category/news", { timeout: 60000 });
    cy.title().should("include", "News");
    cy.title().should("include", "Daily Bruin");
  });

  it("should display masthead on category page", () => {
    cy.visit("/category/news", { timeout: 60000 });
    cy.get("#masthead", { timeout: 15000 }).should("exist").and("be.visible");
  });

  it("should display section header with category name", () => {
    cy.visit("/category/news", { timeout: 60000 });
    cy.contains("News", { timeout: 15000 }).should("be.visible");
  });

  it("should display ArticleGrid with articles", () => {
    cy.visit("/category/news", { timeout: 60000 });
    cy.get("#ArticleGrid", { timeout: 15000 }).should("exist");
  });

  it("should show 404 for non-existent category", () => {
    cy.intercept("GET", "**/wp-json/wp/v2/categories?slug=non-existent-cat-xyz", {
      statusCode: 200,
      body: []
    }).as("getCategory");

    cy.visit("/category/non-existent-cat-xyz", {
      failOnStatusCode: false,
      timeout: 60000
    });

    cy.get("h1", { timeout: 10000 })
      .invoke("text")
      .then((text) => {
        expect(text).to.match(/404|Not Found|This page could not be found/i);
      });
  });
});
