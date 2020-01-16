import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { headlineFont, cardShadow, regularFont, bodyFont } from "../globals";
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
          box-shadow: ${cardShadow};
          background-color: #ffffff;
        `}
      >
        <div
          css={css`
            font-family: PT Serif;
            font-style: normal;
            font-weight: normal;

            color: #000000;
            margin: auto;
            display: block;

            & h1,h2,h3,h4 {
              font-family: 'Arimo', sans-serif
            }

            & p {
              font-size: 1rem;
            }
          `}
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
        <p css={css`
            font-style: oblique;
            `}>
          This page last updated: {date2string(this.props.date)}
        </p>
      </div>
    );
  }
}
