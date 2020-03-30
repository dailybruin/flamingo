import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";

export default function Vert(props) {
  return (
    <div
      css={css`
        display: block;
        padding: 10px;
        box-shadow: ${globals.cardShadow};
        background-color: #ffffff;
      `}
    >
      <a href={props.as} style={{ textDecoration: "none" }}>
        <img
          css={css`
            width: 100%;
            margin: auto;
          `}
          src={props.imageurl}
        />
      </a>
      <h4
        css={css`
          margin: 2px 0;

          font-family: Arimo;
          font-style: normal;
          font-weight: normal;
          font-size: 8px;
          text-align: right;

          color: #000000;
        `}
      >
        {props.photographer}
      </h4>
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
              margin: 0;
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
            line-height: 14px;
          `}
        >
          {moment(props.date).format("MMMM Do, h:mma")}
        </span>
      </span>
      <a href={props.as} style={{ textDecoration: "none" }}>
        <div
          css={css`
            margin: 2px 0 4px;
            ${locals.headline}
          `}
          dangerouslySetInnerHTML={{ __html: props.headline }}
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

          font-family: Arimo;
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
