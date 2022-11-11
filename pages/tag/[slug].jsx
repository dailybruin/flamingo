import PageWrapper from "../../layouts/PageWrapper";
import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";

import TagHeader from "../../components/TagHeader";
import TagLayout from "../../layouts/Tag";

class Tag extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const tagRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug}`
    );
    const tag = await tagRes.json();
    if (tag.length > 0) {
      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${tag[0].id}`
      );
      const posts = await postsRes.json();
      const classifiedsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
      );
      const classifieds = await classifiedsRes.json();
      return { tag, posts, classifieds };
    }
    return { tag };
  }
  render() {
    if (this.props.tag.data != undefined || this.props.tag.length == 0)
      return <Error statusCode={404} />;
    return (
      <>
        <Head>
          <title
            dangerouslySetInnerHTML={{
              __html: this.props.tag[0].name + " - Daily Bruin"
            }}
          />
        </Head>
        <div>
          <div style={{ padding: "6px" }}>
            <TagHeader
              tag={this.props.tag[0].name}
              explainer={this.props.tag[0].description}
            />
          </div>
          <TagLayout
            tagID={this.props.tag[0].id}
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
        </div>
      </>
    );
  }
}

export default PageWrapper(Tag);
