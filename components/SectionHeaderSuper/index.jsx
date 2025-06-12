import * as React from "react";
import Link from "next/link";
/** @jsxImportSource @emotion/react */
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
        for (
          let j = 0;
          j < this.props.subcategories[i].subsubcategories.length;
          j++
        ) {
          renderedSubsubcategories.push(
            <Link
              href="/category/[slug]"
              as={this.props.subcategories[i].subsubcategories[j].link}
            >
              <a href={this.props.subcategories[i].subsubcategories[j].link}>
                {this.props.subcategories[i].subsubcategories[j].name}
              </a>
            </Link>
            /*<a
          href={this.props.subcategories[i].subsubcategories[j].link}>
            {this.props.subcategories[i].subsubcategories[j].name}
          </a>*/
          );
        }
        let displayVal = "block";
        if (this.props.subcategories[i].subsubcategories.length == 0) {
          displayVal = "none";
        }
        renderedSubcategories.push(
          /*<Link
          href={this.props.subcategories[i].href}
          as={this.props.subcategories[i].as}
        >*/
          <a href={this.props.subcategories[i].link}>
            <div
              css={css`
                display: inline-block;
                position: relative;
                background-color: white;
              `}
            >
              <div
                css={css`
                  //background-color: red;
                  &:hover + div {
                    display: ${displayVal};
                  }
                  font-family: ${globals.menuFont};
                  text-transform: uppercase;
                  font-weight: bold;
                  font-size: 14px;
                  padding: 10px 10px 0;
                  color: black;
                  text-decoration: none;
                  &:hover {
                    color: grey;
                  }
                `}
                dangerouslySetInnerHTML={{
                  __html: this.props.subcategories[i].name
                }}
              ></div>
              <div
                css={css`
                  & a {
                    display: block;
                    text-decoration: none;
                    color: black;
                    &:hover {
                      color: grey;
                    }
                  }
                  &:hover {
                    display: block;
                  }

                  z-index: 1;
                  font-family: Helvetica;
                  font-size: 13px;
                  line-height: 15pt;
                  display: none;
                  position: absolute;
                  left: 0;
                  right: 0;
                  margin: auto;
                  background-color: white;
                  text-align: center;
                  border-left: 1px solid lightgrey;
                  border-right: 1px solid lightgrey;
                  border-bottom: 1px solid lightgrey;
                  box-shadow: ${globals.cardShadow};
                  border-radius: 0px 0px 10px 10px;
                  padding: 10px;
                `}
              >
                {renderedSubsubcategories}
              </div>
            </div>
          </a>
          //</Link>
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
        <li
          css={css`
            text-align: center;
            //display: inline-block;
            list-style: none;
            color: black;
            font-family: ${globals.menuFont};
            font-weight: bold;
            font-size: 50px;
            text-transform: uppercase;
            line-height: 60px;
          `}
          dangerouslySetInnerHTML={{ __html: this.props.category }}
        ></li>
        <div
          css={css`
            width: 100%;
            background-color: black;
            height: 4px;
          `}
        ></div>
        <li
          css={css`
            list-style: none;
            text-align: center;
          `}
        >
          {renderedSubcategories}
        </li>
      </div>
    );
  }
}
