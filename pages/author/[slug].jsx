import PageWrapper from "../../layouts/PageWrapper";
import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";

import AuthorLayout from "../../layouts/Author";

class Author extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const authorRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/users?slug=${slug}`
    );
    const author = await authorRes.json();
    const postsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&filter[author_name]=${slug}&categories_exclude=27179,27127` // 27179 is the category id of breaking feed posts
    );
    const postsRaw = await postsRes.json();

    // Trim posts to reduce page data size
    const posts = postsRaw.map(post => {
      const rawFeatured =
        post._embedded && post._embedded["wp:featuredmedia"]
          ? post._embedded["wp:featuredmedia"]
          : [];

      const trimmedFeatured = rawFeatured.map(media => ({
        source_url: media.source_url,
        caption: media.caption,
        media_details:
          media.media_details && media.media_details.width && media.media_details.height
            ? { width: media.media_details.width, height: media.media_details.height }
            : undefined
      }));

      const rawTerms = post._embedded && post._embedded["wp:term"] ? post._embedded["wp:term"] : [];
      const trimmedTerms = rawTerms.map(termGroup =>
        termGroup.map(term => ({
          id: term.id,
          link: term.link,
          name: term.name,
          slug: term.slug
        }))
      );

      return {
        id: post.id,
        date: post.date,
        link: post.link,
        slug: post.slug,
        title: post.title,
        coauthors: post.coauthors,
        excerpt: post.excerpt,
        acf: post.acf,
        _embedded: {
          "wp:featuredmedia": trimmedFeatured,
          "wp:term": trimmedTerms
        }
      };
    });

    const classifiedsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
    );
    const classifiedsRaw = await classifiedsRes.json();
    const classifieds = classifiedsRaw.map(c => ({
      category: {
        name: c._embedded["wp:term"][1][0].name,
        url: c._embedded["wp:term"][1][0].link
      },
      content: { name: c.content.rendered, url: c.link }
    }));

    return { author, posts, classifieds };
  }
  render() {
    if (this.props.author == undefined || this.props.author.length == 0) {
      return <Error statusCode={404} />;
    }
    return (
      <>
        <Head>
          <title>{this.props.author[0].name + " - Daily Bruin"}</title>
        </Head>
        <AuthorLayout
          author={this.props.author[0]}
          posts={this.props.posts}
          classifieds={this.props.classifieds}
        />
      </>
    );
  }
}

export default PageWrapper(Author);
