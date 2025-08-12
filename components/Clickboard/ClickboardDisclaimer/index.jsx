import * as React from "react";
import Link from "next/link";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../../globals";

export default class ClickboardDisclaimer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        css={css`
          background-color: white;
          width: 100%;
          display: flex;
          justify-content: center;
          padding: ${globals.cardPadding};
          box-shadow: ${globals.cardShadow};
        `}
      >
        <i>
          We independently review all recommendations. When you buy through our
          links, we may receive a commission.
        </i>
      </div>
    );
  }
}
