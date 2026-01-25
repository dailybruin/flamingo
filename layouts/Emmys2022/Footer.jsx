import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";
import dblogo from "./dblogo.svg"
import Instagram from "../AAPI2022/icons/Instagram.png";
import Facebook from "../AAPI2022/icons/Facebook.png";
import Twitter from "../AAPI2022/icons/Twitter.png";
import TikTok from "../AAPI2022/icons/TikTok.png";
import Mail from "../AAPI2022/icons/Mail.png";
// import { useNavigate } from 'react-router-dom'; comment out for now bc not currently used. TODO: Uncomment and add to yarn pkgs once we need it.

function IconButton(props) {
  function handleClick() {
    window.location = "http://dailybruin.com";
  }
  return (
    <div>
      <button
        css={css`
          background-color: transparent;
          border-color: transparent;
        `}
        onClick={handleClick}
      >
        <img src={props.type} />
      </button>
    </div>
  );
}

export default function AAPIFooter() {
  const ls = [Instagram, Facebook, Twitter, TikTok, Mail];
  return (
    <div
      css={css`
        background-color: #A552D1;
        display: block;
        min-height: 30vh;
        color: white;
        font-size: 5vh;
        margin: auto;
        @media all and (max-width: 800px) {
          min-height: 15vh;
        }
      `}
    >
      <img 
        src={dblogo.src}
        css={css`
          padding-top: 5%;
          display: block;
          width: 20%;
          margin: auto;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          padding-top: 20px;
        `}
      >
        {ls.map(e => (
          <IconButton type={e.src} />
        ))}
        </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          font-size: 14px;
          padding-top: 30px;
          padding-bottom: 50px;
        `}
      >
        Built with Suzy's Love in Kerchoff 118 by Kaylyn. 
        Designed by Tang.
      </div>
    </div>
  );
}
