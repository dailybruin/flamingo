import * as React from "react";
import Link from "next/link";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";
import Image from "next/image";

export default function Full(props) {
  return (
    <div
      css={css`
        display: block;
        padding: 10px;
        box-shadow: ${globals.cardShadow};
        background-color: #ffffff;
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
            dangerouslySetInnerHTML={{ __html: props.category.name }}
          />
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
          {moment(props.date).format("MMM D, YYYY h:mm a")}
        </span>
      </span>
      <a href={props.as} style={{ textDecoration: "none" }}>
        <div
          css={css`
            margin: 2px 0 6px;
            ${locals.headline};
          `}
          style={{
            fontStyle:
              props.acf.db_article_format == "column" ? "italic" : "normal"
          }}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        />
        <Image
          src={props.imageurl}
          alt="Image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', margin: 'auto' }}
        />
        <div
          css={css`
            font-family: ${globals.bodyFont};
            font-style: normal;
            font-weight: normal;
            font-size: 9px;
            text-align: justify;

            p {
              margin: 4px 0;
            }

            color: #000000;
          `}
          dangerouslySetInnerHTML={{ __html: props.caption }}
        />
        <div
          css={css`
            margin: 0 0 5px;
            ${locals.excerpt}
          `}
          dangerouslySetInnerHTML={{ __html: props.excerpt }}
        />
      </a>
      <h3
        css={css`
          margin: 0;

          font-family: ${globals.bodyFont};
          font-style: normal;
          font-weight: bold;
          font-size: 11px;

          color: #000000;
        `}
      >
        By {utilities.renderAuthors(props.authors)}
      </h3>
    </div>
  );
}
