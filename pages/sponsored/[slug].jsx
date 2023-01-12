import PageWrapper from "layouts/PageWrapper";
import React, { Component } from "react";
import Error from "next/error";
import { Config } from "config.js";
import Head from "next/head";
import he from "he";

import SponsoredLayout from "layouts/Sponsored";

class SponsoredPost extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const postRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    const post = await postRes.json();
    if (post.data != undefined || post.length == 0) {
      return { post };
    }
    let authors = [];
    if (post[0].coauthors != undefined) {
      for (let author of post[0].coauthors) {
        const authorsRes = await fetch(
          `${Config.apiUrl}/wp-json/wp/v2/users/${author.id}`
        );
        authors.push(await authorsRes.json());
      }
    }
    let feature = true;
    return { post, authors, feature };
  }

  render() {
    if (
      this.props.post == undefined ||
      this.props.post == null ||
      this.props.post.data != undefined ||
      this.props.post.length == 0 ||
      !this.props.post[0].categories.includes(23087)
    ) {
      return <Error statusCode={404} />;
    }
    let renderedMeta = [];
    for (let meta of this.props.post[0].yoast_meta) {
      renderedMeta.push(React.createElement("meta", meta));
    }
    return (
      <>
        <Head>
          <title>
            {he.decode(this.props.post[0].title.rendered) + " - Daily Bruin" ||
              ""}
          </title>
          {renderedMeta}
        </Head>
        <SponsoredLayout
          article={this.props.post[0]}
          authors={this.props.authors}
          darkmode={this.props.darkmode}
        />
      </>
    );
  }
}

export default PageWrapper(SponsoredPost);
