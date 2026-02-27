/**
 * ArticleCard/locals.js
 *
 * Card-specific style fragments that are shared across multiple ArticleCard
 * variants but are NOT generic enough to belong in the top-level `globals.js`.
 *
 * These are used inside Emotion `css` template literals, typically composed
 * with variant-specific margin/padding overrides in each card file.
 */
import * as globals from "../globals";

/** Headline text style */
export const headline = `
  font-family: ${globals.headlineFont};
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.25;
  color: #000000;
  &:hover {
    color: ${globals.DBblue};
  }`;

/** Excerpt / preview text style */
export const excerpt = `
  font-family: ${globals.bodyFont};
  font-weight: 300;
  font-size: 0.75rem;
  color: #000000;

  p {
    margin: 0;
  }
  
  br {
    display: none;
  }
  `;
