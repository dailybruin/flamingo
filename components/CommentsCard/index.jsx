import * as React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { cardShadow, cardPadding, menuFont } from "../globals";
import { DiscussionEmbed } from "disqus-react";

export default function CommentsCard(props) {
  return (
    <div
      css={css`
        box-shadow: ${cardShadow};
        background-color: #ffffff;
      `}
    >
      <div
        css={css`
          background-color: #000000;
          height: 27px;
          padding: 2px 10px 0;

          font-family: ${menuFont};
          font-style: normal;
          font-weight: 900;
          font-size: 18px;
          line-height: 24px;
          text-transform: uppercase;

          color: #ffffff;
        `}
      >
        COMMENTS
      </div>
      <div
        css={css`
          text-align: center;
          padding: 10px 20px;
        `}
      >
        <DiscussionEmbed
          shortname="thedailybruin"
          config={{
            url: props.link,
            identifier: props.id.toString()
          }}
        ></DiscussionEmbed>
      </div>
    </div>
  );
}
