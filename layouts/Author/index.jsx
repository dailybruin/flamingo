import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../config.js";
import css from "../style.css";
import * as utilities from "../utilities";
import InfiniteScroll from "react-infinite-scroller";

import ClassifiedsCard from "../../components/ClassifiedsCard";
import AuthorCard from "../../components/AuthorCard";

import Media from "react-media";

export default class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // aArticleCard: utilities.buildArticleCard(this.props.posts[0]),
      otherArticleCards: utilities.buildArticleList(this.props.posts.slice(1)),

      more: true
    };
    // this.getPosts = this.getPosts.bind(this)
    this.getPosts = this.getPosts.bind(this);
  }

  getPosts(page) {
    fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&author=${this.props.author.id}&page=${page}`
    )
      .then(response => response.json())
      .then(json => {
        if (json.data == undefined) {
          this.setState({
            otherArticleCards: this.state.otherArticleCards.concat(
              utilities.buildArticleList(json)
            )
          });
        } else {
          this.setState({ more: false });
        }
      });
  }

  render() {
    return (
      <Media
        queries={{
          phone: "(max-width: 600px)",
          tablet: "(min-width: 601px) and (max-width: 900px)",
          desktop: "(min-width: 901px)"
        }}
        defaultMatches={{ desktop: true }}
      >
        {matches => (
          <>
            {matches.phone && (
              // <div
              //   id="ArticleGrid"
              //   style={{
              //     width: "100%"
              //   }}
              // >
                <div
                  id="c"
                  className={css.column}
                  style={{
                    width: "100%"
                  }}
                >
                  <div className={css.card}>
                    <AuthorCard
                      image={this.props.author["avatar_urls"][512]}
                      name={this.props.author.name}
                      position={this.props.author.acf.position}
                      twitter={this.props.author.acf.twitter}
                      email={this.props.author.media_email}
                    />
                  </div>
                  {/* <div id="c1" className={css.card}>
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: "full"
                    })}
                  </div> */}
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={this.getPosts}
                    hasMore={this.state.more}
                    threshold={3000}
                    loader={
                      <div className="loader" key={0}>
                        loading...
                      </div>
                    }
                  >
                    {utilities.renderPostArray(
                      this.state.otherArticleCards,
                      "full"
                    )}
                  </InfiniteScroll>
                </div>
              // </div>
            )}
            {matches.tablet && (
              <div id="ArticleGrid" style={{ width: "100%" }}>
                <div
                  id="a-ad-b"
                  className={css.column}
                  style={{
                    width: "100%"
                  }}
                >
                  <div
                    id="c1-c2"
                    className={css.column}
                    style={{
                      width: "33.33%"
                    }}
                  >
                    <div className={css.card}>
                      <AuthorCard
                        image={this.props.author["avatar_urls"][512]}
                        name={this.props.author.name}
                        position={this.props.author.acf.position}
                        twitter={this.props.author.acf.twitter}
                        email={this.props.author.media_email}
                      />
                    </div>
                  </div>
                  {/* <div
                    id="a"
                    className={css.column}
                    style={{
                      width: "66.66%"
                    }}
                  >
                    <div id="a" className={css.card}>
                      {React.cloneElement(this.state.aArticleCard, {
                        displayType: "full"
                      })}
                    </div>
                  </div> */}
                </div>
                <div className={css.column} style={{ width: "66.66%" }}>
                  <div>
                    <InfiniteScroll
                      pageStart={1}
                      loadMore={this.getPosts}
                      hasMore={this.state.more}
                      threshold={3000}
                      loader={
                        <div className="loader" key={0}>
                          <h1>loading...</h1>
                        </div>
                      }
                    >
                      {utilities.renderPostArray(
                        this.state.otherArticleCards,
                        "horz"
                      )}
                    </InfiniteScroll>
                  </div>
                </div>
                <div
                  id="c1-c2"
                  className={css.column}
                  style={{
                    width: "33.333%"
                  }}
                >
                  <div id="above-ad" className={css.card}>
                    <broadstreet-zone zone-id="69405"></broadstreet-zone>
                  </div>
                  <div id="classifieds" className={css.card}>
                    <ClassifiedsCard
                      header="Featured Classifieds"
                      classifieds={this.props.classifieds}
                    />
                  </div>
                </div>
              </div>
            )}
            {matches.desktop && (
              <div id="ArticleGrid" style={{ width: "100%" }}>
                <div
                  id="Articles"
                  className={css.column}
                  style={{ width: "75%" }}
                >
                  <div
                    id="c1-c2"
                    className={css.column}
                    style={{
                      width: "33.33%"
                    }}
                  >
                  </div>
                  {/* <div
                    id="a"
                    className={css.column}
                    style={{
                      width: "100%"
                    }}
                  >
                    <div id="a" className={css.card}>
                      {React.cloneElement(this.state.aArticleCard, {
                        displayType: "full"
                      })}
                    </div>
                  </div> */}
                  <div className={css.card}>
                      <AuthorCard
                        image={this.props.author["avatar_urls"][512]}
                        name={this.props.author.name}
                        description={this.props.author.description}
                        position={this.props.author.acf.position}
                        twitter={this.props.author.acf.twitter}
                        email={this.props.author.media_email}
                      />
                    </div>
                  <div>
                    <InfiniteScroll
                      pageStart={1}
                      loadMore={this.getPosts}
                      hasMore={this.state.more}
                      threshold={3000}
                      loader={
                        <div className="loader" key={0}>
                          loading...
                        </div>
                      }
                    >
                      {utilities.renderPostArray(
                        this.state.otherArticleCards,
                        "long"
                      )}
                    </InfiniteScroll>
                  </div>
                </div>

                <div
                  id="qd-d-e"
                  className={css.column}
                  style={{ width: "25%" }}
                >
                  <div id="above-ad" className={css.card}>
                    <broadstreet-zone zone-id="69405"></broadstreet-zone>
                  </div>
                  <div id="classifieds" className={css.card}>
                    <ClassifiedsCard
                      header="Featured Classifieds"
                      classifieds={this.props.classifieds}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Media>
    );
  }
}
