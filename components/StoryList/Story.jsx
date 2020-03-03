import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

function Link(props) {
  return (
    <a
      href={props.link}
      css={css`
        color: ${globals.black};
        text-decoration: none;
        &:hover {
          opacity: 0.8;
        }
      `}
    >
      {props.children}
    </a>
  );
}

export default function Story(props) {
  return (
    <div
      css={css`
        border-bottom: solid #ababab 0.1rem;
      `}
    >
      <a href={props.link} style={{ textDecoration: "none" }}>
        <h3
          css={css`
            font-family: ${globals.headlineFont};
            font-size: 0.875rem;
            font-weight: 700;
            line-height: 1.125rem;
            margin: 3px 0px;
            overflow-wrap: break-word;
            text-align: left;
            color: #000000;

            &:hover {
              color: ${globals.DBblue};
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h3>
        <p
          css={css`
            color: ${globals.black};
            font-family: "PT Serif", serif;
            font-size: 0.78rem;
            line-height: 1.1rem;
            margin: 0px;
            overflow-wrap: break-word;

            p {
              margin: -3px 0 3px 0;
            }
            br {
              display: none;
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.text }}
        ></p>
      </a>
    </div>
  );
}
