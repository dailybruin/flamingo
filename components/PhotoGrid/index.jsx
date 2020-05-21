import * as React from "react";
import Head from "next/head";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Masonry from "react-masonry-component";

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.masonryProps = {
      itemSelector: ".grid-item"
    };
  }

  render() {
    return (
      <>
        <Masonry
          ref={function(c) {
            this.masonry = this.masonry || c.masonry;
          }.bind(this)}
          className={"grid"} // default ''
          options={this.masonryProps} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          css={css`
            .grid-sizer,
            .grid-item {
              width: 33.3%;
              padding: 6px;
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
          {this.props.stories}
        </Masonry>
      </>
    );
  }
}
