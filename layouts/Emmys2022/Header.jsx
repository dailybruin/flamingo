import React from "react";
import DBLogo from "../AAPI2022/icons/DBLogo.svg";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
export default function Header() {
  return (
    <a href={"https://dailybruin.com"}>
      <div
        css={css`
          z-index: 2001;

          position: fixed;
          background: white;
          width: 100%;
          padding-top: 0.6em;
          color: #8c8ffe;
          font-family: "ITC Century";
          font-style: normal;
          font-weight: 400;
          text-align: center;
          text-transform: uppercase;
          font-size: 22px;
          line-height: 20px;
        `}
      >
        {/* Daily Bruin */}
        <img src={DBLogo} alt="Daily Bruin"></img>
      </div>
    </a>
  );
}
