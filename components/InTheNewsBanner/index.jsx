import * as React from "react";
import Link from "next/link";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class InTheNewsBanner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let renderedStories = [];
    for (let i in this.props.stories) {
      renderedStories.push(
        <a
          href={this.props.stories[i].href}
          key={i}
          css={css`
            display: inline-block;
            vertical-align: middle;
            padding: 2px 5px;
            font-family: ${globals.bodyFont};
            font-weight: 700;
            color: #000;
            text-decoration: none;
            &:hover {
              color: ${globals.DBblue};
              text-decoration: none;
            }
          `}
          dangerouslySetInnerHTML={{ __html: this.props.stories[i].name }}
        ></a>
      );
    }

    return (
      <div
        css={css`
          background-color: white;
          width: 100%;
          display: table;
          padding: ${globals.cardPadding};
          box-shadow: ${globals.cardShadow};
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
              background-color: ${globals.DBblue};
              color: white;
              padding: 4px 8px;
              font-family: ${globals.menuFont};
              font-weight: bold;
              margin: 0;
              font-size: 16px;
              white-space: nowrap;
            `}
          >
            IN THE NEWS:
          </h3>
        </div>
        <div
          css={css`
            display: table-cell;
            width: 100%;
            vertical-align: middle;
            padding-left: 5px;
            font-size: 14px;
            margin-top: 5px;
            ${globals.phone} {
              display: block;
              padding: 0 2px 0 2px;
            }
          `}
        >
          {renderedStories}
        </div>
      </div>
    );
  }
}
