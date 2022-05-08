import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";
import FooterImage from './footer.jpg';
import Instagram from './icons/Instagram.png';
import Facebook from './icons/Facebook.png';
import Twitter from './icons/Twitter.png';
import TikTok from './icons/TikTok.png';
import Mail from './icons/Mail.png';
import { useNavigate } from 'react-router-dom';

function IconButton(props) {
    function handleClick() {
        window.location = 'http://dailybruin.com';
    }
    return (
        <div>
            <button
                css = {css`
                    background-color: transparent;
                    border-color: transparent;
                `}
                onClick={handleClick}
            >
                <img src={props.type}/>
            </button>
        </div>
    )
}

export default function AAPIFooter() {
    const ls = [Instagram, Facebook, Twitter, TikTok, Mail];
    return (
      <div
        css={css`
          background-image: url(${FooterImage});
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          height: 400px;
          width: 100vw;
        `}
      >
          <div
            css={css`
                display: flex;
                flex-direction: row;
                justify-content: center;
                padding-top: 180px;
            `}
          >
              {ls.map((e) => (
                  <IconButton type={e}/>
              ))}
          </div>
          <div
            css={css`
            display: flex;
            flex-direction: row;
            justify-content: center;
            color: white;
            padding-top: 30px;
            `}
          >
              Built with Suzy's Love in Kerchoff 118 by [developers]. Designed by [designers].
          </div>
      </div>
    )
  }