/// <reference types="cypress" />

/*
 * Test the Daily Bruin's homepage.
 * This checks the masthead, the ArticleGrid,
 * and sponsored links.
 */
describe('Daily Bruin Homepage', () => {
  const homepagePath = '/';

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
    cy.visit(homepagePath, {
      headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        }
    });
    cy.title()
      .should('include', 'Daily Bruin');
  });

  /* check masthead and all categories */
  it('Should have a masthead', () => {
    cy.visit(homepagePath, {
      headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        }
    });

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
    cy.visit(homepagePath, {
      headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        }
    });

    /* check that the ArticleGrid exists */
    cy.get('#ArticleGrid')
      .should('exist')
      .within(() => {
        /* check that the left, center, and right columns all exist */
        cy.get('#left')
          .should('exist')
          .within(() => {
            /* 
             * check that the left has the correct tags
             * and corresponding components attached to them
             */
            cy.get('#a')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'vert');

            cy.get('#b')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'vert');

            cy.get('#classifieds').should('exist').and('be.visible');

            cy.get('#i')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'storyList');

            cy.get('#j')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'storyList');
          });
        
        cy.get('#center')
          .should('exist')
          .within(() => {
            /* check that the center has the correct tags */
            cy.get('#c1')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'full');

            cy.get('#c2')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'horz');

            cy.get('#MultimediaScroller').should('exist').and('be.visible');

            cy.get('#f1')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'horz');

            cy.get('#f2')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'horz');

            cy.get('#k')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'storyList');

            cy.get('#l')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'storyList');
          });

        cy.get('#right')
          .should('exist')
          .within(() => {
            /* check that the right has the correct tags */
            cy.get('#above-ad').should('exist');

            cy.get('#g')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'storyList');

            cy.get('#d')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'mini');

            cy.get('#e')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'mini');

            cy.get('#game')
              .should('exist')
              .and('be.visible')
              .within(() => {
                cy.get('a')
                  .should('exist')
                  .and('be.visible');
              });

            cy.get('#h')
              .should('exist')
              .and('be.visible')
              .children().first()
              .should('have.class', 'storyList');
          });

        /* check that sponsored links show */
        cy.contains('SPONSORED LINKS').should('exist');
      });
  });

  /* check that footer exists */
  it('should show the footer', () => {
    cy.visit(homepagePath, {
      headers: {
            'accept': 'application/json, text/plain, */*',
            'user-agent': 'axios/0.27.2'
        }
    });
    
    cy.get('#footer')
      .should('exist')
      .and('be.visible');
  });
});
