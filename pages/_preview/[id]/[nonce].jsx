import React, { Component } from "react";
import PageWrapper from "layouts/PageWrapper";
import { Config } from "config.js";
import Head from "next/head";
import he from "he";

import ArticleLayout from "layouts/Article";
import PhotoGalleryLayout from "layouts/PhotoGallery/index_old";
import FeatureLayout from "layouts/Feature";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: undefined,
      authors: [],
      relatedPosts: [],
      feature: false,
      tagged: [],
      gallery: undefined,
      classifieds: [],
      photos: null
    };
  }

  static async getInitialProps(context) {
    const { id, nonce } = context.query;
    const previewID = id;
    const previewNonce = nonce;
    return { previewID, previewNonce };
  }

  componentDidMount() {
    let queryPost = undefined;
    fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts/${this.props.previewID}?_wpnonce=${this.props.previewNonce}&_embed`,
      { credentials: "include" }
    )
      .then(response => response.json())
      .then(
        json => {
          if (json.code || json.code === "rest_cookie_invalid_nonce") {
            this.setState({
              error: "yes"
            });
            queryPost = json;
          } else {
            this.setState({
              post: json
            });
            return;
          }
          console.log(queryPost);
          if (queryPost.coauthors != undefined) {
            for (let author of queryPost.coauthors) {
              fetch(`${Config.apiUrl}/wp-json/wp/v2/users/${author.id}`)
                .then(response => response.json())
                .then(json => {
                  if (json.code || json.code === "rest_cookie_invalid_nonce") {
                    this.setState({
                      error: json
                    });
                  } else {
                    this.state.authors.push(json);
                  }
                });
            }
          }
          this.setState({ relatedPosts: [] });
          if (queryPost.related_posts != undefined) {
            for (let related of queryPost.related_posts) {
              fetch(`${Config.apiUrl}/wp-json/wp/v2/posts/${related.id}?_embed`)
                .then(response => response.json())
                .then(json => {
                  if (json.code || json.code === "rest_cookie_invalid_nonce") {
                    this.setState({
                      error: json
                    });
                  } else {
                    this.state.relatedPosts.push(json);
                  }
                });
            }
          }
          if (queryPost.acf["db_feature"] == true) {
            this.setState({ feature: true });
            this.setState({ tagged: [] });
            if (queryPost.acf["db_feature_tag"] != "") {
              fetch(
                `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${
                  post.acf["db_feature_tag"]
                }`
              )
                .then(response => response.json())
                .then(json => {
                  if (json.code || json.code === "rest_cookie_invalid_nonce") {
                    this.setState({
                      error: json
                    });
                  } else {
                    this.state.tagged.push(json);
                  }
                });
            }
            return;
          }
          if (queryPost.acf.gallery != undefined) {
            fetch(`${Config.apiUrl}/wp-json/db/v1/gallery/${post.acf.gallery}`)
              .then(response => response.json())
              .then(json => {
                if (json.code || json.code === "rest_cookie_invalid_nonce") {
                  this.setState({
                    error: json
                  });
                } else {
                  this.setState({ photos: json });
                }
              });
            return;
          }
          fetch(`${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`)
            .then(response => response.json())
            .then(json => {
              if (json.code || json.code === "rest_cookie_invalid_nonce") {
                this.setState({
                  error: json
                });
              } else {
                this.setState({ classifieds: json });
              }
            });
          return;
        },
        error => {
          this.setState({
            error: "yes"
          });
          queryPost = error;
        }
      );
    console.log(queryPost);
  }

  render() {
    const { post } = this.state;
    if (this.state.post == null || this.state.post == undefined) {
      return <div />;
    } else {
      if (this.state.post) {
        let renderedMeta = [];
        for (let meta of this.state.post.yoast_meta) {
          renderedMeta.push(React.createElement("meta", meta));
        }
        return (
          <>
            <Head>
              <title>
                {he.decode(this.state.post.title.rendered) + " - Daily Bruin"}
              </title>
              {renderedMeta}
            </Head>
            {this.state.photos != null && (
              <PhotoGalleryLayout
                post={this.state.post}
                photos={this.state.photos}
                photographers={this.state.authors}
              />
            )}
            {this.state.feature && (
              <FeatureLayout
                article={this.state.post}
                authors={this.state.authors}
                tagged={this.state.tagged}
                relatedPosts={this.state.relatedPosts}
              />
            )}
            {this.state.photos == undefined && this.state.feature != true && (
              <ArticleLayout
                article={this.state.post}
                authors={this.state.authors}
                relatedPosts={this.state.relatedPosts}
                classifieds={this.state.classifieds.map(c => {
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
      } else {
        return <div></div>;
      }
    }
  }
}

export default PageWrapper(Preview);
