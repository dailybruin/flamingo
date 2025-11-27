import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";

import ArticleCarousel from "../../components/ArticleCarousel/index.jsx";
import header from "./columnsfromquarantine.svg";
import MainSiteFooter from "../../components/MainSiteFooter";
import Masthead from "../../components/Masthead";

export default class ColumnsFromQuarantineLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedPosts = [];
    for (let i in this.props.posts) {
      renderedPosts.push(
        <a
          key={i}
          css={css`
            text-align: center;
            color: black;
            display: table;
            min-height: 100px;
            height: 100px;
            position: relative;
            margin: 20px 10px;

            &:hover {
              text-decoration: none;
            }
          `}
          href={this.props.posts[i].link}
        >
          <div
            src={
              this.props.posts[i]._embedded["wp:featuredmedia"] != undefined
                ? this.props.posts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : null
            }
            css={css`
              width: 150px;
              height: 100%;
              display: table-cell;
              background-image: url(${this.props.posts[i]._embedded[
                "wp:featuredmedia"
              ] != undefined
                ? this.props.posts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : ""});
              background-size: cover;
              background-position: center;
            `}
          />
          <div
            css={css`
              display: table-cell;
              vertical-align: middle;
              text-align: left;
              padding-left: 10px;
            `}
          >
            <div
              css={css`
                font-family: "Noto Serif", ${globals.headlineFont};
                font-weight: 700;
              `}
              dangerouslySetInnerHTML={{
                __html: this.props.posts[i].title.rendered
              }}
            />
            <div
              css={css`
                font-family: ${globals.menuFont};
                text-transform: uppercase;
                font-size: 14px;
              `}
              dangerouslySetInnerHTML={{
                __html: `By ${this.props.posts[i].coauthors[0].display_name}`
              }}
            />
          </div>
        </a>
      );
    }
    return (
      <>
        <div
          css={css`
            display: flex;
            height: 100vh;
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <a
            css={css`
              width: 100%;
              padding: 10px;
              max-width: 700px;
              margin: auto;
            `}
            href="/"
          >
            <img
              src={header.src}
              css={css`
                width: 100%;
              `}
            />
          </a>
          <div
            css={css`
              margin: auto;
              width: 100%;
            `}
          >
            <ArticleCarousel
              articles={this.props.posts.map(a => {
                return {
                  headline: a.title.rendered,
                  byline: `By ${a.coauthors[0].display_name}`,
                  link: a.link
                };
              })}
            />
          </div>
          <div
            css={css`
              background-color: #000;
              color: #fff;
              padding: 60px 20px;
              font-family: "Noto Serif", ${globals.bodyFont};
            `}
          >
            <p
              css={css`
                max-width: 900px;
                width: 100%;
                margin: auto;
                text-align: center;
                font-size: 0.8rem;
                line-height: 1.5;
              `}
            >
              The coronavirus pandemic has drastically upended life in the most
              unforeseeable of ways. At UCLA, our community is remarkably united
              by similar feelings of loss, confusion and concern, but also by
              light, hope and perspective that the pandemic has brought to the
              forefront. In “Columns From Quarantine,” Daily Bruin staffers and
              community submissions highlight the personal stories that mark
              this unprecedented moment. If you have a quarantine story to tell,
              you can submit it here or email{" "}
              <a
                css={css`
                  text-decoration: underline;
                  color: white;
                `}
                href="mailto:columnsfromquarantine@gmail.com"
              >
                columnsfromquarantine@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
        <div
          css={css`
            margin: auto;
            max-width: 700px;
          `}
        >
          {renderedPosts}
        </div>
        <MainSiteFooter></MainSiteFooter>
      </>
    );
  }
}
