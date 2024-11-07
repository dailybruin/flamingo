import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";

import * as globals from "../globals";

export default function Media(props) {
  return (
    <a
      href={props.link}
      css={css`
        text-decoration: none;
        color: white;
        display: inline-block;
        width: 256px;
        white-space: normal;
        vertical-align: top;

        &:hover {
          text-decoration: underline;
        }
      `}
    >
      <div
        css={css`
          margin: 10px;
        `}
      >
        <div
          css={css`
            height: 144px;
            background: url(${props.preview});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          `}
        />
        <h1
          css={css`
            margin: 10px 0;
            padding: 0;
            font-size: 1.3rem;
            line-height: 1.15;
            font-family: ${globals.bodyFont};
            font-weight: 700;
          `}
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h1>
      </div>
    </a>
  );
}
