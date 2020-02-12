import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class InTheNews extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let renderedStories = [];
    for (let i = 0; i < this.props.stories.length; i++) {
      renderedStories.push(
        <a
          href={this.props.stories[i].href}
          css={css`
            display: inline-block;
            vertical-align: middle;
            padding: 5px;
            font-family: ${globals.headlineFont};
            font-weight: bold;
            color: #000;
            text-decoration: none;
            &:hover {
              color: ${globals.DBblue};
              text-decoration: none;
            }
          `}
        >
          {this.props.stories[i].name}
        </a>
      );
    }

    return (
      <div
        css={css`
          background-color: white;
          display: block;
          padding: ${globals.cardPadding};
          box-shadow: ${globals.cardShadow};
        `}
      >
        <li
          css={css`
            background-color: ${globals.DBblue};
            display: inline-block;
            vertical-align: middle;
            color: white;
            padding: 4px 8px;
            font-family: ${globals.menuFont};
            font-weight: bold;
            margin: 0;
          `}
        >
          IN THE NEWS:
        </li>
        {renderedStories}
      </div>
    );
  }
}
