import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import InFocusLogo from "./infocus.png";
import * as utilities from "./utilities";
import dayjs from "dayjs";

export default function Header(props) {
  let authorPictures = [];
  for (let author of props.photographers) {
    authorPictures.push(
      <a href={`/author/${author.slug}`}>
        <img
          src={
            author.simple_local_avatar != null
              ? author.simple_local_avatar.full
              : author.avatar_urls[512]
          }
          css={css`
            height: 48px;
            width: 48px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
            object-fit: cover;
            object-position: center;
          `}
        />
      </a>
    );
  }

  return (
    <div
      css={css`
        width: 100%;
        background-color: #fff;
        padding: ${globals.cardPadding};
        display: table;

        @media (max-width: 600px) {
          display: block;
        }
      `}
    >
      <div
        css={css`
          padding-bottom: 4px;
          border-bottom: solid black 1px;
        `}
      >
        <a
          href="/category/infocus"
          css={css`
            display: table-cell;
            vertical-align: middle;
            padding-right: 10px;
            @media (max-width: 600px) {
              display: block;
              padding-right: none;
              text-align: center;
            }
          `}
        >
          <img
            src={InFocusLogo}
            css={css`
              display: inline-block;
              height: 100%;
              max-height: 64px;
            `}
          ></img>
        </a>
        <h1
          css={css`
            font-family: ${globals.headlineFont};
            display: table-cell;
            vertical-align: middle;
            padding-left: 10px;
            margin: 0 auto;
            font-size: 1.5rem;
            @media (max-width: 600px) {
              display: block;
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        ></h1>
      </div>
      <div
        css={css`
          padding: 10px 10px 0;
        `}
      >
        {authorPictures}
        <div style={{ display: "inline-block", verticalAlign: "middle" }}>
          <h3
            css={css`
              margin: 0;
              display: inline-block;

              font-family: ${globals.bodyFont};
              font-style: normal;
              font-weight: bold;
              font-size: 18px;
              line-height: 21px;
              padding: 5px 0 0;

              color: #000000;

              a {
                text-decoration: none;
                color: #0080c6;
                background-color: #ffffff;
              }
              a:hover {
                text-decoration: underline;
              }
            `}
          >
            By {utilities.renderPhotographers(props.photographers)}
          </h3>
          <h4
            css={css`
              margin: 0;
              font-family: ${globals.bodyFont};
              font-style: normal;
              font-weight: 300;
              font-size: 12px;
              line-height: 15px;
            `}
          >
            {dayjs(props.date).format("MMM D, YYYY h:mm a")}
          </h4>
        </div>
      </div>
    </div>
  );
}