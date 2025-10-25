/// <reference types="cypress" />

/*
 * Test an article. This tests for a
 * feature image, date, author, and content
 */
describe('Article', () => {
  /* This is a test article, rendered from /pages/[year]/[month]/[day]/[slug].jsx */
  const homepagePath = '/2025/06/08/chasing-small-joys-through-building-communities-making-lifelong-memories-30';

  /*
   * Ignore cross-origin script errors
   * For some reason this error comes up unwantingly with
   * Cypress. It's fine to do this because we're only testing
   * that things show up, not if some script got blocked
   * from running.
   */
  Cypress.on('uncaught:exception', (err) => {
    Cypress.log({ name: 'Uncaught Exception', message: err.message });
    if (err.message.includes('Script error.')) {
      return false; // prevent test from failing
    }
    return true; // let other errors fail the test
  });

  /* check if page loads */
  it('should return 200 and load without 404', () => {
    cy.request(homepagePath).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  /* check if page has correct title */
  it('should have correct title', () => {
    cy.visit(homepagePath);
    cy.title()
      .should('include', 'Daily Bruin');
  });

  /* check masthead exists */
  it('Should have a masthead', () => {
    cy.visit(homepagePath);

    /* check if masthead exists */
    cy.get('#masthead')
      .should('exist')
      .within(() => {
        /* check if all categories show up */
        cy.contains('News').should('exist');
        cy.contains('Sports').should('exist');
        cy.contains('Arts').should('exist');
        cy.contains('Opinion').should('exist');
        cy.contains('The Quad').should('exist');
        cy.contains('Photo').should('exist');
        cy.contains('Video').should('exist');
        cy.contains('Illustrations').should('exist');
        cy.contains('Cartoons').should('exist');
        cy.contains('Graphics').should('exist');
        cy.contains('The Stack').should('exist');
        cy.contains('PRIME').should('exist');
        cy.contains('Enterprise').should('exist');
        cy.contains('Interactives').should('exist');
        cy.contains('Podcasts').should('exist');
        cy.contains('Games').should('exist');
        cy.contains('Classifieds').should('exist');
        cy.contains('Print issues').should('exist');
      });
  });

  /* check that all articles show up, & sponsored links */
  it('should have the ArticleGrid show up correctly', () => {
    cy.visit(homepagePath);

    /* check that the ArticleGrid exists */
    cy.get('#ArticleGrid')
      .should('exist')
      .within(() => {
        /* check for article column and extras column */
        cy.get('#article')
          .should('exist')
          .within(() => {
            /* 
             * An article should have a headline, authors,
             * date, and content at the very least 
             */
            cy.get('#headline')
              .should('exist')
              .and('be.visible')
              .and('not.be.empty')

            cy.get('#feature-img')
              .should('exist')
              .and('be.visible')
              .and('have.attr', 'src')
              .and('not.be.empty')

            cy.get('#authors')
              .should('exist')
              .and('be.visible')
              .find('a')
              .should('have.length.at.least', 1)

            cy.get('#date')
              .should('exist')
              .and('be.visible')
              .and('not.be.empty')
          });
        
        cy.get('#extras')
          .should('exist')
          .within(() => {
            /* 
             * The extras column should have an ad,
             * classifieds, and related posts.
             */
            cy.get('broadstreet-zone-container')
              .should('exist')
              .and('be.visible')
              .and('not.be.empty')

            cy.get('#classifieds-card')
              .should('exist')
              .and('be.visible')
              .and('not.be.empty')

            cy.get('#related-posts')
              .should('exist')
              .and('be.visible')
              .and('not.be.empty')
          });
      });
  });

  /* check that footer exists */
  it('should show the footer', () => {
    cy.visit(homepagePath);
    
    cy.get('#footer')
      .should('exist')
      .and('be.visible');
  });
});
