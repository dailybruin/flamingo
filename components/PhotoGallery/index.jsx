import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

import Photo from "./Photo";
import Header from "./Header";

export default class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedGallery = [];
    for (let i in this.props.photos) {
      renderedGallery.push(
        <Photo
          image={this.props.photos[i].image}
          caption={this.props.photos[i].caption}
          credit={this.props.photos[i].credit}
          order={i % 2}
          key={i}
        ></Photo>
      );
    }
    return (
      <div
        css={css`
          width: 100%;
          box-shadow: ${globals.cardShadow};
          background-color: #fff;
        `}
      >
        <Header
          headline={this.props.headline}
          photographers={this.props.photographers}
          date={this.props.date}
        />
        <div
          css={css`
            width: 100%;
            padding: 0 40px;
            @media (max-width: 800px) {
              padding: 6px;
            }
          `}
        >
          {renderedGallery}
        </div>
      </div>
    );
  }
}
