import * as React from "react";
import Link from "next/link";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as utilities from "./utilities";
import Image from "next/image";

export default function PhotoCard(props) {
  // Check if we have dimensions to decide if we can use NextJS <Image>
  const hasDimensions = props.imageWidth && props.imageHeight;

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
              padding: 15px;
              width: 100%;
              overflow: hidden;
              box-shadow: ${globals.cardShadow};
              background-color: white;
              &:hover #overlay {
                opacity: 1;
              }
            `}
          >
            {hasDimensions ? (
              /* OPTION A: Optimized Next.js Image */
              <Image
                src={props.image}
                alt={props.headline || "Photo"}
                width={props.imageWidth}
                height={props.imageHeight}
                layout="responsive"
                sizes="35vw"
                loading="lazy"
              />
            ) : (
              /* OPTION B: Fallback Standard Image */
              <img
                src={(props.image && props.image.src) || props.image}
                alt={props.headline || "Photo"}
                css={css`
                  display: block;
                  width: 100%;
                  height: auto;
                `}
              />
            )}

            <div
              id="overlay"
              css={css`
                background: rgba(0, 0, 0, 0.5);
                position: absolute;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                top: 0;
                left: 0;
                right: 0;
                opacity: 0;
                height: 100%;
                width: 100%;
                border: 15px solid #ffffff;
                transition: 0.5s ease;
              `}
            >
              <div
                id="text"
                css={css`
                  margin-left: auto;
                  margin-right: auto;
                  width: 90%;
                  text-align: center;
                `}
              >
                <h3
                  dangerouslySetInnerHTML={{ __html: props.headline }}
                  css={css`
                    color: #ffffff;
                    font-size: 3.2vh;
                    font-weight: bold;
                    line-height: 1.4;
                    margin-bottom: 0.625rem;
                    font-family: ${globals.headlineFont};
                    @media (max-width: 768px) {
                      font-size: 2.5vw;
                    }
                  `}
                ></h3>
                <div
                  id="caption"
                  dangerouslySetInnerHTML={{ __html: props.excerpt }}
                  css={css`
                    color: white;
                    font-size: 2.1vh;
                    line-height: 20px;
                    font-family: ${globals.bodyFont};
                    @media (max-width: 768px) {
                      font-size: 1.4vw;
                    }
                  `}
                ></div>
                <div
                  id="credit-block"
                  css={css`
                    font-size: 2.2vh;
                    font-family: ${globals.bodyFont};
                    font-weight: bold;
                    color: black;
                    line-height: 15px;
                    @media (max-width: 768px) {
                      font-size: 1.4vw;
                    }
                    padding: 6px;
                    background-color: white;
                    border-radius: 10px;
                    opacity: 0.9;
                  `}
                >
                  Credits: {utilities.renderAuthors(props.authors)}
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
            <div
              css={css`
                width: 100%;
                max-width: 600px;
                height: auto;
                position: relative;
              `}
            >
              {hasDimensions ? (
                /* OPTION A: Optimized Next.js Image */
                <Image
                  src={props.image}
                  alt={props.headline || "Photo"}
                  width={props.imageWidth}
                  height={props.imageHeight}
                  layout="responsive"
                  sizes="100vw"
                  loading="lazy"
                />
              ) : (
                /* OPTION B: Fallback Standard Image */
                <img
                  src={props.image}
                  alt={props.headline || "Photo"}
                  css={css`
                    display: block;
                    width: 100%;
                    height: auto;
                  `}
                />
              )}
            </div>

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
                  padding-bottom: 6px;
                  font-size: 30px;
                  line-height: 34px;
                  font-family: ${globals.headlineFont};
                `}
              ></h3>
              <p
                id="caption"
                dangerouslySetInnerHTML={{ __html: props.excerpt }}
                css={css`
                  margin: 0;
                  font-family: ${globals.bodyFont};
                  font-size: 11px;
                  line-height: 15px;
                `}
              ></p>
              <div
                id="credit-block"
                css={css`
                  font-family: ${globals.bodyFont};
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
