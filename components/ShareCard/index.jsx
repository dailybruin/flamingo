import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as MainSiteStyles from "../globals";
import { FacebookShareButton } from "react-share";
import Head from "next/head";

export default function ShareCard(props) {
  return (
    <card
      css={css`
        text-align: center;
        vertical-align: middle;
      `}
    >
      <span
        css={css`
          display: inline-block;
          font-size: 12px;
          font-family: ${MainSiteStyles.menuFont};
          margin: auto;
        `}
      >
        Share this story:
      </span>
      <div
        css={css`
          display: inline-block;
          margin: auto;
          #st-1 .st-btn:hover {
            opacity: 0.8;
            top: inherit;
          }
        `}
      >
        <div class="sharethis-inline-share-buttons"></div>
      </div>

      <Head>
        <script
          type="text/javascript"
          src="https://platform-api.sharethis.com/js/sharethis.js#property=5ed4654750947c001806defb&product=inline-share-buttons"
          async="async"
        ></script>
      </Head>
    </card>
  );
}
