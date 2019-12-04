import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Link from "next/link";

import { SizeMe } from "react-sizeme";
import * as globals from "../globals";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default class Masthead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedCategories = [];
    if (this.props.categories != null) {
      for (let i = 0; i < this.props.categories.length; i++) {
        renderedCategories.push(
          <Link
            href={this.props.categories[i].href}
            as={this.props.categories[i].as}
          >
            <a
              href={this.props.categories[i].as}
              css={css`
                display: table-cell;
                text-align: center;
                padding: 8px 4px;
                font-family: ${globals.menuFont};
                font-size: 18px;
                font-weight: bold;
                text-decoration: none;
                text-transform: uppercase;
                color: #ffffff;
                white-space: nowrap;
                &:hover {
                  text-decoration: underline;
                }

                &.isSticky {
                  background-color: red;
                }
              `}
            >
              {this.props.categories[i].name}
            </a>
          </Link>
        );
      }
    }
    return (
      <SizeMe monitorHeight={false}>
        {({ size }) => {
          if (size.width < 600) {
            return <Mobile {...this.props}></Mobile>;
          } else {
            return <Desktop {...this.props}></Desktop>;
          }
        }}
      </SizeMe>
    );
  }
}
