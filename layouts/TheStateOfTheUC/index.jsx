import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { mediaQueries } from "./config";
import * as globals from "../../components/globals";

import ArticleCarousel from "../../components/ArticleCarousel/index.jsx";
import DesktopImg from "./desktop_landing.png";
import MobileImg from "./mobile_landing.png";
import MainSiteFooter from "../../components/MainSiteFooter";
import Masthead from "../../components/Masthead";
import CampusLogo from "./campusseal.png";

import columnbg from "./columnbg.svg";
import columnbgmobile from "./columnbgmobile.svg";
import storiesbg from "../AAPI2022/storiesbg.svg";
import storiesbgmobile from "../AAPI2022/storiesbgmobile.svg";

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
        <div>
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
              background-color: #ffe249;
              color: #000;
              font-weight: bold;
              padding: 20px 20px;
              font-family: "Open Sans", ${globals.bodyFont};
              overflow: auto;
              display: block;
            `}
          >
            <div
              css={css`
                background-color: #fff1a5;
                color: #000;
                padding: 15px 35px;
                font-family: "Open Sans", ${globals.bodyFont};
                /* background-color: red; */
              `}
            >
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
            background-image: url(${columnbg});
            background-size: cover;
            @media all and (max-width: 800px) {
              background-image: url(${columnbgmobile});
            }
          `}
        >
          <div
            css={css`
              width: 55%;
              padding-top: 7%;
              padding-bottom: 7%;
              margin: auto;
              @media all and (max-width: 800px) {
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
