import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import { Config } from "../config.js";

import Article from "../components/Article";

class Playground extends Component {
  static async getInitialProps() {
    const { slug } = "wordpress-test_package-2";
    const postRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?slug=${slug}`
    );
    const article1 = await postRes.json();
    const article = article1[0];
    console.log(article);
    return { article };
  }

  render() {
    console.log(this.props);
    return (
      <Article
        headline={this.props.article.title.rendered}
        date={new Date(this.props.article.date)}
        authors={[]}
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
        content={this.props.article.content.rendered}
        acf={this.props.article.acf}
      />
    );
  }
}

export default Playground;
