import * as React from "react";
import Link from "next/link";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import dayjs from "dayjs";

import { renderCategories, renderAuthors } from "./utilities";
import * as globals from "../globals";
import AuthorCard from "../AuthorCard";
import Tag from "./Tag";
import Landing from "./Landing";

import MiniArticleCard from "../ArticleCard/Mini";

export default class FeatureArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedTaggedCards = [];
    for (let story of this.props.tagged) {
      renderedTaggedCards.push(
        <div
          key={story.id}
          css={css`
            max-width: 312px;
            vertical-align: middle;
            display: inline-block;
            padding: 6px 12px;
            white-space: initial;

            &:first-of-type {
              margin-left: 20px;
            }
            &:last-of-type {
              margin-right: 20px;
            }
          `}
        >
          <MiniArticleCard
            headline={story.title.rendered}
            category={{
              name: story._embedded["wp:term"][0][0].name,
              href: `/category/[slug]`,
              as: `/category/${story._embedded["wp:term"][0][0].slug}`
            }}
            as={`/post/${story.slug}`}
            imageurl={
              story._embedded["wp:featuredmedia"] != undefined &&
              !story._embedded["wp:featuredmedia"].empty
                ? story._embedded["wp:featuredmedia"][0].source_url
                : "http://dailybruin.com/images/2017/03/db-logo.png"
            }
            acf={story.acf}
          ></MiniArticleCard>
        </div>
      );
    }
    let renderedRelatedPostsCards = [];
    for (let story of this.props.relatedPosts) {
      if (story == undefined || story.title == undefined) {
        //hotfix to prevent page from incurring "Internal Server Error." But we should investigate why we are fetching related posts with "rest_post_invalid_id" from Wordpress at a later time. Should also determine the algorithm for matching related posts.
        continue;
      }
      renderedRelatedPostsCards.push(
        <div
          key={story.id}
          css={css`
            max-width: 312px;
            vertical-align: middle;
            display: inline-block;
            padding: 6px 12px;
            white-space: initial;

            &:first-of-type {
              margin-left: 20px;
            }
            &:last-of-type {
              margin-right: 20px;
            }
          `}
        >
          <MiniArticleCard
            headline={story.title.rendered}
            category={{
              name: story._embedded["wp:term"][0][0].name,
              href: `/category/[slug]`,
              as: `/category/${story._embedded["wp:term"][0][0].slug}`
            }}
            as={`/post/${story.slug}`}
            imageurl={
              story._embedded["wp:featuredmedia"] != undefined &&
              !story._embedded["wp:featuredmedia"].empty
                ? story._embedded["wp:featuredmedia"][0].source_url
                : "http://dailybruin.com/images/2017/03/db-logo.png"
            }
            acf={story.acf}
          ></MiniArticleCard>
        </div>
      );
    }

    let renderedAuthorCards = [];
    for (let author of this.props.authors) {
      renderedAuthorCards.push(
        <div
          css={css`
            margin: 20px 0;
          `}
        >
          <AuthorCard
            image={author.avatar_urls[512]}
            name={author.name}
            description={author.description}
            position={author.acf.position}
            twitter={author.acf.twitter}
            email={author.media_email}
          />
        </div>
      );
    }

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
              object-fit: cover;
              object-position: center;
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
          background-color: #ffffff;
        `}
      >
        <Tag></Tag>
        <Landing
          headline={this.props.headline}
          img={this.props.featureimg}
          authors={this.props.authors}
          photostyle={this.props.acf.db_feature_photoratio}
        ></Landing>
        <div
          dangerouslySetInnerHTML={{ __html: this.props.caption }}
          css={css`
            p {
              margin: 10px 20px;
              font-family: ${globals.bodyFont};
              font-size: 12px;
              color: ${globals.darkGray};
            }
          `}
        ></div>
        {/* <div
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
        </div> */}
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
          <div
            css={css`
              max-width: 800px;
              padding: 0 20px;
              margin: auto;
            `}
          >
            <div>
              {/* {authorPictures} */}
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
                  {dayjs(this.props.date).format("LL")} at{" "}
                  {dayjs(this.props.date).format("LT")}
                </h4>
              </div>
            </div>
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
                @media (min-width: 40.5em) {
                  aside {
                    margin-right: -60px;
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
                  margin-right: 2px;
                }

                /* Custom styling for asides with class="asideStyle2":
                   - keep a border
                   - use a dull yellow background
                   - don't emphasize / capitalize the first letter
                */
                aside.asideStyle2 p {
                  color: black !important;
                  font-size: 1.2rem !important;
                  text-align: center;

                  padding: 5px;
                  border: 2px solid black;
                  border-radius: 4px;

                  background-color: #f7f3c0;
                }
                /* Don't capitalize first letter */
                aside.asideStyle2:first-letter {
                  all: unset;
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

                figure img,
                figure a img,
                p img,
                b img,
                h2 img {
                  width: 100%;
                  height: auto;
                }
              `}
              dangerouslySetInnerHTML={{ __html: this.props.content }}
            />
            {/* {renderedAuthorCards} */}
            {/* <ShareCard></ShareCard> */}
            {this.props.tagged.length == 0 && (
              <div
                css={css`
                  height: 2px;
                  width: 100%;
                  background-color: #000;
                `}
              ></div>
            )}
          </div>
        </div>
        {this.props.tagged.length > 0 && (
          <div
            css={css`
              background-color: #666;
              width: 100%;
              margin: auto;
              padding: 20px 0 0;
            `}
          >
            <div
              css={css`
                color: white;
                margin: -6px 12px 6px;
                font-weight: 700;
                text-transform: uppercase;
                font-family: ${globals.menuFont};
              `}
            >
              Read more stories in this series:
            </div>
            <div
              css={css`
                overflow-x: scroll;
                white-space: nowrap;
                padding-bottom: 20px;
              `}
            >
              {renderedTaggedCards}
            </div>
          </div>
        )}
        {this.props.tagged.length == 0 && (
          <div
            css={css`
              background-color: #666;
              width: 100%;
              margin: auto;
              padding: 20px 0 0;
            `}
          >
            <div
              css={css`
                color: white;
                margin: -6px 12px 6px;
                font-weight: 700;
                text-transform: uppercase;
                font-family: ${globals.menuFont};
              `}
            >
              Read more stories like this:
            </div>
            <div
              css={css`
                overflow-x: scroll;
                white-space: nowrap;
                padding-bottom: 20px;
              `}
            >
              {renderedRelatedPostsCards}
            </div>
          </div>
        )}
      </div>
    );
  }
}
