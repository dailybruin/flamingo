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
        display: flex;
        font-size: 0.85rem;
        flex-direction: row;
        padding: 1rem;
        background-color: white;
        font-family: ${MainSiteStyles.headlineFont};
        font-weight: ${MainSiteStyles.boldFont};
        vertical-align: middle;
        margin: 0px 0px 0px 70px;
        ${MainSiteStyles.mediaMobileBreakpoint} {
          flex-direction: column;
        }
      `}
    >
      <div class="sharethis-inline-share-buttons"></div>

      <Head>
        <script
          type="text/javascript"
          src="https://platform-api.sharethis.com/js/sharethis.js#property=5e43439e543af5001235be35&product=inline-share-buttons"
          async="async"
        ></script>
      </Head>
    </card>
  );
}
