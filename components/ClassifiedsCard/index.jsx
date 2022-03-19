import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

function Classified(props) {
  return (
    <div
      css={css`
        font-size: 12px;
        padding: 6px 0;
        border-bottom: 0.5px solid #474747;
        /* background-color: ${props.darkmode ? "#222" : "#fff"}; */
      `}
    >
      {/* <h1>Darkmode = {props.darkmode ? "True" : "False"}</h1> */}
      <a
        href={props.category.url}
        css={css`
          font-family: ${globals.menuFont};
          font-weight: 700;
          color: #0080c6;
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
          color: ${props.darkmode ? "#fff" : "#000"};
          text-decoration: none;
          background-color: ${props.darkmode ? "#222" : "#fff"};

          &:hover {
            color: ${props.darkmode ? "#bbb" : "#444"};
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
    this.renderedClassifieds = [];
  }

  render() {
    this.renderedClassifieds = [];
    if (this.props.classifieds != null) {
      for (const i of this.props.classifieds) {
        let c = (<Classified
          darkmode={this.props.darkmode}
          key={i.content.url}
          category={i.category}
          content={i.content}
        />);
        this.renderedClassifieds.push(
          <div className={css.card} key={i}>
            {/* <h1>Darkmode = {this.props.darkmode ? "True" : "False"}</h1> */}
            {React.cloneElement(c, {
              darkmode: this.props.darkmode
            })}
          </div>
        );
      }
    }

    return (
      <div
        css={css`
          box-shadow: ${globals.cardShadow};
          /* background-color: ${this.props.darkmode ? "#222" : "#fff"}; */
        `}
      >
        <div
          css={css`
            background-color: #000;
            /* background-color: ${this.props.darkmode ? "#ddd" : "#000"}; */
            height: 27px;
            padding: 2px 10px 0;

            font-family: ${globals.menuFont};
            font-style: normal;
            font-weight: 900;
            font-size: 18px;
            line-height: 24px;
            text-transform: uppercase;

            /* color: ${this.props.darkmode ? "#000" : "#fff"}; */
            color: #fff;
          `}
        >
          {this.props.header}
        </div>
        <div
          css={css`
            padding: 0 12px;
            background-color: ${this.props.darkmode ? "#222" : "#fff"};
            color: ${this.props.darkmode ? "#fff" : "#000"};
          `}
        >
          {this.renderedClassifieds}
        </div>
        <div style={{ textAlign: "right", padding: "12px 12px 6px" }}>
          <a
            href="https://wp.dailybruin.com/classifieds"
            css={css`
              font-family: ${globals.menuFont};
              font-size: 12px;
              line-height: 15px;
              font-weight: bold;
              color: #0080c6;
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
