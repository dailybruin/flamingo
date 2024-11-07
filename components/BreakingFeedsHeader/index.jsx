import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default function BreakingFeedsHeader(props) {
    return (
        <div
            css={css`
    box-shadow: ${globals.cardShadow};
    background-color: white;
    display: block;
    padding: 0 10px 10px;
    border-radius: 20px;
  `}
        >
            <div
                css={css`
      display: flex;
      align-items: center;
      justify-content: center; /* Aligns both horizontally in the center */
      gap: 10px; /* Adds space between the dot and the title */
    `}
            >
                <div
                    css={css`
        .blinking {
          -webkit-animation: 3s blink ease infinite;
          -moz-animation: 3s blink ease infinite;
          -ms-animation: 3s blink ease infinite;
          -o-animation: 3s blink ease infinite;
          animation: 3s blink ease infinite;
        }
          margin-top: 7px;

        @keyframes blink {
          from, to {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @-moz-keyframes blink {
          from, to {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @-webkit-keyframes blink {
          from, to {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @-ms-keyframes blink {
          from, to {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @-o-keyframes blink {
          from, to {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}>
                    <svg height="20" width="20" className="blinking"> {/* Adjust the size as needed */}
                        <circle cx="10" cy="10" r="10" fill="#d12008" />
                    </svg>
                </div>

                <div
                    css={css`
        text-align: left;
        list-style: none;
        color: black;
        font-family: ${globals.menuFont};
        font-weight: bold;
        font-size: 40px;
        text-transform: uppercase;
        margin-right: 20px;
      `}
                    dangerouslySetInnerHTML={{ __html: props.tag }}
                />
            </div>

            <div
                css={css`
      width: 100%;
      background-color: #d12008;
      height: 1px;
      margin-bottom: 5px;
    `}
            ></div>

            <div
                css={css`
      font-family: ${globals.bodyFont};
      font-size: 14px;
      font-weight: 300;
      text-align: center;
    `}
                dangerouslySetInnerHTML={{ __html: props.explainer }}
            />
        </div>
    );
}
