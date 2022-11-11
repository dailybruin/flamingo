import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";

export default function Long(props) {
  return (
    <div
      css={css`
        display: flex;
        box-shadow: ${globals.cardShadow};
        height: 100%;
        padding: 0px;
        background-color: ${JSON.parse(localStorage.getItem('darkmode')) ? "#222" : "#fff"};
      `}
    >
      <div
        css={css`
          padding: 10px;
          flex: 3;
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
              border-left: 1px solid ${JSON.parse(localStorage.getItem('darkmode')) ? "#ddd" : "#000"};
              margin: 0;
              padding-left: 4px;
              font-family: ${globals.bodyFont};
              font-style: normal;
              font-weight: 300;
              font-size: 11px;
              line-height: 14px;
              color: ${JSON.parse(localStorage.getItem('darkmode')) ? "#ddd" : "#000"};
            `}
          >
            {moment(props.date).format("MMM D, YYYY h:mm a")}
          </span>
        </span>
        <a href={props.as} style={{ textDecoration: "none" }}>
          <h1
            css={css`
              margin: 2px 0;
              ${JSON.parse(localStorage.getItem('darkmode')) ? locals.darkheadline : locals.headline};
            `}
            style={{
              fontStyle:
                props.acf.db_article_format == "column" ? "italic" : "normal"
            }}
            dangerouslySetInnerHTML={{ __html: props.headline }}
          />
        </a>
        <a href={props.as} style={{ textDecoration: "none" }}>
          <div
            css={css`
              ${JSON.parse(localStorage.getItem('darkmode')) ? locals.darkexcerpt : locals.excerpt}
            `}
            dangerouslySetInnerHTML={{ __html: props.excerpt }}
          />
        </a>
        <h3
          css={css`
            margin: 4px 0 0;

            font-family: ${globals.bodyFont};
            font-style: normal;
            font-weight: bold;
            font-size: 11px;

            color: ${JSON.parse(localStorage.getItem('darkmode')) ? "#ddd" : "#000"};
          `}
        >
          By {utilities.renderAuthors(props.authors)}
        </h3>
      </div>
      <div
        css={css`
          flex-basis: 350px;
          order: -1;
          padding: 10px;
        `}
      >
        <a href={props.as} style={{ textDecoration: "none" }}>
          <div
            css={css`
              height: 100%;
              width: 100%;
              padding-top: 66.66%;
              overflow: hidden;
              position: relative;
              min-height: 200px;
            `}
          >
            <img
              css={css`
                height: 100%;
                width: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                object-fit: cover;
              `}
              src={props.imageurl}
            />
          </div>
          {/* <div
            css={css`
              height: 100%;
              min-width: 200px;
              background: url(${props.imageurl});
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            `}
          /> */}
        </a>
      </div>
    </div>
  );
}
