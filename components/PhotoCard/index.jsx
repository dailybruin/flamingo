import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as utilities from "./utilities";

export default function PhotoCard(props) {
  return (
    <div>
      <div
        id="desktop"
        css={css`
          @media (max-width: 600px) {
            display: none;
          }
        `}
      >
        <a href={props.as}>
          <div
            id="container"
            css={css`
              position: relative;
              margin: 0;
              width: 100%;
              overflow: hidden;
              box-shadow: ${globals.cardShadow};
              &:hover #overlay {
                transform: translateY(0);
                box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
              }
            `}
          >
            <img
              src={props.image}
              css={css`
                display: block;
                width: 100%;
                border: 15px solid #ffffff;
              `}
            ></img>
            <div
              id="overlay"
              css={css`
                background: #fff;
                position: absolute;
                overflow: hidden;
                top: 0;
                left: 0;
                right: 0;
                transform: translateY(-100%);
                width: 100%;
                transition: 0.5s ease;
              `}
            >
              <div
                id="text"
                css={css`
                  background: #fff;
                  color: #000;
                  padding: 10px;
                  // position: absolute;
                  left: 50%;
                  top: 50%;
                  width: 90%;
                  // -webkit-transform: translate(-50%, -50%);
                  // -ms-transform: translate(-50%, -50%);
                  // transform: translate(-50%, -50%);
                `}
              >
                <h3
                  dangerouslySetInnerHTML={{ __html: props.headline }}
                  css={css`
                    font-size: 24px;
                    margin: 0;
                    font-family: ${globals.headlineFont};
                  `}
                ></h3>
                <p
                  id="caption"
                  dangerouslySetInnerHTML={{ __html: props.excerpt }}
                  css={css`
                    margin: 0;
                    padding-bottom: 4px;
                    font-family: ${globals.bodyFont};
                    font-size: 11px;
                    line-height: 15px;
                  `}
                ></p>
                <div
                  id="credit-block"
                  css={css`
                    font-family: ${globals.headlineFont};
                    font-weight: bold;
                    font-size: 11px;
                    line-height: 13px;
                  `}
                >
                  Credit: {utilities.renderAuthors(props.authors)}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div
        id="mobile"
        css={css`
          @media (min-width: 600px) {
            display: none;
          }
        `}
      >
        <a
          href={props.as}
          css={css`
            text-decoration: none;
            &:hover {
              text-decoration: none;
            }
          `}
        >
          <div
            id="container"
            css={css`
              box-sizing: border-box;
              position: relative;
              background: #fff;
              width: 100%;
              box-shadow: ${globals.cardShadow};
            `}
          >
            <img
              src={props.image}
              css={css`
                box-sizing: border-box;
                display: block;
                width: 100%;
                padding: 15px 15px 0;
              `}
            ></img>
            <div
              id="text"
              css={css`
                color: #000;
                padding: 18px;
              `}
            >
              <h3
                dangerouslySetInnerHTML={{ __html: props.headline }}
                css={css`
                  margin: 0;
                  padding-bottom: 17px;
                  font-size: 20px;
                  line-height: 34px;
                  font-family: ${globals.headlineFont};
                `}
              ></h3>
              <p
                id="caption"
                dangerouslySetInnerHTML={{ __html: props.excerpt }}
                css={css`
                  margin: 0;
                  padding-bottom: 4px;
                  font-family: ${globals.bodyFont};
                  font-size: 11px;
                  line-height: 15px;
                `}
              ></p>
              <div
                id="credit-block"
                css={css`
                  font-family: ${globals.headlineFont};
                  font-weight: bold;
                  font-size: 11px;
                  line-height: 13px;
                `}
              >
                Credit: {utilities.renderAuthors(props.authors)}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
