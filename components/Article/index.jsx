import * as React from "react";
import Link from "next/link";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import moment from "moment";

import { renderCategories, renderAuthors } from "./utilities";
import * as globals from "../globals";
import ShareButtons from "../ShareButtons";
import ReviewInfobox from "../ReviewInfobox";
import AuthorCard from "../AuthorCard";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // grab author pics and cards
    let authorPictures = [];
    let renderedAuthorCards = [];

    for (let author of this.props.authors) {
      authorPictures.push(
        <a href={`/author/${author.slug}`}>
          <img
            src={
              author.simple_local_avatar != null
                ? author.simple_local_avatar.full
                : author.avatar_urls[512]
            }
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
      renderedAuthorCards.push(
        <div
          css={css`
            margin: 20px 0;
          `}
        >
          <AuthorCard
            image={
              author.simple_local_avatar != null
                ? author.simple_local_avatar.full
                : author.avatar_urls[512]
            }
            name={author.name}
            description={author.description}
            position={author.acf.position}
            twitter={author.acf.twitter}
            email={author.media_email}
            link={author.link}
          />
        </div>
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
          box-shadow: ${globals.cardShadow};
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

            font-family: ${globals.headlineFont};
            font-style: normal;
            font-weight: bold;
            font-size: 30px;
            line-height: 1.25;
            color: #000000;
            font-style: ${this.props.acf.db_article_format == "column"
              ? "italic"
              : "normal"};
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
            font-family: ${globals.bodyFont};

            p {
              margin: 0 20px;
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

                  font-family: ${globals.bodyFont};
                  font-style: normal;
                  font-weight: 700;
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
                  font-family: ${globals.bodyFont};
                  font-style: normal;
                  font-weight: 300;
                  font-size: 12px;
                  line-height: 15px;
                `}
              >
                {moment(this.props.date).format("MMMM D, YYYY h:mm a")}
              </h4>
            </div>
          </div>
          {this.props.acf.corrections == "" || (
            <div
              css={css`
                font-size: 12px;
                font-family: ${globals.bodyFont};
                color: ${globals.darkGray};
                max-width: 640px;
                margin: 20px auto 0;
              `}
              dangerouslySetInnerHTML={{ __html: this.props.acf.corrections }}
            ></div>
          )}
          <div
            css={css`
              font-family: ${globals.bodyFont};
              font-style: normal;
              font-weight: 400;
              font-size: 1rem;
              text-align: left;
              line-height: 1.75;

              color: #000000;
              display: block;
              max-width: 640px;
              margin: auto;

              & aside {
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

              & img {
                max-width: 100%;
              }

              & aside p {
                font-size: 0.95rem;
                text-align: right;
                margin-top: 0.5rem;
              }
              & aside:first-letter {
                float: left;
                font-size: 4.1rem;
                line-height: 80%;
                color: #000;
              }

              & figure.alignright {
                float: right;
                margin-right: 0;
              }
              & figure.aligncenter {
                max-width: 100% !important;
                margin: auto;
                width: 100% !important;
              }

              & figure figcaption {
                color: gray;
                font-size: 0.85rem;
              }

              & iframe {
                width: 100%;
              }
              & figure img,
              & figure a img,
              & p img,
              & b img,
              & h2 img {
                width: 100%;
                height: inherit;
              }

              & .flex-video {
                margin: auto;
              }

              & .flex-video div iframe {
                max-width: 100% !important;
                min-width: unset !important;
                margin: auto !important;
              }

              @media (max-width: 40em) {
                & aside {
                  width: 100%;
                }
                & figure {
                  width: 100% !important;
                  padding: 20px 0;

                  margin: auto;
                }
              }
            `}
            dangerouslySetInnerHTML={{ __html: this.props.content }}
          />
          <div>
            <ShareButtons
              title={this.props.headline}
              url={this.props.link}
            ></ShareButtons>
          </div>
          <div
            css={css`
              max-width: 600px;
              margin: auto;
            `}
          >
            {renderedAuthorCards}
          </div>
        </div>
      </div>
    );
  }
}
