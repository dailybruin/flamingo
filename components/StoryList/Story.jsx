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
        border-bottom: 0.5px solid ${props.darkmode ? "#fff" : "#000"};;
      `}
    >
      <a href={props.link} style={{ textDecoration: "none" }}>
        <h3
          css={css`
            font-family: ${globals.headlineFont};
            font-size: 0.875rem;
            font-weight: 550;
            line-height: 1.125rem;
            margin: 3px 0px;
            overflow-wrap: break-word;
            text-align: left;
            color: ${props.darkmode ? "#fff" : "#000"};
            font-style: ${props.column ? "italic" : "normal"};

            &:hover {
              color: ${globals.DBblue};
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h3>
        <div
          css={css`
            color: ${props.darkmode ? "#fff" : "#000"};
            font-family: ${globals.bodyFont};
            font-weight: 300;
            font-size: 0.78rem;
            line-height: 1.1rem;
            margin: 0px;
            overflow-wrap: break-word;

            & p {
              margin: -3px 0 3px 0;
            }
            & br {
              display: none;
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.text }}
        ></div>
      </a>
    </div>
  );
}
