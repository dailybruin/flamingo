import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import Image from "next/image"; // 1. Import the component

import * as globals from "../globals";

export default function Media(props) {
  return (
    <a
      href={props.link}
      css={css`
        text-decoration: none;
        color: white;
        display: inline-block;
        width: 256px;
        white-space: normal;
        vertical-align: top;

        &:hover {
          text-decoration: underline;
        }
      `}
    >
      <div
        css={css`
          margin: 10px;
        `}
      >
        <div
          css={css`
            position: relative; /* REQUIRED for layout='fill' */
            height: 144px;      /* Keep your fixed height */
            width: 100%;        /* Ensure it fills the card width */
            overflow: hidden;   /* Keeps the image contained if it zooms/moves */
          `}
        >
          <Image
            src={props.preview}
            alt="Multimedia Photo/Artwork"
            sizes="20vw"
            width={props.preview_width}
            height={props.preview_height}
          />
        </div>

        <h1
          css={css`
            margin: 10px 0;
            padding: 0;
            font-size: 1.3rem;
            line-height: 1.15;
            font-family: ${globals.bodyFont};
            font-weight: 700;
          `}
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h1>
      </div>
    </a>
  );
}