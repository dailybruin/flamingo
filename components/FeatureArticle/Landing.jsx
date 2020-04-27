import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import logo from "./dailybruin.svg";
import * as globals from "../globals";
import { renderAuthors } from "./utilities";

export default function Landing(props) {
  return (
    <div
      css={css`
        height: 100vh;
        width: 100%;
        min-width: 100px;
        background-image: url(${props.img});
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: flex-end;
      `}
    >
      <div
        css={css`
          padding: 20px;

          color: #fff;
          background: rgb(0, 0, 0);
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        `}
      >
        <div
          css={css`
            font-family: ${globals.headlineFont};
            font-style: normal;
            font-weight: 700;
            font-size: 40px;
            line-height: 1.25;
            @media (max-width: 600px) {
              font-size: 30px;
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        />
        <div
          css={css`
            font-family: ${globals.bodyFont};
            font-style: normal;
            font-weight: 300;
            font-size: 20px;
            margin-left: 5px;
            @media (max-width: 600px) {
              font-size: 16px;
            }

            a {
              color: white !important;
            }
          `}
        >
          By {renderAuthors(props.authors)}
        </div>
      </div>
    </div>
  );
}
