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
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&filter[author_name]=${slug}`
    );
    const posts = await postsRes.json();
    const classifiedsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
    );
    const classifieds = await classifiedsRes.json();
    return { author, posts, classifieds };
  }
  render() {
    if (this.props.author == undefined || this.props.author.length == 0) {
      return <Error statusCode={404} />;
    }
    return (
      <>
        <Head>
          <title
            dangerouslySetInnerHTML={{
              __html: this.props.author[0].name + " - Daily Bruin"
            }}
          />
        </Head>
        <AuthorLayout
          author={this.props.author[0]}
          posts={this.props.posts}
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

export default PageWrapper(Author);
