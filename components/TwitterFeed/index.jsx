/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Script from "next/script";

export default function TwitterFeed(props) {
  return (
    <>
       <Script
        strategy="afterInteractive"
        src="https://platform.twitter.com/widgets.js"
        async
        />
      <div
        css={css`
          ${globals.cardStyles}
          padding: 10px 10px 0;
          min-height: 514px;
        `}
      >
        <a
          className="twitter-timeline"
          data-height="500"
          href="https://twitter.com/dailybruin?ref_src=twsrc%5Etfw"
        >
          Tweets by dailybruin
        </a>
      </div>
    </>
  );
}
