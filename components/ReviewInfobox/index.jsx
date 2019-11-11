import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import fullStar from "./paw-filled.svg";
import halfStar from "./paw-half-filled.svg";
import emptyStar from "./paw-outline.svg";

export default class ReviewInfobox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const stars = [];
    if (this.props.rating != null) {
      let i = 0;
      for (; i < Math.floor(this.props.rating); i++) {
        stars.push(<img src={fullStar} />);
      }
      if (this.props.rating % 1 === 0.5) {
        stars.push(<img src={halfStar} />);
        i += 1.5;
      }
      for (; i < 5; i++) {
        stars.push(<img src={emptyStar} />);
      }
    }
    return (
      <div
        css={css`
          padding: 0;
          background: #ffffff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          display: inline-block;
        `}
      >
        <div
          css={css`
            left: 0;
            right: 0;

            margin: 0;
            padding: 4px 8px;

            min-height: 36px;
            background-color: #000000;

            color: #ffffff;

            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 36px; /* identical to box height */
            align-items: center;
          `}
        >
          {this.props.title}
        </div>
        <div
          css={css`
            padding: 4px 8px;
          `}
        >
          <div css={css``}>
            <p
              css={css`
                margin: 0;
                padding: 0;
              `}
            >
              <b>{this.props.subtext1}</b>
            </p>
            <p
              css={css`
                margin: 0;
                padding: 0;
              `}
            >
              {this.props.subtext2}
            </p>
            <p
              css={css`
                margin: 0;
                padding: 0;
              `}
            >
              {this.props.subtext3}
            </p>
          </div>
          <div
            css={css`
              text-align: center;
              padding-top: 2px;
            `}
          >
            {stars}
          </div>
        </div>
      </div>
    );
  }
}
