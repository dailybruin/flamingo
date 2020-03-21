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
      page: 1
    };
    this.masonryProps = {
      itemSelector: ".grid-item"
    };
    this.getPosts = this.getPosts.bind(this);
  }

  getPosts() {
    fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${this.props.categoryID}&page=${this.state.page}`
    )
      .then(response => response.json())
      .then(
        json =>
          this.setState({
            page: this.state.page + 1,
            loading: false,
            cards: this.state.cards.concat(json)
          })
        // console.log(this.state.cards.concat(json))
      );
    // console.log(this.state.cards);
  }

  render() {
    let rendered = utilities.buildPhotoList(this.state.cards);
    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.getPosts}
          hasMore={true}
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
        <button onClick={this.getPosts}>Load More</button>
        <div></div>
      </div>
    );
  }
}
