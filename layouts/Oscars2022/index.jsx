import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";

import ArticleCarousel from "../../components/ArticleCarousel/index.jsx";
import header from "./image.gif";
import MainSiteFooter from "../../components/MainSiteFooter";
import Masthead from "../../components/Masthead";

export default class Oscars2022Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedPosts = [];
    for (let i in this.props.posts) {
      console.log(i);
      console.log(this.props.posts[i].tags);
      if (this.props.posts[i].tags[0] == 24441 || this.props.posts[i].tags[1] == 24441) {
        renderedPosts.push(
          <h1>POST TYPE</h1>
        )
      }
      if (this.props.posts[i].tags[0] == 24442 || this.props.posts[i].tags[1] == 24442) {
        renderedPosts.push(
          <h1>POST TYPE 2</h1>
        )
      }
      renderedPosts.push(
        <a
          key={i}
          css={css`
            text-align: center;
            color: pink;
            display: table;
            min-height: 100px;
            height: 200px;
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
            background-color: yellow;
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
              background-color: green;
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
              the oscars are cool and this is totally a worthwile page{" "}
              
              
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
