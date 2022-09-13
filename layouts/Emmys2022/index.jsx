import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";

import storiesbg from "./storiesbg.svg";
import relatedbg from "./relatedbg.svg";

import relatedheadermobile from "./relatedheadermobile.svg";
import storiesbgmobile from "./storiesbgmobile.svg";

import Landing from "./landing.png";
import description from "./description.svg";
import descriptionmobile from "./descriptionmobile.svg";
import Header from "./Header";
import Footer from "./Footer";

export default class AAPILayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedPosts = [];
    for (let i in this.props.posts) {
      let authors = [];
      for (let j in this.props.posts[i].coauthors) {
        authors.push(this.props.posts[i].coauthors[j].display_name);
      }
      let authors_string = authors.join(', ');
      renderedPosts.push(
        <a
          key={i}
          css={css`
            width: 100%;
            height: 13vh;
            margin: 3% auto;
            padding: 2% 3%;
            text-align: center;
            color: white;
            display: table;
            font-size: min(2.5vw, 14px);
            &:hover {
              text-decoration: none;
            }
            @media all and (max-width: 800px) {
              font-size: 14px;
              margin: 5% auto;
              color: black
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
              padding-left: 5%;
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
              `}
              dangerouslySetInnerHTML={{
                __html: `By ${authors_string}`
              }}
            />
          </div>
        </a>
      );
    }

    let relatedPosts = [];
    for (let i in this.props.relatedPosts) {
      relatedPosts.push(
        <a
          key={i}
          css={css`
            width: 100%;
            height: 10vh;
            margin: 1% auto;
            padding: 1%;
            text-align: center;
            color: white;
            display: table;
            font-size: 14px;
            &:hover {
              text-decoration: none;
            }
            @media all and (max-width: 800px) {
              font-size: 14px;
              height: 13vh;
              margin: 5% auto;
              color: black
            }
          `}
          href={this.props.relatedPosts[i].link}
        >
          <div
            src={
              this.props.relatedPosts[i]._embedded["wp:featuredmedia"] !=
              undefined
                ? this.props.relatedPosts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : null
            }
            css={css`
              padding: 2%;
              width: 24%;
              height: 100%;
              display: table-cell;
              background-image: url(${this.props.relatedPosts[i]._embedded[
                "wp:featuredmedia"
              ] != undefined
                ? this.props.relatedPosts[i]._embedded["wp:featuredmedia"][0]
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
              padding-left: 5%;
            `}
          >
            <div
              css={css`
                font-family: "Noto Serif", ${globals.headlineFont};
                font-weight: 700;
              `}
              dangerouslySetInnerHTML={{
                __html: this.props.relatedPosts[i].title.rendered
              }}
            />
            <div
              css={css`
                font-family: ${globals.menuFont};
                text-transform: uppercase;
              `}
              dangerouslySetInnerHTML={{
                __html: `By ${this.props.relatedPosts[i].coauthors[0].display_name}`
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
            /* height: 100vh; */
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <Header></Header>

          <img
            src={Landing}
            css={css`
              margin: auto;
              width: 100%;
              @media all and (max-width: 800px) {
                display: none;
              }
            `}
          />
          <img
            src={Landing}
            css={css`
              width: 100vw;
              display: none;
              @media all and (max-width: 800px) {
                display: inline-block;
              }
            `}
          />

          <img
            src={description}
            css={css`
              margin: auto;
              width: 100%;
              @media all and (max-width: 800px) {
                display: none;
              }
            `}
          />
          <img
            src={descriptionmobile}
            css={css`
              width: 100vw;
              display: none;
              @media all and (max-width: 800px) {
                display: inline-block;
                margin-top: -9vh;
              }
            `}
          />
        </div>
        <div
          css={css`
            background-color: #DCABE8;
          `}
        >
          <div
            css={css`
              width = 100%;
              background-image: url(${storiesbg});
              background-size: cover;
              @media all and (max-width: 800px) {
                background-image: url(${storiesbgmobile});
              }
            `}
          >
            <div
              css={css`
                padding-top: 7%;
                margin: auto;
                display: grid;
                width: 40%;
                @media all and (max-width: 800px) {
                  width: 85vw;
                  grid-template-columns: 100%;
                }
              `}
            >
              {renderedPosts}
            </div>
            <img
              src={relatedheadermobile}
              css={css`
                width: 100vw;
                display: none;
                @media all and (max-width: 800px) {
                  display: inline-block;
                }
              `}
            />
            <div
              css={css`
                width = 100%;
                padding-top: 7%;
                padding-bottom: 15%;
                margin: auto;
                height: 100%;
                background-image: url(${relatedbg});
                background-size: cover;
                @media all and (max-width: 800px) {
                  background-image: none;
                }
              `}
            >
              <div
                css={css`
                  margin-top: 26%;
                  margin-left: 20vw;
                  margin-right: 40vw;
                  display: grid;
                  @media all and (max-width: 800px) {
                    padding-top: 0%;
                    margin: auto;
                    width: 52%;
                    width: 85vw;
                    grid-template-columns: 100%;
                  }
                `}
              >
                <h1
                  css={css`
                  font-family: "Noto Serif", ${globals.headlineFont};
                  font-weight: 700;
                  color: white;
                  @media all and (max-width: 800px) {
                    display: none;
                  }
                `}
                >
                  RELATED COVERAGE
                </h1>
                {relatedPosts}
              </div>
            </div>      
          </div>
          
        </div>
        <Footer />
      </>
    );
  }
}
