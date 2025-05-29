import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

function Classified(props) {
  return (
    <div
      css={css`
        font-size: 12px;
        padding: 6px 0;
        border-bottom: 0.5px solid #474747;
      `}
    >
      <a
        href={props.category.url}
        css={css`
          font-family: ${globals.menuFont};
          font-weight: 700;
          color: ${globals.DBblue};
          text-transform: uppercase;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        `}
        dangerouslySetInnerHTML={{ __html: props.category.name }}
      ></a>
      <br />
      <a
        href={props.content.url}
        css={css`
          font-family: ${globals.bodyFont};
          font-weight: 300;
          font-size: 11px;
          color: #000000;
          text-decoration: none;

          &:hover {
            color: #444;
            text-decoration: none;
          }

          p {
            margin: 0;
          }
        `}
        dangerouslySetInnerHTML={{ __html: props.content.name }}
      ></a>
    </div>
  );
}

export default class ClassifiedsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const renderedClassifieds = [];
    if (this.props.classifieds != null) {
      for (const i of this.props.classifieds) {
        renderedClassifieds.push(
          <Classified
            key={i.content.url}
            category={i.category}
            content={i.content}
          />
        );
      }
    }

    return (
      <div
        css={css`
          box-shadow: ${globals.cardShadow};
          background-color: #ffffff;
        `}
      >
        <div
          css={css`
            background-color: #000000;
            height: 27px;
            padding: 2px 10px 0;

            font-family: ${globals.menuFont};
            font-style: normal;
            font-weight: 900;
            font-size: 18px;
            line-height: 24px;
            text-transform: uppercase;

            color: #ffffff;
          `}
        >
          {this.props.header}
        </div>
        <div
          css={css`
            padding: 0 12px;
          `}
        >
          {renderedClassifieds}
        </div>
        <div style={{ textAlign: "right", padding: "12px 12px 6px" }}>
          <a
            href="https://wp.dailybruin.com/classifieds"
            css={css`
              font-family: ${globals.menuFont};
              font-size: 12px;
              line-height: 15px;
              font-weight: bold;
              color: ${globals.DBblue};
              text-transform: uppercase;
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            `}
          >
            More classifieds »
          </a>
        </div>
      </div>
    );
  }
}
