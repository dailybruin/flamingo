import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";
import DesktopImg from "./desktop_landing.svg";
import DescriptionBoxBg from "./DescriptionBox.svg";
import Header from "./Header";
import AAPIFooter from "./Footer";

export default class AAPILayout extends React.Component {
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
            /* height: 100vh; */
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <Header></Header>

          <div
            css={css`
              background-image: url(${DesktopImg});
              background-position: center;
              background-size: 100%;
              background-repeat: no-repeat;
              padding-top: 350px;
              padding-bottom: 350px;
              color: black;
              width: 100vw;
            `}
          ></div>
          <div
            css={css`
              background-image: url(${DescriptionBoxBg});
              background-position: center;
              background-color: #8d91fd;
              color: #fff;
              padding: 120px 100px;
              font-family: "Noto Serif", ${globals.bodyFont};
              height: 500px;
              width: 100vw;
            `}
          >
            <p
              css={css`
                max-width: 800px;
                width: 100%;
                margin: auto;
                text-align: center;
                font-size: 24px;
                line-height: 1.5;
              `}
            >
              As we celebrate Asian American and Pacific Islander Heritage
              Month, the Daily Bruin spotlights the voices and contributions of
              the AAPI community during and beyond May. This special issue tells
              stories about advocacy groups’ fight against gentrification in
              Chinatown, features of UCLA student-athletes in the AAPI
              community, coverage of the Los Angeles Asian Pacific Film
              Festival, and more.
            </p>
          </div>
        </div>
        <div
          css={css`
            margin: auto;
            max-width: 700px;
            /* padding-top: 600px; */
          `}
        >
          {renderedPosts}
        </div>
        <AAPIFooter />
      </>
    );
  }
}
