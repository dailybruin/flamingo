import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";

export default function Video(props) {
  return (
    <div
      css={css`
        display: block;
        padding: 10px;
        box-shadow: ${globals.cardShadow};
        background-color: ${props.darkmode ? "#222" : "#fff"};
        height: 100%;
      `}
    >
     
      <a href={props.as} style={{ textDecoration: "none" }}>
        <div
          css={css`
            width: 100%;
            margin: auto;
            padding-top: 56.25%;
            position: relative;
          `}
        >
          <img
            src={props.imageurl}
            css={css`
              object-fit: cover;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            `}
          />
        </div>
      </a>
    
      <h4
        css={css`
          margin: 2px 0;

          font-family: Arimo;
          font-style: normal;
          font-weight: normal;
          font-size: 8px;
          text-align: right;

          color: ${props.darkmode ? "#ddd" : "#000"};
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
            border-left: 1px solid ${props.darkmode ? "#ddd" : "#000"};
            margin: 0;
            padding-left: 4px;
            font-family: ${globals.bodyFont};
            font-style: normal;
            font-weight: 300;
            font-size: 11px;
            line-height: 14px;
            color: ${props.darkmode ? "#ddd" : "#000"};
          `}
        >
          {moment(props.date).format("MMM D, YYYY h:mm a")}
        </span>
      </span>
      <a href={props.as} style={{ textDecoration: "none" }}>
        <div
          css={css`
            margin: 2px 0 4px;
            ${props.darkmode ? locals.darkheadline : locals.headline};
          `}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        />
        <div
          css={css`
            margin: 0 0 5px;
            ${props.darkmode ? locals.darkexcerpt : locals.excerpt}
          `}
          dangerouslySetInnerHTML={{ __html: props.excerpt }}
        />
      </a>
      <h3
        css={css`
          margin: 0;

          font-family: ${globals.bodyFont};
          font-style: normal;
          font-weight: 700;
          font-size: 11px;

          color: ${props.darkmode ? "#ddd" : "#000"};;
        `}
      >
        By {utilities.renderAuthors(props.authors)}
      </h3>
    </div>
  );
}
