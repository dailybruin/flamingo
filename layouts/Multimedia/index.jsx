import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../config.js";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as utilities from "./utilities";
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroller";

import PhotoCard from "../../components/PhotoCard";
import PhotoGrid from "../../components/PhotoGrid";

export default class MultimediaLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      more: true
    };
    this.masonryProps = {
      itemSelector: ".grid-item"
    };
    this.getPosts = this.getPosts.bind(this);
  }

  getPosts(page) {
    fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${this.props.categoryID}&page=${page}`
    )
      .then(response => response.json())
      .then(json => {
        if (json.data == undefined) {
          this.setState({
            cards: this.state.cards.concat(json)
          });
        } else {
          this.setState({ more: false });
        }
      });
  }

  render() {
    let rendered = utilities.buildPhotoList(this.state.cards);
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getPosts}
        hasMore={this.state.more}
        loader={
          <div className="loader" key={0}>
            <h1>...</h1>
          </div>
        }
      >
        <Masonry
          ref={function(c) {
            this.masonry = this.masonry || c.masonry;
          }.bind(this)}
          className={"grid"} // default ''
          options={this.masonryProps} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          css={css`
            .grid-item {
              padding: 6px;
            }
            .grid-sizer,
            .grid-item {
              width: 33.3%;
            }
            @media (max-width: 768px) {
              .grid-sizer,
              .grid-item {
                width: 50%;
              }
            }
            @media (max-width: 600px) {
              .grid-sizer,
              .grid-item {
                width: 100%;
              }
            }
          `}
        >
          <div className="grid-sizer"></div>
          {rendered}
        </Masonry>
      </InfiniteScroll>
    );
  }
}
