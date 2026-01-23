/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as globals from "../globals";

// Constants
export const expandedHeight = "106px";
export const collapsedHeight = "60px";
export const ACTION_HEIGHT = "36px";
export const ACTION_WIDTH = "36px";
export const SEARCH_EXPANDED_WIDTH = "250px";
export const LOGO_EXPANDED_HEIGHT = "60px";
export const LOGO_COLLAPSED_HEIGHT = "48px";
export const Z_INDEX_SEARCH_INPUT = 10;
export const Z_INDEX_SEARCH_ICON = 11;
export const Z_INDEX_SEARCH_SUBMIT = 12;

// Common utility styles
export const inlineBlockVerticalMiddle = css`
  display: inline-block;
  vertical-align: middle;
`;

export const whiteSpaceNowrap = css`
  white-space: nowrap;
`;

export const outlineNone = css`
  outline: none;
  &:focus {
    outline: none;
  }
`;

export const menuLinkStyles = css`
  font-family: ${globals.menuFont};
  font-weight: bold;
  text-transform: uppercase;
  color: ${globals.black};
  &:hover {
    text-decoration: underline;
  }
`;

export const absoluteTopRight = (zIndex = 0) => css`
  position: absolute;
  right: 0;
  top: 0;
  z-index: ${zIndex};
`;

export const mastheadContainerStyles = (height) => css`
  background: ${globals.white};
  box-shadow: ${globals.cardShadow};
  overflow: hidden;
  height: ${height};
  transition: height 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 6px;
`;

export const headerRowStyles = css`
  padding: 6px 18px;
  display: table;
  table-layout: fixed;
  width: 100%;
  vertical-align: middle;
`;

export const logoContainerStyles = css`
  display: table-cell;
  text-align: center;
  ${whiteSpaceNowrap};
`;

export const logoStyles = (height) => css`
  ${inlineBlockVerticalMiddle};
  height: ${height};
  width: auto;
  padding: 8px 0;
  transition: height 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
  aspect-ratio: 6 / 1;

  @media (max-width: 600px) {
    height: 24px;
  }
`;

export const rightColumnStyles = css`
  display: table-cell;
  text-align: right;
  vertical-align: middle;
  ${whiteSpaceNowrap};
`;

export const actionsContainerStyles = css`
  ${inlineBlockVerticalMiddle};
  position: relative;
  transition: all 500ms;
  height: ${ACTION_HEIGHT};
`;

export const dividerStyles = css`
  padding: 0 12px;
`;

export const dividerLineStyles = css`
  width: 100%;
  height: 1px;
  background-color: ${globals.black};
`;

export const categoriesContainerStyles = css`
  background-color: ${globals.white};
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
