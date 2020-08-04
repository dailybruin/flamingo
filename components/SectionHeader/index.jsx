import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import InFocusLogo from "./infocus.png";

export default class SectionHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let renderedSubcategories = [];
    const renderTitle = () => {
      console.log(this.props.category);
      if (this.props.category === "Daily Bruin: In Focus") {
        return (
          <img
            src={InFocusLogo}
            css={css`
              display: inline-block;
              height: 100%;
              max-height: 64px;
              margin: 0px;
              padding: 0px;
            `}
          ></img>
        );
      } else {
        return (
          <div dangerouslySetInnerHTML={{ __html: this.props.category }}></div>
        );
      }
    };

    if (this.props.subcategories != undefined) {
      for (let i = 0; i < this.props.subcategories.length; i++) {
        renderedSubcategories.push(
          <a
            href={this.props.subcategories[i].link}
            dangerouslySetInnerHTML={{
              __html: this.props.subcategories[i].name
            }}
            css={css`
              font-family: ${globals.menuFont};
              text-transform: uppercase;
              font-weight: bold;
              font-size: 12px;
              padding: 1px 5px;
              color: black;
              text-decoration: none;
              &:hover {
                text-decoration: underline;
              }
            `}
          />
        );
      }
    }

    return (
      <div
        css={css`
          box-shadow: ${globals.cardShadow};
          background-color: white;
          display: block;
          padding: 0 10px 10px;
        `}
      >
        <div
          css={css`
            text-align: center;
            list-style: none;
            color: black;
            font-family: ${globals.menuFont};
            font-weight: bold;
            font-size: 40px;
            text-transform: uppercase;
            padding-top: 8px;
          `}
        >
          {renderTitle()}
        </div>
        <div
          css={css`
            width: 100%;
            background-color: black;
            height: 1px;
            margin-bottom: 5px;
          `}
        ></div>
        <div
          css={css`
            ${renderedSubcategories.length > 8
              ? `
              margin: auto;
              text-align: left;
              column-count: 6;
              column-width: 150px;
              a {
                display: block;
                margin-left: 40px;
              }`
              : `
              text-align: center;
              a {
                display: inline-block;
              }
              `}
            @media (max-width: 600px) {
              display: none;
            }
          `}
        >
          {renderedSubcategories}
        </div>
      </div>
    );
  }
}
