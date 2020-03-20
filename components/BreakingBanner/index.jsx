import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class BreakingBanner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        css={css`
          background-color: white;
          padding: ${globals.cardPadding};
          box-shadow: ${globals.cardShadow};
          display: table;
          width: 100%;
        `}
      >
        <div
          css={css`
            display: table-cell;
            vertical-align: top;

            ${globals.phone} {
              display: block;
            }
          `}
        >
          <h3
            css={css`
              background-color: ${globals.breakingRed};
              color: white;
              padding: 4px 8px;
              font-family: ${globals.menuFont};
              font-weight: bold;
              margin: 0;
              font-size: 16px;
              white-space: nowrap;
            `}
          >
            BREAKING:
          </h3>
        </div>
        <div
          css={css`
            display: table-cell;
            padding-left: 10px;
            vertical-align: middle;
            width: 100%;

            ${globals.phone} {
              display: block;
              padding: 8px 2px 0 2px;
            }
          `}
        >
          <a
            href={this.props.story.href}
            css={css`
              font-size: 16px;
              font-family: ${globals.headlineFont};
              font-weight: bold;
              color: #000;
              text-decoration: none;
              &:hover {
                color: ${globals.DBblue};
                text-decoration: none;
              }
            `}
            dangerouslySetInnerHTML={{ __html: this.props.story.name }}
          ></a>
        </div>
      </div>
    );
  }
}
