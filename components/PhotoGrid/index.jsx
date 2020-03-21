import * as React from "react";
import Head from "next/head";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

import PhotoCard from "../PhotoCard";

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    /** 
    let renderedStories = [];
    for (let i = 0; i < this.props.stories.length; i++) {
      renderedStories.push(
        <div className="grid-item">
          <PhotoCard
            href={this.props.stories[i].href}
            as={this.props.stories[i].as}
            image={this.props.stories[i].image}
            headline={this.props.stories[i].headline}
            caption={this.props.stories[i].caption}
            credit={this.props.stories[i].credit}
          />
        </div>
      );
    }
    */

    return (
      <div>
        <Head>
          <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
        </Head>
        <div
          className="grid"
          data-masonry='{ "itemSelector": ".grid-item", "columnWidth": ".grid-sizer", "percentPosition": "true", "gutter": 12 }'
          css={css`
            .grid-sizer,
            .grid-item {
              width: 32.5%;
              margin-bottom: 12px;
            }
            @media (max-width: 768px) {
              .grid-sizer,
              .grid-item {
                width: 49%;
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
        </div>
      </div>
    );
  }
}
