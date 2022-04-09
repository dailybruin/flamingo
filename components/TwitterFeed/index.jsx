/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Head from "next/head";

export default function TwitterFeed(props) {
  return (
    <>
      <Head>
        <script async src="https://platform.twitter.com/widgets.js" />
      </Head>
      <div
        css={css`
          ${globals.cardStyles}
          padding: 10px 10px 0;
          min-height: 514px;
          ${props.darkmode ? "filter: brightness(0.6);" : ""}
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
