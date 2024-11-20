import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as MainSiteStyles from "../globals";

export default function FooterLink(props) {
  return (
    <a
      css={css`
        margin-right: 15px;
        text-decoration: none;
        color: inherit;

        ${MainSiteStyles.phone} {
          margin: auto;
        }
      `}
      href={props.url}
    >
      {props.text}
    </a>
  );
}
