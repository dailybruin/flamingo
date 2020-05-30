import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import Media from "./Media";

export default class MultimediaScroller extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const medialinks = [];
    for (const media of this.props.media) {
      medialinks.push(
        <Media title={media.title} preview={media.preview} link={media.link} />
      );
    }
    return (
      <div
        css={css`
          width: 100%;
          padding: 0 20px;
          border-top: 10px solid black;
          background: #474747;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          color: #ffffff;
          box-sizing: border-box;
        `}
      >
        <h3
          css={css`
            margin: 10px 0 0;
            font-size: 14px;
            font-family: "Arimo", sans-serif;
            font-weight: 700;
          `}
        >
          MULTIMEDIA
        </h3>
        <div
          css={css`
            padding-bottom: 15px;
            width: auto;
            white-space: nowrap;
            overflow-x: scroll;
            vertical-align: top;
          `}
        >
          {medialinks}
        </div>
      </div>
    );
  }
}
