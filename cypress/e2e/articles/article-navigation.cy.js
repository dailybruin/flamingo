/// <reference types="cypress" />

/*
 * Test article page navigation - links within article pages.
 * Uses real WordPress API data - category nav works via client-side fetch (intercept works).
 */
describe("Article Page Navigation", () => {
  const WP_API = "https://wp.dailybruin.com/wp-json/wp/v2";
  let articleSlug = "";
  let categorySlug = "";

  Cypress.on("uncaught:exception", () => false);

  before(() => {
    cy.request({
      url: `${WP_API}/posts?per_page=1&_embed`,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200 && response.body?.length > 0) {
        const post = response.body[0];
        articleSlug = post.slug;
        const category = post._embedded?.["wp:term"]?.[0]?.[0];
        categorySlug = category?.slug || "news";
      }
    });
  });

  beforeEach(function () {
    if (!articleSlug) {
      this.skip();
    }
  });

  it("should navigate to category when clicking category link on article", () => {
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });

    // Only click same-origin links (href starts with /) - WordPress may return full URLs
    // that would navigate to production and break the test
    cy.get(`a[href^="/category/${categorySlug}"]`, { timeout: 15000 })
      .first()
      .click();

    // Should navigate to category page (stay on localhost)
    cy.url({ timeout: 10000 }).should("include", `/category/${categorySlug}`);
  });

  it("should navigate to author page when clicking author link", () => {
    cy.visit(`/post/${articleSlug}`, { timeout: 60000 });

    // Find and click any author link (articles have author names/cards)
    cy.get('a[href^="/author/"]', { timeout: 15000 }).first().click();

    // Should navigate to author page
    cy.url({ timeout: 10000 }).should("include", "/author/");
  });
});
