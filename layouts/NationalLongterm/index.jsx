import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { mediaQueries } from "./config";
import * as globals from "../../components/globals";

import ArticleCarousel from "../../components/ArticleCarousel/index.jsx";
import header from "./columnsfromquarantine.svg";
import MainSiteFooter from "../../components/MainSiteFooter";
import Masthead from "../../components/Masthead";
import CampusLogo from "./campusseal.png";

export default class NationalLongtermLayout extends React.Component {
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
            padding-bottom: 30px;
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
              src={header}
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
              background-color: #ffe249;
              color: #000;
              font-weight: bold;
              padding: 20px 20px;
              font-family: "Noto Serif", ${globals.bodyFont};
              padding-top: 10px;
              overflow: auto;
            `}
          >
            <p
              css={css`
                font-size: 1.8rem;
                line-height: 0;
              `}
            >
              Title of Page
            </p>

            <div
              css={css`
                background-color: #fff1a5;
                color: #000;
                padding: 20px 80px;
                font-family: "Noto Serif", ${globals.bodyFont};
              `}
            >
              <img
                src={CampusLogo}
                css={css`
                  float: right;
                  height: 130px;
                  width: 130px;
                  transform: rotate(10deg);
                `}
              />
              <p
                css={css`
                  max-width: 900px;
                  width: 100%;
                  font-weight: normal;
                  font-size: 0.8rem;
                  line-height: 1.5;
                  padding-top: 10px;
                  padding-bottom: 15px;
                `}
              >
                The coronavirus pandemic has drastically upended life in the
                most unforeseeable of ways. At UCLA, our community is remarkably
                united by similar feelings of loss, confusion and concern, but
                also by light, hope and perspective that the pandemic has
                brought to the forefront. In “Columns From Quarantine,” Daily
                Bruin staffers and community submissions highlight the personal
                stories that mark this unprecedented moment. If you have a
                quarantine story to tell, you can submit it here or email{" "}
                <a
                  css={css`
                    text-decoration: underline;
                    color: black;
                  `}
                  href="mailto:columnsfromquarantine@gmail.com"
                >
                  columnsfromquarantine@gmail.com
                </a>
                .
              </p>
            </div>
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
