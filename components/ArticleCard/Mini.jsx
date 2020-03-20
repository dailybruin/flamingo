import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";

export default function Mini(props) {
  return (
    <div
      css={css`
        display: flex;
        box-shadow: ${globals.cardShadow};
        padding: 0px;
        background-color: #ffffff;
      `}
    >
      <div
        css={css`
          width: 100px;
        `}
      >
        <Link href={props.href} as={props.as}>
          <a href={props.as} style={{ textDecoration: "none" }}>
            <div
              css={css`
                height: 100%;
                width: 100%;
                min-height: 100px;
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
        </Link>
      </div>
      <div
        css={css`
          padding: 10px;
          width: 50%;
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
                font-size: 0.85rem;
              `}
              dangerouslySetInnerHTML={{ __html: props.headline }}
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
