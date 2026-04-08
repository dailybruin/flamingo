/**
 * Article/styles.js
 *
 * Extracted CSS-in-JS style fragments for the Article component.
 * Each export is a template-literal string intended for use with Emotion's `css` tag.
 */
import * as globals from "../globals";

/** Outer card wrapper with shadow and white background */
export const cardWrapper = `
  display: block;
  padding: 10px;
  box-shadow: ${globals.cardShadow};
  background-color: #ffffff;
`;

/** Category link row above the headline */
export const categoryRow = `
  a {
    text-decoration: none;
    color: #0080c6;
  }
  a:hover {
    text-decoration: underline;
  }
  a h2,
  span {
    margin: 0;
    font-family: ${globals.menuFont};
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
    display: inline;
  }
`;

/** Article headline (h1) */
export const headline = `
  margin: 2px 0;
  font-family: ${globals.headlineFont};
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 1.25;
  color: #000000;
`;

/** Feature image anchor wrapper (full bleed) */
export const featureImageLink = `
  display: block;
  width: calc(100% + 20px);
  margin: 10px -10px;
  cursor: zoom-in;
`;

/** Fallback <img> when NextJS Image dimensions are unavailable */
export const featureImageFallback = `
  width: 100%;
  display: block;
`;

/** Caption text below the feature image */
export const caption = `
  font-family: ${globals.bodyFont};
  p {
    margin: 0 20px;
    font-size: 10px;
    color: ${globals.darkGray};
  }
  @media (max-width: 40em) {
    p {
      margin: 0 0 10px;
    }
  }
`;

/** Padding wrapper for the article body section */
export const bodyPadding = `
  padding: 40px;
  @media (max-width: 40em) {
    padding: 10px;
  }
`;

/** Floating infobox container */
export const infoboxWrapper = `
  float: right;
  margin-left: 20px;
  margin-bottom: 5px;
  max-width: 400px;
  @media (max-width: 600px) {
    width: 100%;
    margin: 10px auto 20px;
  }
`;

/** Circular author avatar thumbnail */
export const authorAvatar = `
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
`;

/** Author byline heading (h3) */
export const authorByline = `
  margin: 0;
  display: inline-block;
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  padding: 5px 0 0;
  color: #000000;
  a {
    text-decoration: none;
    color: #0080c6;
    background-color: #ffffff;
  }
  a:hover {
    text-decoration: underline;
  }
`;

/** Date line below the byline */
export const dateLine = `
  margin: 0;
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
`;

/** Corrections banner */
export const corrections = `
  font-size: 12px;
  font-family: ${globals.bodyFont};
  color: ${globals.darkGray};
  max-width: 640px;
  margin: 20px auto 0;
`;

/** Main article content body */
export const contentBody = `
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  text-align: left;
  line-height: 1.75;
  color: #000000;
  display: block;
  max-width: 640px;
  margin: auto;

  & aside {
    background-image: url(../../img/quotationmark4.svg);
    background-repeat: no-repeat;
    background-position: 5px 0;
    background-size: 50px;
    float: right;
    width: 60%;
    padding: 9px 0.5rem 0.5rem 27px;
    min-width: 150px;
    font-family: "Playfair Display", serif;
    font-size: 1.1rem;
    color: #000;
  }

  & img {
    max-width: 100%;
  }

  & aside p {
    font-size: 0.95rem;
    text-align: right;
    margin-top: 0.5rem;
  }
  & aside:first-letter {
    float: left;
    font-size: 4.1rem;
    line-height: 80%;
    color: #000;
  }

  & figure.alignright {
    float: right;
    margin-right: 0;
  }
  & figure.aligncenter {
    max-width: 100% !important;
    margin: auto;
    width: 100% !important;
  }

  & figure figcaption {
    color: gray;
    font-size: 0.85rem;
  }

  & iframe {
    width: 100%;
  }

  & .maxWidth {
    width: calc(100% + 240px);
    margin: 10px -120px;
  }
  & figure img,
  & figure a img,
  & p img,
  & b img,
  & h2 img {
    width: 100%;
    height: inherit;
  }

  & .flex-video,
  & twitter-widget {
    margin: auto !important;
  }

  & .flex-video div iframe,
  & div div .twitter-tweet {
    max-width: 100% !important;
    min-width: unset !important;
    margin: auto !important;
  }

  @media (max-width: 40em) {
    & aside {
      width: 100%;
    }
    & figure {
      width: 100% !important;
      padding: 20px 0;
      margin: auto;
    }
  }

  /* For in-content ads */
  & .flytead {
    position: relative;
    width: 100%;
    background-color: #e8e8e8ff;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    padding: 15px 15px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }

  /* "ADVERTISEMENT" label above the ad, centered */
  & .flytead::before {
    content: "ADVERTISEMENT";
    width: 100%;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    color: #888;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    position: relative;
    top: 0;
  }
`;

/** Author card wrapper with vertical spacing */
export const authorCardWrapper = `
  margin: 20px 0;
`;

/** Author cards container at the bottom of the article */
export const authorCardsContainer = `
  max-width: 600px;
  margin: auto;
`;
