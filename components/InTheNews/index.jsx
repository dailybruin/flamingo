import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class InTheNews extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let renderedStories = [];
    for (let i = 0; i < this.props.stories.length; i++) {
      renderedStories.push(
      <Link href={this.props.stories[i].href} as={this.props.stories[i].as}>
      <a href={this.props.stories[i].as}>
      <li 
        css={css`
            display:inline-block;
            padding: 10px;
            font-family: ${globals.menuFont};
            font-weight: bold;
              &:hover{
                color: ${globals.DBblue};
              }
            `}>{this.props.stories[i].name}</li></a></Link>);
    }

    return (
      <div
        css={css`
          background-color: white;
          display: block;
          padding: ${globals.cardPadding};
          box-shadow: ${globals.cardShadow};
        `}
      >
        <li css={css`
            background-color: ${globals.DBblue};
            display: inline-block;
            color: white;
            padding: 6px;
            font-family: ${globals.headlineFont}
            font-weight: bold;
            `}>          
            IN THE NEWS:</li> {renderedStories}
      </div>
    );
  }
}
