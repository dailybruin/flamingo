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

export default class TheStateOfTheUCLayout extends React.Component {
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
              font-family: "Open Sans", ${globals.bodyFont};
              overflow: auto;
            `}
          >
            {/* <p
              css={css`
                font-size: 1.8rem;
                line-height: 0;
              `}
            >
              Title of Page
            </p> */}

            <div
              css={css`
                background-color: #fff1a5;
                color: #000;
                padding: 15px 35px;
                font-family: "Open Sans", ${globals.bodyFont};
                /* background-color: red; */
              `}
            >
              {/* <img
                src={CampusLogo}
                css={css`
                  float: right;
                  height: 130px;
                  width: 130px;
                  transform: rotate(10deg);
                `}
              /> */}
              <p
                css={css`
                  width: 100%;
                  font-weight: normal;
                  font-size: 24px;
                  line-height: 1.3;
                  @media all and (max-width: 800px) {
                    font-size: 12px;
                  }
                `}
              >
                The University of California has ambitious goals to reshape the
                current state of UC campuses. In the coming years, twice the
                amount of students could be walking on campuses that get most of
                their energy from electricity rather than fossil fuels. A
                student at one UC campus could have access to the same resources
                as a student at another UC campus. However, while the UC has
                made strides to change over the years, there is still much work
                to be done according to community members across the system. In
                “The state of the UC,” UC faculty and students highlight
                existing issues and explore potential solutions related to
                funding, sustainability and enrollment.
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
