import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class BreakingCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        css={css`
          display: flex;
          padding: 10px;
          box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
          background-color: #fff;
          align-items: flex-center;
        `}
      >
        <div
          css={css`
            background-color: #cb0000;
            padding: 3px 7px;
          `}
        >
          <h3
            css={css`
              color: #fff;
              font-size: 18px;
              font-family: ${globals.menuFont};
              margin: 0;
            `}
          >
            BREAKING:{" "}
          </h3>
        </div>
        <ul
          css={css`
            display: flex;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;
          `}
        >
          <Link href={this.props.story.href} as={this.props.story.as}>
            <a
              href={this.props.story.as}
              css={css`
                font-weight: bold;
                font-size: 18px;
                font-family: ${globals.headlineFont};
                color: #000;
                text-decoration: none;
                padding-left: 10px;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              {this.props.story.name}
            </a>
          </Link>
        </ul>
      </div>
    );
  }
}
