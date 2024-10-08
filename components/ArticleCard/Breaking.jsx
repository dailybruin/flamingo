import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as utilities from "./utilities";
import * as moment from "moment";

export default function Breaking(props) {
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
          padding: ${globals.cardPadding};
          width: 50%;
        `}
            >
                 <a href={props.as} style={{ textDecoration: "none" }}>
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
              `}
                            src={props.imageurl}
                        />
                    </div>
                </a>
                <h4
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
                </h4>
            </div>
            <div
                css={css`
          padding: ${globals.cardPadding};
          padding-left: 0;
          width: 100%;
        `}
            >
                <span>
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
                margin: 0 4px 0 0;
                font-family: Source Sans Pro;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                display: inline;
              `}
                            dangerouslySetInnerHTML={{ __html: props.category.name }}
                        />
                    </a>
                    <span
                        css={css`
              border-left: 1px solid #000;
              margin: 0;
              padding-left: 4px;
              font-family: ${globals.bodyFont};
              font-style: normal;
              font-weight: 300;
              font-size: 11px;
              line-height: 14px;
            `}
                    >
                        {moment(props.date).format("MMM D, YYYY h:mm a")}
                    </span>
                </span>
                <a href={props.as} style={{ textDecoration: "none" }}>
                    <div
                        css={css`
              margin: 2px 0 4px;
              ${locals.headline};
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
              font-family: 'Roboto', serif;\n font-style: normal;\n font-weight: normal;\n  font-size: 20px;\n  color: #000000;\n\n  p {\n    margin: 0;\n  }\n  \n  br {\n    display: none;\n  }\n
            `}
                        dangerouslySetInnerHTML={{ __html: props.excerpt }}
                    />
                </a>
                <h3
                    css={css`
            margin: 0;

            font-family: ${globals.bodyFont};
            font-style: normal;
            font-weight: bold;
            font-size: 11px;

            color: #000000;
          `}
                >
                    By {utilities.renderAuthors(props.authors)}
                </h3>
            </div>
        </div>
    );
}
