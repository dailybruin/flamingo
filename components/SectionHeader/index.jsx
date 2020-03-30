import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class SectionHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let renderedSubcategories = [];
    if (this.props.subcategories != undefined) {
      for (let i = 0; i < this.props.subcategories.length; i++) {
        let renderedSubsubcategories = [];
        renderedSubcategories.push(
          <a
            href={this.props.subcategories[i].link}
            dangerouslySetInnerHTML={{
              __html: this.props.subcategories[i].name
            }}
            css={css`
              display: inline-block;
              font-family: ${globals.menuFont};
              text-transform: uppercase;
              font-weight: bold;
              font-size: 12px;
              padding: 5px;
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
          `}
          dangerouslySetInnerHTML={{ __html: this.props.category }}
        ></div>
        <div
          css={css`
            width: 100%;
            background-color: black;
            height: 4px;
            margin-bottom: 5px;
          `}
        ></div>
        <div
          css={css`
            text-align: center;
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
