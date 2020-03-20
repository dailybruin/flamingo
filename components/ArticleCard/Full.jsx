import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";

export default function Full(props) {
  //  collect authors
  const authors = utilities.collectAuthors(props.authors);
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
        <Link href={props.category.href} as={props.category.as}>
          <a
            href={props.category.as}
            css={css`
              text-decoration: none;
              color: ${globals.DBblue};
              vertical-align: middle;
              margin: 0;
              font-family: Source Sans Pro;
              font-style: normal;
              font-weight: bold;
              font-size: 14px;
              text-transform: uppercase;
              display: inline;
              cursor: pointer;

              &:hover {
                text-decoration: underline;
              }
            `}
          >
            {props.category.name}
          </a>
        </Link>
        <span
          css={css`
            margin: 0;
            vertical-align: middle;
          `}
        >
          &nbsp;|&nbsp;
        </span>
        <span
          css={css`
            margin: 0;
            font-family: Source Sans Pro, sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            vertical-align: middle;
          `}
        >
          {utilities.date2string(props.date)}
        </span>
      </span>
      <Link href={props.href} as={props.as}>
        <a href={props.as} style={{ textDecoration: "none" }}>
          <h1
            css={css`
              margin: 2px 0 4px;
              ${locals.headline}
            `}
            dangerouslySetInnerHTML={{ __html: props.headline }}
          />
          <img
            css={css`
              width: 100%;
              margin: auto;
            `}
            src={props.imageurl}
          />
          <h4
            css={css`
              margin: 2px 0;

              font-family: Arimo;
              font-style: normal;
              font-weight: normal;
              font-size: 10px;
              text-align: justify;

              color: #000000;
            `}
            dangerouslySetInnerHTML={{ __html: props.caption }}
          />
          <p
            css={css`
              margin: 0 0 5px;
              ${locals.excerpt}
            `}
            dangerouslySetInnerHTML={{ __html: props.excerpt }}
          />
        </a>
      </Link>
      <h3
        css={css`
          margin: 0;

          font-family: Arimo;
          font-style: normal;
          font-weight: bold;
          font-size: 11px;

          color: #000000;
        `}
      >
        By {authors}
      </h3>
    </div>
  );
}
