import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

import Photo from "./Photo";
import Header from "./Header";
import AuthorCard from "../AuthorCard";
import ShareButtons from "../ShareButtons";

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

    let renderedAuthorCards = [];
    for (let author of this.props.photographers) {
      renderedAuthorCards.push(
        <div
          css={css`
            padding: 20px 0;
          `}
        >
          <AuthorCard
            image={
              author.simple_local_avatar != null
                ? author.simple_local_avatar.full
                : author.avatar_urls[512]
            }
            name={author.name}
            description={author.description}
            position={author.acf.position}
            twitter={author.acf.twitter}
            email={author.media_email}
            link={author.link}
          />
        </div>
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
          <ShareButtons url={this.props.link} title={this.props.headline} />
          {renderedAuthorCards}
        </div>
      </div>
    );
  }
}
