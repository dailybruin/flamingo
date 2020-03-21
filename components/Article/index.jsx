import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import moment from "moment";
import { headlineFont, cardShadow, regularFont, bodyFont } from "../globals";

import { date2string } from "./utilities.js";
import * as globals from "../globals";
import AuthorInfo from "./AuthorInfo";
import ShareCard from "../ShareCard";
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
              this.props.acf["db_number_of_paws"] == ""
                ? null
                : this.props.acf["db_number_of_paws"]
            }
          ></ReviewInfobox>
        );
      }

      // Categories
      const renderedCategories = [];
      if (this.props.categories.length > 1) {
        for (const category of this.props.categories) {
          renderedCategories.push(
            <Link href={category.link} as={category.link}>
              <a
                href={category.link}
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
                  dangerouslySetInnerHTML={{ __html: category.name }}
                ></h2>
              </a>
            </Link>
          );
        }
      } else {
        renderedCategories = [
          <Link href={category.link} as={category.link}>
            <a
              href={category.link}
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
                dangerouslySetInnerHTML={{ __html: category.name }}
              ></h2>
            </a>
          </Link>
        ];
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
          {renderedCategories}
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
          <div
            dangerouslySetInnerHTML={{ __html: this.props.caption }}
            css={css`
              p {
                margin: 0 20px;
                font-family: ${globals.headlineFont};
                font-size: 10px;
                color: ${globals.darkGray};
              }
              @media (max-width: 40em) {
                p {
                  margin: 0 0 10px;
                }
              }
            `}
          ></div>
          <div
            css={css`
              padding: 40px;
              @media (max-width: 40em) {
                padding: 10px;
              }
            `}
          >
            <div
              css={css`
                float: right;
                margin-left: 20px;
                margin-bottom: 5px;
                max-width: 400px;
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
                  {moment(this.props.date).format("MMMM Do, YYYY, h:mma")}
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
                    margin: auto;
                  }
                }
                aside p {
                  font-size: 0.95rem;
                  text-align: right;
                  margin-top: 0.5rem;
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
                figure.aligncenter {
                  max-width: 100% !important;
                  margin: auto;
                  padding: 20px;
                }

                figure figcaption {
                  color: gray;
                  font-size: 0.85rem;
                }

                iframe {
                  width: 100%;
                }

                figure a img,
                p img,
                b img,
                h2 img {
                  width: 100%;
                  height: inherit;
                }
              `}
              dangerouslySetInnerHTML={{ __html: this.props.content }}
            />
            {renderAuthorInfo}
            <ShareCard></ShareCard>
          </div>
        </div>
      );
    }
  }
}
