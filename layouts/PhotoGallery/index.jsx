import React, { Component } from "react";
import PageWrapper from "../PageWrapper";
import css from "../style.css";
import { SizeMe } from "react-sizeme";

import PhotoGallery from "../../components/PhotoGallery";
import CommentsCard from "../../components/CommentsCard";

export default class PhotoGalleryLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className={css.card}>
          <PhotoGallery
            headline={this.props.post.title.rendered}
            photos={this.props.photos}
            photographers={this.props.photographers}
            date={this.props.post.date}
          />
        </div>
        <div className={css.card}>
          <CommentsCard
            id={this.props.post.id}
            link={this.props.post.link}
          ></CommentsCard>
        </div>
      </>
    );
  }
}
