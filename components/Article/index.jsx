import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
  headlineFont,
  cardShadow,
  regularFont,
  bodyFont
} from "../globals";
import { date2string } from "./utilities.js";
import AuthorInfo from "./AuthorInfo";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //  collect authors
    const authors = [];
    const renderAuthorInfo = [];
    if (this.props.authors.length === 0) {
      authors[0] = <span>Daily Bruin Staff</span>;
    } else {
      for (const author of this.props.authors) {
        authors.push(
          <Link href={author.href} as={author.as}>
            <a
              href={author.as}
              css={css`
                text-decoration: none;
                color: #0080c6;
                background-color: #ffffff;
                padding: 5px;

                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              {author.name}
            </a>
          </Link>
        );
      }
    }
    // if (renderAuthorInfo.length === 0) {
    //   renderAuthorInfo[0] = <span>Daily Bruin Staff</span>;
    // }
    // else {
      for (const author of this.props.authors) {
        renderAuthorInfo.push(
        <AuthorInfo name={author.name} position={"Sports Staff"} bio={author.bio}
        twitter={"@jbruin"} email={"jbruin@ucla.edu"}></AuthorInfo>
        );
      }
    // }
    return (
      <div
        css={css`
          display: block;
          padding: 10px;
          box-shadow: ${cardShadow};
          background-color: #ffffff;
        `}
      >
        <span>
          <Link href={this.props.category.href} as={this.props.category.as}>
            <a
              href={this.props.category.url}
              css={css`
                text-decoration: none;
                color: #0080c6;

                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              <h2
                css={css`
                  margin: 0;
                  font-family: Source Sans Pro;
                  font-style: normal;
                  font-weight: bold;
                  font-size: 14px;
                  text-transform: uppercase;
                  display: inline;
                `}
              >
                {this.props.category.name}
              </h2>
            </a>
          </Link>
        </span>
        <h1
          css={css`
            margin: 2px 0;

            font-family: Arimo;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 1.15;

            color: #000000;
          `}
          dangerouslySetInnerHTML={{ __html: this.props.headline }}
        />
        <img
          src={this.props.featureimg}
          css={css`
            width: calc(100% + 20px);
            margin: 10px -10px;
          `}
        />
        <div style={{ padding: "40px" }}>
          <div>
            <img
              src={this.props.authorimg}
              css={css`
                height: 48px;
                width: 48px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
              `}
            />
            <div style={{ display: "inline-block", verticalAlign: "middle" }}>
              <h3
                css={css`
                  margin: 0;
                  display: inline-block;

                  font-family: Arimo;
                  font-style: normal;
                  font-weight: bold;
                  font-size: 18px;
                  line-height: 21px;

                  color: #000000;
                `}
              >
                By{authors}
              </h3>
              <h4
                css={css`
                  margin: 0;
                  font-family: Source Sans Pro, sans-serif;
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 15px;
                `}
              >
                {date2string(this.props.date)}
              </h4>
            </div>
          </div>
          <p
            css={css`
              font-family: PT Serif;
              font-style: normal;
              font-weight: normal;
              font-size: 18px;

              color: #000000;
              max-width: 640px;
              margin: auto;
              display: block;
            `}
            dangerouslySetInnerHTML={{ __html: this.props.content }}
          />
          {renderAuthorInfo}
          {/* <AuthorInfo name={this.props.authors[0].name} position={"Sports Staff"} bio={this.props.authorbio}
        twitter={"@jbruin"} email={"jbruin@ucla.edu"}></AuthorInfo> */}
        </div>
      </div>
    );
  }
}
