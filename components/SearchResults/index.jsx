import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class SearchResults extends React.Component {
  render() {
    return (
      <div
        css={css`
          background-color: ${this.props.darkmode? "#222" : "#fff"};
          box-shadow: ${globals.cardShadow};
          padding: ${globals.cardPadding};
          font-family: ${globals.menuFont};
          font-weight: bold;
          font-size: 36px;
          color:  ${this.props.darkmode? "#fff" : "#000"};

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
        {/* <div css={css`         
          ${this.props.darkmode ? "filter: brightness(0.6);" : ""} `}>  */}
          <div className="gcse-searchresults-only"></div>
        {/* </div> */}
      </div>
    );
  }
}
