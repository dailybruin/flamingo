import * as React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as globals from "../globals";

export default class SearchResults extends React.Component {
  render() {
    return (
      <div
        css={css`
          background-color: #fff;
          box-shadow: ${globals.cardShadow};
          padding: ${globals.cardPadding};
          font-family: ${globals.menuFont};
          font-weight: bold;
          font-size: 36px;

          ${globals.phone} {
            font-size: 24px;
          }
        `}
      >
        <div
          css={css`
            padding-left: 10px;
          `}
        >
          search: {this.props.query}
        </div>

        <div className="gcse-searchresults-only"></div>
      </div>
    );
  }
}
