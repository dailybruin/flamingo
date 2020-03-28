import { css } from "@emotion/core";

/** Web fonts loaded here - only in a browser */
if (typeof window !== "undefined") {
  // tslint:disable-next-line:no-var-requires
  const WebFontLoader = require("webfontloader");
  WebFontLoader.load({
    google: {
      families: [
        "Arimo:400",
        "Arimo:700",
        "PT Serif:400",
        "PT Serif:700",
        "Source Sans Pro:400",
        "Source Sans Pro:700",
        "Playfair Display:700"
      ]
    }
  });
}

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
export const headlineFont = "'Arimo', sans-serif";
export const bodyFont = "'PT Serif', serif";
export const blurbFont = "'PT Serif', serif";
export const menuFont = "'Source Sans Pro', sans-serif";

/** Card attributes */
export const cardPadding = "10px";
export const cardShadow = "0px 2px 4px 0px rgba(0,0,0,0.2)";

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
export const table = "@media (max-width: 900px)";

/** Combined themes */
export const bodyTextCSS = css`
  font-size: ${bodyTextSize};
  font-family: ${bodyFont};
`;

/** Common Elements */
export const thumbnailImgCSS = `
  width: 100%;
  padding-top: 66.66%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;`;
