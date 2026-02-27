/**
 * ArticleCard/styles.js
 *
 * Shared CSS-in-JS style fragments used across all ArticleCard variants
 * (Vert, Horz, Full, Long, Mini, Video, Podcast, Breaking, BreakingOverview).
 *
 * Each export is a template-literal string intended for Emotion's `css` tag.
 * Variant-specific overrides can be applied inline alongside these shared styles.
 */
import * as globals from "../globals";

/* Card containers */

/** Block-style card (Vert, Full, Video, Podcast) */
export const blockCard = `
  display: block;
  padding: 10px;
  box-shadow: ${globals.cardShadow};
  background-color: #ffffff;
`;

/** Flex-style card (Horz, Long, Mini) */
export const flexCard = `
  display: flex;
  box-shadow: ${globals.cardShadow};
  padding: 0px;
  background-color: #ffffff;
`;

/** Breaking-style card with wrapped flex layout */
export const breakingCard = `
  display: flex;
  flex-wrap: wrap;
  box-shadow: ${globals.cardShadow};
  padding: 0px;
  background-color: #ffffff;
  border-radius: 20px;
  width: 100%;
`;

/* Category link */

/** Anchor wrapper for category links */
export const categoryLink = `
  text-decoration: none;
  color: ${globals.DBblue};
  vertical-align: middle;
  &:hover {
    text-decoration: underline;
  }
`;

/** Category heading (h2) */
export const categoryHeading = `
  margin: 0 4px 0 0;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  display: inline;
`;

/* Date / timestamp */

/** Date text displayed next to the category with a left border separator */
export const dateText = `
  border-left: 1px solid #000;
  margin: 0;
  padding-left: 4px;
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
`;

/** Date text without the left border (used in Breaking cards) */
export const dateTextNoBorder = `
  margin: 0 5px 0 0;
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
  display: inline;
`;

/* Author byline */

/** Author byline heading (h3) */
export const authorByline = `
  margin: 0;
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  color: #000000;
`;

/** Author byline with top margin (used in Long variant) */
export const authorBylineSpaced = `
  margin: 4px 0 0;
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  color: #000000;
`;

/** Inline author heading (used in Breaking) */
export const authorBylineInline = `
  margin: 0;
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  display: inline;
  margin-right: 4px;
  color: #000000;
`;

/* Photographer credit */

/** Small right-aligned photographer credit */
export const photographerCredit = `
  margin: 2px 0;
  font-family: Arimo;
  font-style: normal;
  font-weight: normal;
  font-size: 8px;
  text-align: right;
  color: #000000;
`;

/* Image containers */

/** Fill-style image container (used in Horz, Long, Mini, Breaking, etc.) */
export const fillImageContainer = `
  height: 100%;
  width: 100%;
  padding-top: 66.66%;
  overflow: hidden;
  position: relative;
`;

/** Responsive fallback <img> for when NextJS Image dimensions are unavailable */
export const responsiveImage = `
  width: 100%;
  margin: auto;
`;

/* Caption */

/** Full card caption text */
export const captionText = `
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  text-align: justify;
  p {
    margin: 4px 0;
  }
  color: #000000;
`;

/** Breaking card caption (right-aligned) */
export const breakingCaption = `
  text-align: right;
  p {
    margin: 10px 20px;
    font-family: ${globals.bodyFont};
    font-size: 12px;
    color: ${globals.darkGray};
  }
`;

/* Breaking-specific */

/** Content padding for Breaking / BreakingOverview inner sections */
export const breakingContentPadding = `
  padding: 20px;
  padding-bottom: 5px;
  padding-top: 5px;
  width: 100%;
`;

/** Breaking headline (inline DM Serif style) */
export const breakingHeadline = `
  font-family: 'DM Serif Text', serif;
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.25;
  color: #000000;
`;

/** Breaking body content text */
export const breakingBodyText = `
  font-family: 'Roboto', serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #000000;
`;
