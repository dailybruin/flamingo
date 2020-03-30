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
        background-color: #ffffff;
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
              vertical-align: middle;
            `}
          >
            {moment(props.date).format("MMMM Do, h:mma")}
          </span>
        </span>
        <a href={props.as} style={{ textDecoration: "none" }}>
          <h1
            css={css`
              margin: 2px 0;
              ${locals.headline}
            `}
            dangerouslySetInnerHTML={{ __html: props.headline }}
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
      <div
        css={css`
          padding: 20px 30px 20px 10px;
          flex: 4;
        `}
      >
        <a href={props.as} style={{ textDecoration: "none" }}>
          <div
            css={css`
              ${locals.excerpt}
            `}
            dangerouslySetInnerHTML={{ __html: props.excerpt }}
          />
        </a>
      </div>
      <div
        css={css`
          flex: 4;
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
