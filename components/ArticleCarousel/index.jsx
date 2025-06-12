import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import * as globals from "../globals";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class ArticleCarousel extends React.Component {
  state = {
    index: 0
  };

  handleChangeIndex = index => {
    this.setState({
      index
    });
  };

  render() {
    const { index } = this.state;
    let renderedSlides = [];
    for (let i in this.props.articles) {
      renderedSlides.push(
        <a
          key={i}
          css={css`
            text-align: center;
            color: black;

            &:hover {
              text-decoration: none;
            }
          `}
          href={this.props.articles[i].link}
        >
          <div
            css={css`
              font-family: "Noto Serif", ${globals.headlineFont};
              font-weight: 700;
            `}
            dangerouslySetInnerHTML={{
              __html: this.props.articles[i].headline
            }}
          />
          <div
            css={css`
              font-family: ${globals.menuFont};
              text-transform: uppercase;
              font-size: 14px;
            `}
            dangerouslySetInnerHTML={{ __html: this.props.articles[i].byline }}
          />
        </a>
      );
    }
    return (
      <div
        css={css`
          width: 100%;
          margin: auto;
          padding: 10px;
        `}
      >
        <AutoPlaySwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
        >
          {renderedSlides}
        </AutoPlaySwipeableViews>
      </div>
    );
  }
}
