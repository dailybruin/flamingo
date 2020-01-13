import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../config.js";

import css from "./style.css";

import { SizeMe } from "react-sizeme";
import Article from "../../components/Article";

const ArticleAdStyle = {
  width: "100%",
  backgroundColor: "#aaa",
  height: "250px",
  lineHeight: "200px",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "sans-serif"
};

class PostLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: (
        <Article
          headline={this.props.article.title.rendered}
          date={new Date(this.props.article.date)}
          authors={[
            {
              name: this.props.article["_embedded"].author[0].name,
              url: "/author/[slug]",
              as: this.props.article["_embedded"].author[0].link,
              bio: this.props.article["_embedded"].author[0].description,
            }
          ]}
          category={{
            name: this.props.article["_embedded"]["wp:term"][0][0].name,
            url: `/category/[slug]`,
            as: `/category/${this.props.article["_embedded"]["wp:term"][0][0].slug}`
          }}
          featureimg={
            this.props.article["_embedded"]["wp:featuredmedia"][0].source_url
          }
          authorimg={
            this.props.article["_embedded"].author[0]["avatar_urls"][96]
          }
          content={this.props.article.content.rendered}
        />
      )
    };
  }

  render() {
    return (
      <SizeMe monitorHeight={false}>
        {({ size }) => {
          if (size.width < 600) {
            return <p></p>;
          } else if (size.width < 900) {
            return <p></p>;
          } else {
            return (
              <div id="ArticleGrid" style={{ width: "100%" }}>
                <div
                  id="article"
                  className={css.column}
                  style={{
                    width: "75%",
                  }}
                >
                  <div className={css.card}>
                    {this.state.article}
                  </div>
                </div>
                <div
                  id="extras"
                  className={css.column}
                  style={{
                    width: "25%"
                  }}
                >
                  <div className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                  </div>
                </div>
              </div>
            );
          }
        }}
      </SizeMe>
    );
  }
}

export default PostLayout;
