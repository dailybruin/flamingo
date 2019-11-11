import React, { Component } from "react";
import PageWrapper from "../PageWrapper";
import fetch from "isomorphic-unfetch";
import Error from "next/error";

import css from "./style.css";
import MultimediaScroller from "../../components/MultimediaScroller";

const ArticleAdStyle = {
  width: "100%",
  backgroundColor: "#aaa",
  height: "200px",
  lineHeight: "200px",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "sans-serif"
};

class HomeMultimedia extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const media = this.props.media.map(index => {
      console.log(`/post/${index.slug}`)
      return {
        title: index.title.rendered,
        link: `/post/${index.slug}`,
        preview: index._embedded["wp:featuredmedia"][0].source_url
      };
    });
    return (
      <div id="multimediaScroller" className={css.card}>
        <MultimediaScroller
          media={media}
        />
      </div>
    );
  }
}

export default HomeMultimedia;
