import PageWrapper from "../../../../layouts/PageWrapper";
import React, { Component } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../../../config.js";
import Head from "next/head";

import ArticleLayout from "../../../../layouts/Article";
import PhotoGalleryLayout from "../../../../layouts/PhotoGallery";

class Post extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const postRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed`
    );
    const post = await postRes.json();
    if (post[0].acf.gallery != undefined) {
      const photosRes = await fetch(
        `${Config.apiUrl}/wp-json/db/v1/gallery/${post[0].acf.gallery}`
      );
      const photos = await photosRes.json();
      return { post, photos };
    }
    const classifiedsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
    );
    const classifieds = await classifiedsRes.json();
    return { post, classifieds };
  }
  componentDidMount() {
    if (
      this.props.post[0].acf["db_link"] != null &&
      this.props.post[0].acf["db_link"] != ""
    ) {
      location.replace(this.props.post[0].acf["db_link"]);
    }
  }
  render() {
    if (this.props.photos != undefined) {
      return (
        <>
          <Head>
            <title
              dangerouslySetInnerHTML={{
                __html: this.props.post[0].title.rendered + " - Daily Bruin"
              }}
            />
            <script
              async=""
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"
            ></script>
          </Head>
          <PhotoGalleryLayout
            post={this.props.post[0]}
            photos={this.props.photos}
          />
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title
              dangerouslySetInnerHTML={{
                __html: this.props.post[0].title.rendered + " - Daily Bruin"
              }}
            />
            <script
              async=""
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"
            ></script>
          </Head>
          <ArticleLayout
            article={this.props.post[0]}
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
        </>
      );
    }
  }
}

export default PageWrapper(Post);