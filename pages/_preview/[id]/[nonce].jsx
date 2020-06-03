import React, { Component } from "react";
import PageWrapper from "../../../layouts/PageWrapper";
import { Config } from "../../../config.js";
import Head from "next/head";

import ArticleLayout from "../../../layouts/Article";
import PhotoGalleryLayout from "../../../layouts/PhotoGallery";
import FeatureLayout from "../../../layouts/Feature";

class Preview extends Component {
  static async getInitialProps(context) {
    const { id, nonce } = context.query;
    const postRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts/${id}?_wpnonce=${nonce}&_embed`,
      { credentials: "include" }
    );
    const post = await postRes.json();
    let authors = [];
    if (post.coauthors != undefined) {
      for (let author of post.coauthors) {
        const authorsRes = await fetch(
          `${Config.apiUrl}/wp-json/wp/v2/users/${author.id}`
        );
        authors.push(await authorsRes.json());
      }
    }
    let relatedPosts = [];
    if (post.related_posts != undefined) {
      for (let related of post.related_posts) {
        const relatedRes = await fetch(
          `${Config.apiUrl}/wp-json/wp/v2/posts/${related.id}?_embed`
        );
        relatedPosts.push(await relatedRes.json());
      }
    }
    if (post.acf["db_feature"] == true) {
      let feature = true;
      let tagged = [];
      if (post.acf["db_feature_tag"] != "") {
        const taggedRes = await fetch(
          `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${
            post.acf["db_feature_tag"]
          }`
        );
        tagged = await taggedRes.json();
      }
      return { feature, post, authors, tagged, relatedPosts };
    }
    if (post.acf.gallery != undefined) {
      const photosRes = await fetch(
        `${Config.apiUrl}/wp-json/db/v1/gallery/${post.acf.gallery}`
      );
      const photos = await photosRes.json();
      return { post, photos, authors, relatedPosts };
    }
    const classifiedsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
    );
    const classifieds = await classifiedsRes.json();
    return { post, classifieds, authors, relatedPosts };
  }

  render() {
    if (
      this.props.post == undefined ||
      this.props.post.data != undefined ||
      this.props.post.length == 0
    ) {
      return <Error statusCode={404} />;
    }
    let renderedMeta = [];
    for (let meta of this.props.post.yoast_meta) {
      renderedMeta.push(React.createElement("meta", meta));
    }
    return (
      <>
        <Head>
          <title>{this.props.post.title.rendered + " - Daily Bruin"}</title>
          {renderedMeta}
        </Head>
        {this.props.photos != undefined && (
          <PhotoGalleryLayout
            post={this.props.post}
            photos={this.props.photos}
            photographers={this.props.authors}
          />
        )}
        {this.props.feature == true && (
          <FeatureLayout
            article={this.props.post}
            authors={this.props.authors}
            tagged={this.props.tagged}
          />
        )}
        {this.props.photos == undefined && this.props.feature != true && (
          <ArticleLayout
            article={this.props.post}
            authors={this.props.authors}
            relatedPosts={this.props.relatedPosts}
            classifieds={this.props.classifieds.map(c => {
              return {
                category: {
                  name: c._embedded["wp:term"][1][0].name,
                  url: c._embedded["wp:term"][1][0].link
                },
                content: { name: c.content.rendered, url: c.link }
              };
            })}
          />
        )}
      </>
    );
  }
}

export default PageWrapper(Preview);
