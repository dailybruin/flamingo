import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
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

          /* Google results layout */
          .gsc-results-wrapper-nooverlay.gsc-results-wrapper-visible * {
            max-width: 100%;
          }

          /* --- Google Custom Search typography --- */

          /* result title */
          .gsc-results-wrapper-nooverlay.gsc-results-wrapper-visible .gs-title {
            font-family: ${globals.headlineFont} !important;
            font-weight: ${globals.boldFont} !important;
          }

          /* result snippet */
          .gsc-results-wrapper-nooverlay.gsc-results-wrapper-visible
            .gs-bidi-start-align.gs-snippet {
            font-family: ${globals.bodyFont} !important;
            font-size: ${globals.bodyTextSize};
            line-height: ${globals.bodyLineHeight};
            font-weight: ${globals.regularFont};
          }

          /* result URL breadcrumb */
          .gsc-results-wrapper-nooverlay.gsc-results-wrapper-visible
            .gs-bidi-start-align.gs-visibleUrl.gs-visibleUrl-breadcrumb {
            font-family: ${globals.bodyFont} !important;
            font-weight: ${globals.regularFont};
          }
        `}
      >
        <div
          css={css`
            padding-left: 10px;
            font-family: ${globals.bodyFont} !important;
            font-size: 0.8em;
            font-weight: ${globals.boldFont};

          `}
        >
          Search: {this.props.query}
        </div>

        <div className="gcse-searchresults-only"></div>
      </div>
    );
  }
}
