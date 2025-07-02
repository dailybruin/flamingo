import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import logo from "./db.png";
// import minilogo from "../../public/favicons/favicon-194x194.png";
import * as globals from "../globals";

export default function Tag(props) {
  return (
    <div
      css={css`
        position: absolute;
        top: 10px;
        right: 10px;
        width: 100px;
        height: 100px;
        padding: 2px;
        @media (max-width: 600px) {
          width: 50px;
          height: 50px;
        }
      `}
    >
      <a href="/">
        <img
          css={css`
            width: 100%;
            height: 100%;
          `}
          src={logo}
        ></img>
      </a>
    </div>
  );
}
