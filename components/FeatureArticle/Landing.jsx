import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import logo from "./dailybruin.svg";
import * as globals from "../globals";
import { renderAuthors } from "./utilities";
import Image from "next/image";

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
          <div
            css={css`
              position: relative;
              flex-grow: 1;
              max-height: 100%;
              max-width: 100%;
              min-height: 0;
            `}
          >
            <a
              href={props.img}
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
                cursor: zoom-in;
              `}
            >
              <Image
                src={props.img}
                alt="Feature image"
                layout="fill"
                objectFit="cover"
                sizes="100vw"
                priority
              />
            </a>
          </div>
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
                font-family: ${globals.headlineFont};
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
              By {renderAuthors(props.authors)}
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
            position: relative; /* Needed for layout="fill" children */
            display: flex;
            align-items: flex-end;
            @media (min-width: 701px) {
              ${props.photostyle == "vertical" ? "display: none;" : ""}
            }
          `}
        >
          <a
            href={props.img}
            target="_blank"
            rel="noopener noreferrer"
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 0;
              cursor: zoom-in;
            `}
          >
            <Image
              src={props.img}
              alt="Feature image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </a>

          {/* Text Overlay Layer */}
          <div
            css={css`
              padding: 20px;
              width: 100%;
              color: #fff;
              position: relative; /* Ensure text sits ON TOP of the image */
              z-index: 1;         /* Higher z-index allows clicking author links */
              background: rgb(0, 0, 0);
              background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.8) 20%,
                rgba(0, 0, 0, 0) 100%
              );
              pointer-events: none; /* Allows clicks to pass through empty space */
            `}
          >
            <div
              css={css`
                font-family: ${globals.headlineFont};
                font-style: normal;
                font-weight: 700;
                font-size: 40px;
                line-height: 1.25;
                pointer-events: auto; /* Re-enable clicks for text selection */
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
                pointer-events: auto; /* Re-enable clicks for author links */
                @media (max-width: 600px) {
                  font-size: 16px;
                }

                a {
                  color: white !important;
                }
              `}
            >
              By {renderAuthors(props.authors)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
