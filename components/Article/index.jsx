import * as React from "react";
import Link from "next/link";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import { renderCategories, renderAuthors } from "./utilities";
import * as globals from "../globals";
import ShareButtons from "../ShareButtons";
import ReviewInfobox from "../ReviewInfobox";
import AuthorCard from "../AuthorCard";
import Image from "next/image";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // grab author pics and cards
    let authorPictures = [];
    let renderedAuthorCards = [];

    for (let author of this.props.authors) {
      if (!author || !author.name) {
        // quick patch to prevent attempting to load an author that was not properly fetched.
        continue;
      }
      authorPictures.push(
        <a href={`/author/${author.slug}`}>
          <div
            css={css`
              width: 48px;
              height: 48px;
              border-radius: 50%;
              display: inline-block;
              margin-right: 10px;
              vertical-align: middle;
              overflow: hidden;
              flex-shrink: 0;
            `}
          >
            <Image
              src={
                author.simple_local_avatar != null
                  ? author.simple_local_avatar.full
                  : author.avatar_urls[512]
              }
              alt={author.name || "Author"}
              width={48}
              height={48}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center"
              }}
              loading="lazy"
            />
          </div>
        </a>
      );
      renderedAuthorCards.push(
        <div
          css={css`
            margin: 20px 0;
          `}
          key={author.name}
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
          `}
          style={{
            fontStyle:
              this.props.acf.db_article_format === "column" ||
              (this.props.acf.db_display_options &&
                this.props.acf.db_display_options[0] === "italic_headline")
                ? "italic"
                : "normal"
          }}
          dangerouslySetInnerHTML={{ __html: this.props.headline }}
        />
        <div
          style={{
            width: "calc(100% + 20px)",
            margin: "10px -10px"
          }}
        >
          <Image
            src={this.props.featureimg}
            alt="Feature image"
            width={this.props.featureimgWidth || 1200}
            height={this.props.featureimgHeight || 675}
            layout="responsive"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
            style={{
              objectFit: "cover"
            }}
          />
        </div>
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
        <div // article body padding specified here
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

              @media (max-width: 600px) {
                width: 100%;
                margin: 10px auto 20px;
              }
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
                {dayjs.utc(this.props.date).format("MMM D, YYYY h:mm a")}
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
          <div // content body of article
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

              & .maxWidth {
                width: calc(100% + 240px);
                margin: 10px -120px;
              }
              & figure img,
              & figure a img,
              & p img,
              & b img,
              & h2 img {
                width: 100%;
                height: inherit;
              }

              & .flex-video,
              & twitter-widget {
                margin: auto !important;
              }

              & .flex-video div iframe,
              & div div .twitter-tweet {
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

              /* For in-content ads */
              & .flytead {
                position: relative;
                width: 100%;
                background-color: #e8e8e8ff; /* subtle gray background */
                border-top: 1px solid #e0e0e0;
                border-bottom: 1px solid #e0e0e0;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
                padding: 15px 15px 15px;

                /* make sure children are stacked vertically */
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;
              }

              /* "ADVERTISEMENT" label above the ad, centered */
              & .flytead::before {
                content: "ADVERTISEMENT";
                width: 100%; /* span full width */
                text-align: center; /* center text horizontally */
                font-size: 0.75rem;
                font-weight: 600;
                color: #888;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                position: relative; /* avoid interference with flex or floats */
                top: 0;
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
