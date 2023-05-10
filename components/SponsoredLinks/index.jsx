import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class SponsoredLinks extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        css={css`
          background: #fff;
          box-shadow: ${globals.cardShadow};
          padding: 10px;
          width: 100%;
        `}
      >
        <h1
          css={css`
            font-family: ${globals.menuFont};
            font-size: 18px;
            margin: 0 0 4px;
          `}
        >
          SPONSORED LINKS:
        </h1>
        <div
          css={css`
            font-family: ${globals.menuFont};
            font-size: 13px;
            list-style: none;
            column-count: 3;
            a {
              color: ${globals.DBblue};
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline;
            }
            @media (max-width: 900px) {
              column-count: 2;
            }
          `}
          dangerouslySetInnerHTML={{
            __html: this.props.links
          }}
        ></div>
      </div>
    );
  }
}
