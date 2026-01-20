import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Image from "next/image";

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
      <Image
        src={loadingbear}
        alt="Loading"
        width={200}
        height={200}
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
