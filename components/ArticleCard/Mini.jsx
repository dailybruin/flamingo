import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";

export default function Mini(props) {
  return (
    <div
      css={css`
        display: flex;
        box-shadow: ${globals.cardShadow};
        padding: 0px;
        background-color: ${props.darkmode ? "#222222" : "#ffffff"};
      `}
    >
      <div
        css={css`
          width: 100px;
          min-width: 100px;
        `}
      >
        <a href={props.as} style={{ textDecoration: "none" }}>
          <div
            css={css`
              height: 100%;
              width: 100%;
              min-height: 50px;
              overflow: hidden;
              position: relative;
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
        </a>
      </div>
      <div
        css={css`
          padding: 10px;
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
                margin: 0;
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
        </span>
        <a href={props.as} style={{ textDecoration: "none" }}>
          <h1
            css={css`
              margin: 2px 0 4px;
              ${locals.headline};
              font-size: 0.85rem;
              font-weight: 550;
            `}
            style={{
              fontStyle:
                props.acf.db_article_format == "column" ? "italic" : "normal"
            }}
            dangerouslySetInnerHTML={{ __html: props.headline }}
          />
        </a>
      </div>
    </div>
  );
}
