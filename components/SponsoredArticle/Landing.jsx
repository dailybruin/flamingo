import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import logo from "./dailybruin.svg";
import * as globals from "../globals";
import { renderAuthors } from "./utilities";

export default function Landing(props) {
  return (
    <>
      {props.photostyle == "vertical" && (
        <div
          css={css`
            height: 100vh; /* Fallback for browsers that do not support Custom Properties */
            max-height: 100vh;
            z-index: 5;
            width: 100%;
            scroll-snap-align: start;
            position: relative;
            display: flex;
            flex-wrap: nowrap;
            background-color: #000;
            align-items: stretch;
            @media (max-width: 700px) {
              display: none;
            }
          `}
        >
          <img
            src={props.img}
            css={css`
              object-fit: cover;
              flex-grow: 1;
              max-height: 100%;
              max-width: 100%;
              min-height: 0;
            `}
          />
          <div
            css={css`
              color: #fff;
              flex-basis: 50%;
              align-self: center;
              @media (max-width: 700px) {
                flex: 0;
                flex-basis: unset;
              }

              padding: 20px;
            `}
          >
            <div
              css={css`
                font-family: ${globals.bodyFont};
                font-style: normal;
                font-weight: 700;
                font-size: 40px;
                line-height: 1.25;
                @media (max-width: 600px) {
                  font-size: 30px;
                }
              `}
              dangerouslySetInnerHTML={{ __html: props.headline }}
            />
            <div
              css={css`
                font-family: ${globals.bodyFont};
                font-style: normal;
                font-weight: 300;
                font-size: 20px;
                margin-left: 5px;
                @media (max-width: 600px) {
                  font-size: 16px;
                }

                a {
                  color: white !important;
                }
              `}
            >
              {props.disclaimer}
            </div>
          </div>
        </div>
      )}
      {true && (
        <div
          css={css`
            height: 100vh;
            width: 100%;
            min-width: 100px;
            background-image: url(${props.img});
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: flex-end;
            @media (min-width: 701px) {
              ${props.photostyle == "vertical" ? "display: none;" : ""}
            }
          `}
        >
          <div
            css={css`
              padding: 20px;

              color: #fff;
              background: rgb(0, 0, 0);
              background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.8) 20%,
                rgba(0, 0, 0, 0) 100%
              );
            `}
          >
            <div
              css={css`
                font-family: ${globals.bodyFont};
                font-style: normal;
                font-weight: 700;
                font-size: 40px;
                line-height: 1.25;
                @media (max-width: 600px) {
                  font-size: 30px;
                }
              `}
              dangerouslySetInnerHTML={{ __html: props.headline }}
            />
            <div
              css={css`
                font-family: ${globals.bodyFont};
                font-style: normal;
                font-weight: 300;
                font-size: 20px;
                margin-left: 5px;
                @media (max-width: 600px) {
                  font-size: 16px;
                }

                a {
                  color: white !important;
                }
              `}
            >
              {props.disclaimer}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
