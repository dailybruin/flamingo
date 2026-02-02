/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as globals from "../../globals";

// Shared constants used by both Desktop and Mobile
export const ACTION_HEIGHT = "36px";
export const ACTION_WIDTH = "36px";
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
