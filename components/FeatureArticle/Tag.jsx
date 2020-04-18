import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import logo from "./dailybruin.svg";
import minilogo from "../../public/favicons/favicon-194x194.png";
import * as globals from "../globals";

export default function Tag(props) {
  return (
    <div
      css={css`
        background-color: white;
        display: block;
        box-shadow: ${globals.cardShadow};
        position: absolute;
        top: 0;
        left: 20px;
        padding: 10px 20px;
        @media (max-width: 600px) {
          padding: 7px 12px;
          left: 10px;
        }
      `}
    >
      <a href="/">
        <img
          css={css`
            width: 250px;
            @media (max-width: 600px) {
              width: 150px;
            }
          `}
          src={logo}
        ></img>
      </a>
    </div>
  );
}
