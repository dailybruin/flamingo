/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as globals from "../../globals";
import {
  ACTION_HEIGHT,
  ACTION_WIDTH,
  menuLinkStyles,
  inlineBlockVerticalMiddle,
  whiteSpaceNowrap,
  outlineNone,
  absoluteTopRight,
  Z_INDEX_SEARCH_INPUT,
  Z_INDEX_SEARCH_ICON,
  Z_INDEX_SEARCH_SUBMIT
} from "../shared/styles";

// Mobile-specific constants
export const MOBILE_SEARCH_EXPANDED_WIDTH = "calc(100vw - 64px)";
export const MOBILE_LOGO_WIDTH = "180px";
export const MOBILE_LOGO_HEIGHT = "32px";

// Re-export shared constants for convenience
export {
  ACTION_HEIGHT,
  ACTION_WIDTH,
  menuLinkStyles,
  inlineBlockVerticalMiddle,
  whiteSpaceNowrap,
  outlineNone,
  absoluteTopRight,
  Z_INDEX_SEARCH_INPUT,
  Z_INDEX_SEARCH_ICON,
  Z_INDEX_SEARCH_SUBMIT
};

export const mastheadContainerStyles = css`
  background: ${globals.white};
  box-shadow: ${globals.cardShadow};
  transition: height 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 6px -6px;
`;

export const headerRowStyles = css`
  display: table;
  width: 100%;
  text-align: center;
  padding: 6px 12px;
`;

export const menuButtonStyles = css`
  display: table-cell;
  vertical-align: middle;
  border: none;
  padding: 4px;
  cursor: pointer;
  background-color: transparent;
  ${outlineNone};
  height: ${ACTION_HEIGHT};
  width: ${ACTION_WIDTH};
  transition: transform 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
`;

export const logoCellStyles = css`
  display: table-cell;
  text-align: center;
  width: 100%;
  ${whiteSpaceNowrap};
`;

export const logoLinkStyles = css`
  display: inline-block;
  vertical-align: middle;
  height: ${MOBILE_LOGO_HEIGHT};
  padding: 4px 0;
  position: relative;
  width: ${MOBILE_LOGO_WIDTH};
`;

export const searchCellStyles = css`
  display: table-cell;
  vertical-align: middle;
`;

export const searchContainerStyles = css`
  ${inlineBlockVerticalMiddle};
  position: relative;
  transition: all 500ms;
  height: ${ACTION_HEIGHT};
  width: ${ACTION_WIDTH};
`;

export const searchInputStyles = css`
  ${absoluteTopRight(Z_INDEX_SEARCH_INPUT)};
  height: ${ACTION_HEIGHT};
  background-color: ${globals.black};
  color: ${globals.black};
  resize: none;
  transition: width 500ms cubic-bezier(0.25, 0.8, 0.25, 1),
    color 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 0;
  padding: 0;
  border: none;
  ${outlineNone};
  line-height: ${ACTION_HEIGHT};
  font-size: 18px;
  font-family: ${globals.menuFont};
  font-weight: bold;
  &:focus {
    width: ${MOBILE_SEARCH_EXPANDED_WIDTH};
    padding: 0 ${ACTION_WIDTH} 0 6px;
    color: ${globals.white};
  }
  &:focus + button {
    display: block;
  }
  &:focus + button + #Masthead__SearchIconBox {
    background-color: #000;
  }
`;

export const searchSubmitButtonStyles = css`
  ${absoluteTopRight(Z_INDEX_SEARCH_SUBMIT)};
  width: ${ACTION_WIDTH};
  height: ${ACTION_HEIGHT};
  border: none;
  padding: 6px;
  cursor: pointer;
  color: ${globals.white};
  ${outlineNone};
  display: none;
  background-color: ${globals.black};
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: 6px;
  &:hover {
    display: block;
  }
  &:hover ~ input {
    width: 250px;
    padding: 0 ${ACTION_WIDTH} 0 6px;
    color: ${globals.white};
  }
  &:focus {
    ${outlineNone};
    display: block;
  }
`;

export const searchIconBoxStyles = css`
  ${absoluteTopRight(Z_INDEX_SEARCH_ICON)};
  border: none;
  padding: 4px;
  height: ${ACTION_HEIGHT};
  width: ${ACTION_WIDTH};
  cursor: pointer;
  background-color: transparent;
  ${outlineNone};
`;

export const menuDropdownStyles = (height) => css`
  position: absolute;
  margin: 0px;
  background-color: ${globals.white};
  padding: 0 6px;
  height: ${height};
  overflow-y: scroll;
  width: 100%;
  transition: height 500ms;
`;

export const categoriesColumnStyles = css`
  vertical-align: top;
  display: inline-block;
  width: 60%;
  padding: 6px;
`;

export const categoryLinkStyles = css`
  display: block;
  text-align: left;
  padding: 8px 4px;
  font-family: ${globals.menuFont};
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  color: ${globals.black};
  &:hover {
    text-decoration: underline;
  }
`;

export const socialColumnStyles = css`
  vertical-align: top;
  display: inline-block;
  width: 40%;
  padding: 6px;
  text-align: center;
  font-family: ${globals.menuFont};
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  text-transform: uppercase;
  color: ${globals.black};
  a:hover {
    text-decoration: underline;
  }
`;

export const socialLinkStyles = css`
  display: block;
  padding: 8px 4px;
`;
