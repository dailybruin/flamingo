import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import InFocusLogo from "./infocus.png";

export default function Header(props) {
  return (
    <div
      css={css`
        width: 100%;
        background-color: #fff;
        box-shadow: ${globals.cardShadow};
        padding: ${globals.cardPadding};
        display: table;

        @media (max-width: 600px) {
          display: block;
        }
      `}
    >
      <a
        href="/category/spectrum"
        css={css`
          display: table-cell;
          vertical-align: middle;
          border-right: 4px solid black;
          padding-right: 10px;
          @media (max-width: 600px) {
            display: block;
            border-right: none;
            padding-right: none;
            text-align: center;
          }
        `}
      >
        <img
          src={InFocusLogo}
          css={css`
            display: inline-block;
            height: 100%;
            max-height: 64px;
          `}
        ></img>
      </a>
      <h1
        css={css`
          font-family: ${globals.headlineFont};
          display: table-cell;
          vertical-align: middle;
          padding-left: 10px;
          margin: 0 auto;
          font-size: 1.5rem;
          @media (max-width: 600px) {
            display: block;
          }
        `}
        dangerouslySetInnerHTML={{ __html: props.headline }}
      ></h1>
    </div>
  );
}
