import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

import facebook from "./facebook.svg";
import twitter from "./twitter.svg";
import reddit from "./reddit.svg";
import mail from "./mail.svg";

export default function ShareButtons(props) {
  return (
    <div
      css={css`
        font-family: ${globals.menuFont};
        font-weight: 700;
        margin: auto;
        text-align: center;
        & a {
          display: inline-block;
          vertical-align: middle;
          padding: 4px 8px;
          font-size: 12px;
          margin: 5px;
          border-radius: 5px;
          color: #fff;
          min-width: 80px;
          text-align: left;
          @media (max-width: 450px) {
            width: 40%;
          }
          &:hover span {
            text-decoration: underline;
          }
        }
        & a img {
          display: inline-block;
          height: 16px;
          vertical-align: middle;
          margin-right: 6px;
        }
        & a span {
          display: inline-block;
          line-height: 24px;
          vertical-align: middle;
        }
      `}
    >
      <span
        css={css`
          font-size: 14px;
          padding: 0 10px;
          @media (max-width: 450px) {
            display: block;
          }
        `}
      >
        Share this story:
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
          props.url
        )}`}
        target="_blank"
        rel="noopener"
        css={css`
          background-color: #3b5998;
        `}
      >
        <img src={(facebook && facebook.src) || facebook} width={16} height={16} loading="lazy" />
        <span>Facebook</span>
      </a>
      <a
        href={`https://www.twitter.com/intent/tweet?url=${encodeURI(
          props.url
        )}`}
        target="_blank"
        rel="noopener"
        css={css`
          background-color: #1da1f2;
        `}
      >
        <img src={(twitter && twitter.src) || twitter} width={16} height={16} loading="lazy" />
        <span>Twitter</span>
      </a>
      <a
        href={`http://www.reddit.com/submit?url=${encodeURI(
          props.url
        )}&title=${encodeURI(props.title)}`}
        target="_blank"
        rel="noopener"
        css={css`
          background-color: #ff5700;
        `}
      >
        <img src={(reddit && reddit.src) || reddit} width={16} height={16} loading="lazy" />
        <span>Reddit</span>
      </a>
      <a
        href={`mailto:?body=${encodeURI(props.url)}&subject=${encodeURI(
          props.title
        )}`}
        target="_blank"
        rel="noopener"
        css={css`
          background-color: #b23121;
        `}
      >
        <img src={(mail && mail.src) || mail} width={16} height={16} loading="lazy" />
        <span>Email</span>
      </a>
    </div>
  );
}
