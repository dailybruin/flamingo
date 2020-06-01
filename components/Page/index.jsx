import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import { date2string } from "./utilities.js";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        css={css`
          display: block;
          padding: 10px 30px;
          box-shadow: ${globals.cardShadow};
          background-color: #ffffff;
          font-family: ${globals.bodyFont};
        `}
      >
        <div
          css={css`
            font-family: ${globals.bodyFont};
            font-style: normal;
            font-weight: normal;
            font-size: 14px;

            color: #000000;
            margin: auto;
            display: block;

            img {
              width: 100%;
            }

            & h1 {
              font-family: ${globals.headlineFont};
            }

            & h2,
            h3,
            h4 {
              font-family: ${globals.bodyFont};
            }

            & p {
              font-size: 14px;
            }
          `}
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
        <p
          css={css`
            font-style: italic;
          `}
        >
          This page last updated: {date2string(this.props.date)}
        </p>
      </div>
    );
  }
}
