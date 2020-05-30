import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import { Config } from "../config.js";
import Error from "next/error";
import Link from "next/link";

import Full from "../components/VideoCard";

class Playground extends Component {
  static async getInitialProps() {
    const { slug } = "wordpress-test_package-2";
    const postRes = await fetch(
      `https://dailybruin.com/wp-json/wp/v2/posts?slug=in-the-kitchen-with-yeomans&_embed`
    );
    const article1 = await postRes.json();
    const article = article1[0];
    console.log(article);
    return { article };
  }

  render() {
    console.log(this.props);
    return (
      <Full
        headline={this.props.article.title.rendered}
        date={new Date(this.props.article.date)}
        authors={[]}
        category={{as: this.props.article["_embedded"]["wp:term"][0]}}
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
        content={this.props.article.content.rendered}
        acf={this.props.article.acf}
      />
    );
  }
}

export default Playground;
