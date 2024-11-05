import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";

export default function BreakingOverview(props) {
    return (
        <div
            css={css`
        display: flex;
        flex-wrap: wrap;
        box-shadow: ${globals.cardShadow};
        padding: 0px;
        background-color: #ffffff;
        border: 2px solid #d12008;
        border-radius: 20px;
        width: 100%;
        position: sticky;
      `}
        >
            <div
                css={css`
          padding: 20px;
          padding-bottom: 5px;
          padding-top: 5px;
          width: 100%;
        `}
            >
                <span>
                    <span>
                        <h3
                            css={css`
                            margin: 0;
                            font-family: 'DM Serif Text', serif;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 1.5rem;\n  line-height: 1.25;\n  color: #000000;\n
                            font-size: 1.3rem;
                            display: inline;
                            `}
                        >
                            {"What we're covering here"}
                        </h3>
                    </span>
                </span>
                <div
                    css={css`
              margin: 10px 0 5px;
              font-family: 'Roboto', serif;\n font-style: normal;\n font-weight: normal;\n  font-size: 18px;\n  color: #000000;\n\n
            `}
                    dangerouslySetInnerHTML={{ __html: props.excerpt }}
                />
            </div>
            {props.imageurl != "http://wp.dailybruin.com/images/2017/03/db-logo.png" &&

                <div
                    css={css`
              height: 100%;
              width: 100%;
              padding-top: 66.66%;
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
                padding: 20px;
                padding-top: 0px;
                padding-bottom: 10px;
              `}
                        src={props.imageurl}
                    />
                </div>
                /* <h4
                    css={css`
            display: block;
            margin: 2px 0 0;

            font-family: Arimo;
            font-style: normal;
            font-weight: normal;
            font-size: 8px;
            text-align: right;

            color: #000000;
          `}
                >
                    {props.photographer}
                </h4> */
            }

        </div>
    );
}
