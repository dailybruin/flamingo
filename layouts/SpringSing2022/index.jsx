import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { mediaQueries } from "./config";
import * as globals from "../../components/globals";

import ArticleCarousel from "../../components/ArticleCarousel/index.jsx";
import DesktopLanding from "./desktop_landing.gif";
import DesktopImg from "./desktop_description_bg.svg";
import MobileImg from "./mobile_description_bg.svg";

import column_art_top from "./column_art_top.svg";
import column_art_bottom from "./column_art_bottom.svg";


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
            background-size: contain;
            background-repeat: no-repeat;
            
            padding-bottom: 10%;
            min-height: 250px;
            height: 16vh;
            width: 100%;
          `}
        >
          <a
            key={i}
            css={css`
              width: 100%
              height: 100%;
              margin: 5%;
              padding: 5%;
              //background-color: rgba(255, 255, 255, 0.7);
              text-align: center;
              color: black;
              display: table;
              font-size: min(1.2vw, 16px);
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
                padding: 2%;
                
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
                  font-size: min(1.2vw, 16px)
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
      <div
        css={css`
          background-color: #CCD68F;
        `}
      >
        <a href="/">
            <img
              src={DesktopLanding}
              css={css`
                margin: auto;
                width: 100%;
                display: block;
                /* ${mediaQueries.mobile} {
                  display: none;
                } */
              `}
            />
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

          <div>
            <img 
              src={column_art_top}
              css={css`
                margin-bottom: -15%;
                width: 100%;
              `}
            />
            <div
              css={css`
                width: 80%;
                padding-top: 7%;
                padding-bottom: 7%;
                margin: auto;
                margin-bottom: -25%;
                display: grid;
                grid-template-columns: 47% 47%;
                justify-content: space-around;
                ${mediaQueries.mobile} {
                  width: 85vw;
                  grid-template-columns: 100%;
                }
              `}
            >
              {renderedPosts}
            </div>
            <img 
              src={column_art_bottom}
              css={css`
                width: 100%;
                clear: both;
              `}
            />
          </div>
        </div>
      </>
    );
  }
}
