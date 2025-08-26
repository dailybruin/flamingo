import { css } from "@emotion/core";

/** Reusable common CSS attributes */
/** Colors */
export const gray = "rgb(197, 197, 197)";
export const lightGray = "rgb(242, 242, 242)";
export const black = "#000";
export const white = "#fff";
export const darkGray = "rgb(100, 100, 100)";
export const DBblue = "#0080C6";
export const breakingRed = "#CB0000";

/** Font families */
export const headlineFont = "'Helvetica Neue', Arial, sans-serif";
export const bodyFont = "'Open Sans', 'Helvetica Neue', Arial, sans-serif";
export const blurbFont = "'Nunito', 'Helvetica Neue', Arial, sans-serif";
export const menuFont = "'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif";

/** Card attributes */
export const cardPadding = "10px";
export const cardShadow = "none";

/** Font weights */
export const regularFont = 400;
export const boldFont = 700;

/** Font sizes */
export const headlineFontSize = "2em";
export const subInfoFontSize = "1em";
export const smallInfoFontSize = "0.9em";
export const bodyTextSize = "1.1em";
export const bodyLineHeight = "1.45em";

/** CSS breakpoints */
export const phone = "@media (max-width: 600px)";
export const tablet = "@media (max-width: 900px)";

/** Combined themes */
export const bodyTextCSS = css`
  font-size: ${bodyTextSize};
  font-family: ${bodyFont};
`;

/** Common Elements */
export const cardStyles = `
  width: 100%;
  background-color: #fff;
  box-shadow: none;
  padding: ${cardPadding}`;

export const thumbnailImgCSS = `
  width: 100%;
  padding-top: 66.66%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;`;
