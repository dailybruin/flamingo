import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import fullStar from "./paw-filled.svg";
import halfStar from "./paw-half-filled.svg";
import emptyStar from "./paw-outline.svg";
import * as globals from "../globals";

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
          padding: 10px;
          width: 100%;
          background: #fff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          display: inline-block;
          min-width: 250px;
        `}
      >
        <div
          css={css`
            left: 0;
            right: 0;

            margin: 0;
            color: #000;
            font-family: ${globals.menuFont} !important;

            & p,
            & strong {
              margin: 4px 0;
              font-size: 1rem;
            }

            & p:first-of-type,
            & h4 {
              padding: 0 10px;
              margin: -10px -10px 0;
              line-height: 36px;
              min-height: 36px;
              background-color: #000;
              color: #fff;

              font-style: normal;
              font-weight: bold;
              font-size: 20px;
              align-items: center;
            }

            & h4 {
              font-family: ${globals.menuFont};
              text-transform: uppercase;
              margin-bottom: 8px;
            }

            & hr:first-of-type {
              display: none;
            }

            & p:nth-of-type(2) {
              font-weight: bold;
            }
          `}
          dangerouslySetInnerHTML={{ __html: this.props.title }}
        ></div>
        {this.props.rating == 0 || (
          <div
            css={css`
              text-align: center;
              padding-top: 2px;
              padding: 2px 10px 0;
              margin-bottom: -10px;
            `}
          >
            {stars}
          </div>
        )}
      </div>
    );
  }
}
