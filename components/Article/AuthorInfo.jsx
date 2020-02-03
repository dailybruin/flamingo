import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Link from "next/link";
import * as globals from "../globals";

export default class AuthorInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        css={css`
            background-color: white;
            display: block;
            //  box-shadow: ${globals.cardShadow};
            padding: ${globals.cardPadding};
            margin-top: 0px;
            margin-bottom: 0px;
            margin-left: 80px;
            margin-right: 80px;
            `}
      >
        <hr
          css={css`
            height: 5px;
            background-color: #000000;
            border: none;
          `}
        ></hr>
        <h1
          css={css`
            color: #000000;
            font-family: ${globals.headlineFont};
            // padding: ${globals.cardPadding};
            font-weight: bold;
            font-size: 20px;

            `}
        >
          {this.props.name} |{" "}
          <span
            css={css`
              color: #515151;
            `}
          >
            {" "}
            {this.props.position}{" "}
          </span>
        </h1>
        <h2
          css={css`
            font-family: ${globals.bodyFont};
            // padding: ${globals.cardPadding};
            font-size: 18px;
            `}
          dangerouslySetInnerHTML={{__html: this.props.bio}}
        >
        </h2>
        <li
          css={css`
            display: inline-block;
            // padding: ${globals.cardPadding};
            font-family: ${globals.menuFont};
            font-weight: bold;
            `}>
        CONTACT 
        </li> 


        <a href={`mailto:${this.props.email}`}
        css={css`
        text-decoration: none;
        margin: 5px 10px;
        color: ${globals.DBblue};
        font-family: ${globals.menuFont};
        `}>{this.props.email}</a>


        <a href={`https://www.twitter.com/${this.props.twitter}`}
        css={css`
        text-decoration: none;
        margin: 5px 10px;
        color: ${globals.DBblue};
        font-family: ${globals.menuFont};
        `}>@{this.props.twitter}</a>
        <a
          href="https://www.twittier.com"
          css={css`
            text-decoration: none;
            margin: 5px 10px;
            color: ${globals.DBblue};
            font-family: ${globals.menuFont};
          `}
        >
          {this.props.email}
        </a>
      </div>
    );
  }
}
