import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { headlineFont, cardShadow, regularFont, bodyFont } from "../globals";

import { date2string } from "./utilities.js";
import AuthorInfo from "./AuthorInfo";
import ReviewInfobox from "../ReviewInfobox";

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
        <AuthorInfo
          name={author.name}
          position={author.acf.position}
          bio={author.description}
          email={author.media_email}
          twitter={author.acf.twitter}
        ></AuthorInfo>
      );
      // }

      // Check for Infobox
      let renderedInfobox = null;
      if (this.props.acf["db_infobox"]) {
        renderedInfobox = (
          <ReviewInfobox
            title={this.props.acf["db_infobox"]}
            rating={
              this.props.acf["db_number_of_paws"] == "0"
                ? null
                : this.props.acf["db_number_of_paws"]
            }
          ></ReviewInfobox>
        );
      }
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
            <div
              css={css`
                float: right;
                margin-left: 20px;
                margin-bottom: 5px;
              `}
            >
              {renderedInfobox}
            </div>
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
                font-size: 1rem;
                text-align: left;
                line-height: 1.5;

                color: #000000;
                display: block;
                max-width: 640px;
                margin: auto;

                aside {
                  background-image: url(../../img/quotationmark4.svg);
                  background-repeat: no-repeat;
                  background-position: 5px 0;
                  background-size: 50px;
                  float: right;
                  width: 60%;
                  padding: 9px 0.5rem 0.5rem 27px;
                  min-width: 150px;
                  font-family: "Playfair Display", serif;
                  font-size: 1.1rem;
                  color: #000;
                }
                @media (max-width: 40em) {
                  aside {
                    width: 100%;
                  }
                  figure {
                    width: 100% !important;
                  }
                }
                aside p {
                  font-size: 0.95rem;
                  text-align: right;
                  margin-top: 0.5rem;
                }
                @media (max-width: 40em) {
                  aside {
                    width: 100%;
                  }
                }
                aside:first-letter {
                  float: left;
                  font-size: 4.1rem;
                  line-height: 80%;
                  color: #000;
                }

                figure.alignright {
                  float: right;
                  margin-right: 0;
                }

                figure figcaption {
                  color: gray;
                  font-size: 0.85rem;
                }

                iframe {
                  width: 100%;
                }

                figure img {
                  width: 100%;
                }
              `}
              dangerouslySetInnerHTML={{ __html: this.props.content }}
            />
            {renderAuthorInfo}
          </div>
        </div>
      );
    }
  }
}
