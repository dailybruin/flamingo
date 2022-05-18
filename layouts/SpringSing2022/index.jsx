import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { mediaQueries } from "./config";
import * as globals from "../../components/globals";

import ArticleCarousel from "../../components/ArticleCarousel/index.jsx";
import DesktopImg from "./desktop_landing.svg";
import MobileImg from "./mobile_landing.svg";
import columnbg from "./desktop_columnbg.svg";
import columnbgmobile from "./mobile_columnbg.svg";
import DesktopArticleCardBg from "./desktop_article_card_bg.svg";
import MobileArticleCardBg from "./mobile_article_card_bg.svg";

export default class SpringSing2022Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedPosts = [];
    for (let i in this.props.posts) {
      renderedPosts.push(
        <div
          css={css`
            background-image: url(${DesktopArticleCardBg});
            padding: 5% 2%;
          `}
        >
          <a
            key={i}
            css={css`
              width: 100%;
              height: 15vh;
              margin: 5% auto;
              padding: 2% 3%;
              background-color: rgba(255, 255, 255, 0.7);
              text-align: center;
              color: black;
              display: table;
              font-size: min(3vw, 16px);
              &:hover {
                text-decoration: none;
              }
              @media all and (max-width: 800px) {
                font-size: 14px;
                height: 13vh;
                margin: 5% auto;
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
                padding: 2%;
                width: 24%;
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
                margin: 2.5% 3.5%;
                display: table-cell;
                vertical-align: middle;
                text-align: left;
                padding-left: 10px;
              `}
            >
              <div
                css={css`
                  font-family: "Kiwi Maru", ${globals.headlineFont};
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
        </div>
      );
    }
    return (
      <>
        <a href="/">
          <img
            src={DesktopImg}
            css={css`
              margin: auto;
              width: 100%;
              display: block;
              ${mediaQueries.mobile} {
                display: none;
              }
            `}
          />
          <img
            src={MobileImg}
            css={css`
              margin: auto;
              width: 100%;
              display: block;
              ${mediaQueries.notMobile} {
                display: none;
              }
            `}
          />
        </a>

        <div
          css={css`
            background-image: url(${columnbg});
            background-size: cover;
            @media all and (max-width: 800px) {
              background-image: url(${columnbgmobile});
            }
          `}
        >
          <div
            css={css`
              width: 80%;
              padding-top: 7%;
              padding-bottom: 7%;
              margin: auto;
              display: grid;
              grid-template-columns: 46% 46%;
              justify-content: space-around;
              ${mediaQueries.mobile} {
                width: 85vw;
                grid-template-columns: 100%;
              }
            `}
          >
            {renderedPosts}
          </div>
        </div>
      </>
    );
  }
}
