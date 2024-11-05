import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";

export default function Breaking(props) {
    var CurrentTime = new Date();
    var PostTime = new Date(props.date);
    var DiffInMilliseconds = CurrentTime - PostTime;
    var TotalMinutes = Math.floor(DiffInMilliseconds / (1000 * 60));
    var DiffInDays = Math.floor(TotalMinutes / (60 * 24));
    var DiffInHours = Math.floor((TotalMinutes % (60 * 24)) / 60);
    var DiffInMinutes = TotalMinutes % 60;

    var TimeDiff = "";
    if (DiffInDays != 0) {
        TimeDiff += DiffInDays + " Day" + (DiffInDays != 1 ? "s" : "") + ", ";
    }
    if (DiffInHours != 0) {
        TimeDiff += DiffInHours + " Hour" + (DiffInHours != 1 ? "s" : "") + ", ";
    }
    TimeDiff += DiffInMinutes + " Minute" + (DiffInMinutes != 1 ? "s" : "") + " Ago";

    return (
        <div
            css={css`
        display: flex;
        flex-wrap: wrap;
        box-shadow: ${globals.cardShadow};
        padding: 0px;
        background-color: #ffffff;
        /*border: 10px solid #d12008;*/
        border-radius: 20px;
        width: 100%;
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

                            font-family: ${globals.bodyFont};
                            font-style: normal;
                            font-weight: bold;
                            font-size: 11px;
                            display: inline;
                            margin-right: 4px;
                            color: #000000;`}
                        >
                            {utilities.renderAuthors(props.authors)}
                        </h3>
                    </span>
                
                    <span
                        css={css`
                margin: 0 5px 0 0;
                font-family: ${globals.bodyFont};
                font-style: normal;
                font-weight: 300;
                font-size: 11px;
                line-height: 14px;
                display: inline;
            `}
                    >
                        {PostTime.toLocaleString()}
                    </span>
                    <span
                        css={css`
              border-left: 1px solid #000;
              padding-left: 4px;
              font-family: ${globals.bodyFont};
              font-style: normal;
              font-weight: 300;
              font-size: 11px;
              line-height: 14px;
            `}
                    >
                        {TimeDiff}
                    </span>
                </span>
                    <div
                        css={css`
              margin: 2px 0 4px;
              font-family: 'DM Serif Text', serif;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 1.5rem;\n  line-height: 1.25;\n  color: #000000;\n
            `}
                        style={{
                            fontStyle:
                                props.acf.db_article_format == "column" ? "italic" : "normal"
                        }}
                        dangerouslySetInnerHTML={{ __html: props.headline }}
                    />
                    <div
                        css={css`
              margin: 0 0 5px;
              font-family: 'Roboto', serif;\n font-style: normal;\n font-weight: normal;\n  font-size: 18px;\n  color: #000000;\n\n
            `}
                    dangerouslySetInnerHTML={{ __html: props.content }}
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
