import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default function TagHeader(props) {
  return (
    <div
      css={css`
        box-shadow: ${globals.cardShadow};
        background-color: white;
        display: block;
        padding: 0 10px 10px;
      `}
    >
      <div
        css={css`
          text-align: center;
          list-style: none;
          color: black;
          font-family: ${globals.menuFont};
          font-weight: bold;
          font-size: 40px;
          text-transform: uppercase;
        `}
        dangerouslySetInnerHTML={{ __html: props.tag }}
      />
      <div
        css={css`
          width: 100%;
          background-color: black;
          height: 1px;
          margin-bottom: 5px;
        `}
      ></div>
      <div
        css={css`
          font-family: ${globals.bodyFont};
          font-size: 14px;
          font-weight: 300;
          text-align: center;
        `}
        dangerouslySetInnerHTML={{ __html: props.explainer }}
      />
    </div>
  );
}
