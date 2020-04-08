import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import moment from "moment";
import { headlineFont, cardShadow, regularFont, bodyFont } from "../globals";

import { renderCategories, renderAuthors } from "./utilities";
import * as globals from "../globals";
import AuthorInfo from "./AuthorInfo";
import ShareCard from "../ShareCard";
import ReviewInfobox from "../ReviewInfobox";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // grab author pics
    let authorPictures = [];
    for (let author of this.props.authors) {
      authorPictures.push(
        <a href={`/author/${author.slug}`}>
          <img
            src={author.avatar_urls[96]}
            css={css`
              height: 48px;
              width: 48px;
              border-radius: 50%;
              display: inline-block;
              margin-right: 10px;
              vertical-align: middle;
            `}
          />
        </a>
      );
    }

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

    return (
      <div
        css={css`
          display: block;
          padding: 10px;
          box-shadow: ${cardShadow};
          background-color: #ffffff;
        `}
      >
        <div
          css={css`
            a {
              text-decoration: none;
              color: #0080c6;
            }
            a:hover {
              text-decoration: underline;
            }
            a h2,
            span {
              margin: 0;
              font-family: ${globals.menuFont};
              font-style: normal;
              font-weight: bold;
              font-size: 14px;
              text-transform: uppercase;
              display: inline;
            }
          `}
        >
          {renderCategories(this.props.categories)}
        </div>
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
            {authorPictures}
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
                  padding: 5px 0 0;

                  color: #000000;

                  a {
                    text-decoration: none;
                    color: #0080c6;
                    background-color: #ffffff;
                  }
                  a:hover {
                    text-decoration: underline;
                  }
                `}
              >
                By {renderAuthors(this.props.authors)}
              </h3>
              <h4
                css={css`
                  margin: 0;
                  font-family: ${globals.menuFont};
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
          <div
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
                width: 100% !important;
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
          {/* {renderedAuthorInfo} */}
          {/* <ShareCard></ShareCard> */}
        </div>
      </div>
    );
  }
}
