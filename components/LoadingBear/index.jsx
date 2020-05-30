import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

import loadingbear from "./loadingbear.png";

export default function LoadingBear(props) {
  return (
    <div
      css={css`
        width: 100%;
        text-align: center;
        margin: 10px auto;
      `}
    >
      <img
        css={css`
          width: 200px;
        `}
        src={loadingbear}
      />
      <p
        css={css`
          font-family: ${globals.menuFont};
          margin: 0;
        `}
      >
        {props.text}
      </p>
    </div>
  );
}
