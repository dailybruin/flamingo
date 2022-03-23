import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";

import ArticleCarousel from "../../components/ArticleCarousel/index.jsx";
import header from "./image.gif";
import description from "./oscarsheader.svg"
import gradient from "./gradient.svg";
import MainSiteFooter from "../../components/MainSiteFooter";
import background from "./oscars1.svg";
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
            min-height: 200px;
            height: 400px;
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
                font-size: 24px;
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
            background-image: url(${gradient});
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
            css={css `
            position: relative;
            align: center;
            align-items: center;
            justify-content: center;
            padding-top: 3%;
            width: 100%;
            margin: 0 auto;
            `}
          >
            <img src={description}
              css={css`
              width: 100vw;
              height: 80vh;
                background-size: cover;
                display: block;
              `}
            >
              
              
            </img>
          </div>
        </div>
        <div
          css={css`
            margin: auto;
            width: 100%;
            background-image: url(${gradient});
            display: block;
          `}
        >
                    <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/JcPEPvDohto" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>

            </iframe>
          {renderedPosts}
        </div>
        <MainSiteFooter></MainSiteFooter>
      </>
    );
  }
}
