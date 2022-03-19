import React, { Component } from "react";
import PageWrapper from "../PageWrapper";
import css from "../style.module.css";
import Media from "react-media";
import moment from "moment"

import FeatureArticle from "../../components/FeatureArticle";

class FeatureLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <FeatureArticle
          darkmode={this.props.darkmode}
          headline={this.props.article.title.rendered}
          date={moment.utc(this.props.article.date)}
          authors={this.props.authors}
          categories={this.props.article["_embedded"]["wp:term"][0]}
          featureimg={
            this.props.article._embedded["wp:featuredmedia"] != undefined &&
            !this.props.article._embedded["wp:featuredmedia"].empty
              ? this.props.article._embedded["wp:featuredmedia"][0].source_url
              : ""
          }
          caption={
            this.props.article._embedded["wp:featuredmedia"] != undefined &&
            !this.props.article._embedded["wp:featuredmedia"].empty
              ? this.props.article._embedded["wp:featuredmedia"][0].caption
                  .rendered
              : ""
          }
          authorimg={
            this.props.article["_embedded"].author[0]["avatar_urls"][96]
          }
          content={this.props.article.content.rendered}
          acf={this.props.article.acf}
          tagged={this.props.tagged.filter(
            article => article.slug != this.props.article.slug
          )}
          relatedPosts={this.props.relatedPosts}
        />
      </>
    );
  }
}

export default FeatureLayout;
