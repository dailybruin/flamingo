import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";

export default function VideoCard(props) {
  return (
    <div
      css={css`
        display: block;
        padding: 10px;
        box-shadow: ${globals.cardShadow};
        background-color: #fff;
      `}
    >
      <span>
        <a
          href={props.category.as}
          css={css`
            text-decoration: none;
            color: ${globals.DBblue};
            vertical-align: middle;

            &:hover {
              text-decoration: underline;
            }
          `}
        >
          <h2
            css={css`
              margin: 0 4px 0 0;
              font-family: Source Sans Pro;
              font-style: normal;
              font-weight: bold;
              font-size: 14px;
              text-transform: uppercase;
              display: inline;
            `}
          >
            {props.category.name}
          </h2>
        </a>
        <span
          css={css`
            border-left: 1px solid #000;
            margin: 0;
            padding-left: 4px;
            font-family: ${globals.bodyFont};
            font-style: normal;
            font-weight: 300;
            font-size: 11px;
            line-height: 14px;
          `}
        >
          {moment(props.date).format("MMM Do, h:mma")}
        </span>
      </span>
      <a href={props.as} style={{ textDecoration: "none" }}>
        <div
          css={css`
            margin: 2px 0 6px;
            ${props.darkmode ? locals.darkheadline : locals.headline};
          `}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        />
        <div
          css={css`
            div div iframe {
              ${props.darkmode ? "filter: invert(1);" : ""}              
              width: 100%;
              //padding-top: 100%;
              //height: 0;
            }
            p {
              ${props.darkmode ? locals.darkexcerpt : locals.excerpt}
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
      </a>
      <h3
        css={css`
          margin: 0;

          font-family: ${globals.bodyFont};
          font-style: normal;
          font-weight: bold;
          font-size: 11px;

          color: #000;
        `}
      >
        By {utilities.renderAuthors(props.authors)}
      </h3>
    </div>
  );
}
