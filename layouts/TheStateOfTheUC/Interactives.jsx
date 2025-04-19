import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";

export function UCFundingModel() {
  return (
    <iframe
      height="500"
      frameborder="0"
      src="https://dailybruin.com/wp-content/themes/caeruleum/js/interactives/5.9.news.tagpage-national-longterm/5_3_news_tagpage-national-longterm"
    ></iframe>
  );
}

export default function UCEnrollment() {
  return (
    <div
      css={css`
        display: block;
        text-align: center;
        background-color: lightcyan;
      `}
    >
      <iframe
        width="95%"
        height="700"
        frameborder="0"
        src="https://dailybruin.com/wp-content/themes/caeruleum/js/interactives/5.9.news.tagpage-national-longterm/5_3_news_tagpage-national-longterm1"
      ></iframe>
    </div>
  );
}
