import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../config.js";
import css from "../style.css";
import * as utilities from "../utilities";
import InfiniteScroll from "react-infinite-scroller";

import ClassifiedsCard from "../../components/ClassifiedsCard";
import AuthorCard from "../../components/AuthorCard";
import LoadingBear from "../../components/LoadingBear";

import Media from "react-media";

export default class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherArticleCards: utilities.buildArticleList(this.props.posts),
      more: true
    };
    this.getPosts = this.getPosts.bind(this);
  }

  getPosts(page) {
    fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&filter[author_name]=${this.props.author.slug}&page=${page}`
    )
      .then(response => response.json())
      .then(
        json => {
          if (json.data == undefined && json.length != 0) {
            this.setState({
              otherArticleCards: this.state.otherArticleCards.concat(
                utilities.buildArticleList(json)
              )
            });
          } else {
            this.setState({
              more: false
            });
          }
        },
        error => {
          this.setState({
            more: false
          });
        }
      )
      .catch(err =>
        this.setState({
          more: false
        })
      );
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
              <div
                id="ArticleGrid"
                style={{
                  width: "100%"
                }}
              >
                <div
                  id="c"
                  className={css.column}
                  style={{
                    width: "100%"
                  }}
                >
                  <div className={css.card}>
                    <AuthorCard
                      image={
                        this.props.author.simple_local_avatar != null
                          ? this.props.author.simple_local_avatar.full
                          : this.props.author.avatar_urls[512]
                      }
                      name={this.props.author.name}
                      position={this.props.author.acf.position}
                      description={this.props.author.description}
                      twitter={this.props.author.acf.twitter}
                      email={this.props.author.media_email}
                      link={this.props.author.link}
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
                      <LoadingBear text={"searching for more articles..."} />
                    }
                  >
                    {utilities.renderPostArray(
                      this.state.otherArticleCards,
                      "full"
                    )}
                  </InfiniteScroll>
                  {!this.state.more ? (
                    <p
                      style={{
                        color: "#404040",
                        fontFamily: "'Source Sans Pro', sans-serif",
                        textAlign: "center"
                      }}
                    >
                      no more articles!
                    </p>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
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
                  <div className={css.card}>
                    <AuthorCard
                      image={
                        this.props.author.simple_local_avatar != null
                          ? this.props.author.simple_local_avatar.full
                          : this.props.author.avatar_urls[512]
                      }
                      name={this.props.author.name}
                      description={this.props.author.description}
                      position={this.props.author.acf.position}
                      twitter={this.props.author.acf.twitter}
                      email={this.props.author.media_email}
                      link={this.props.author.link}
                    />
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
                        <LoadingBear text={"searching for more articles..."} />
                      }
                    >
                      {utilities.renderPostArray(
                        this.state.otherArticleCards,
                        "horz"
                      )}
                    </InfiniteScroll>
                    {!this.state.more ? (
                      <p
                        style={{
                          color: "#404040",
                          fontFamily: "'Source Sans Pro', sans-serif",
                          textAlign: "center"
                        }}
                      >
                        no more articles!
                      </p>
                    ) : (
                      <span></span>
                    )}
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
                      image={
                        this.props.author.simple_local_avatar != null
                          ? this.props.author.simple_local_avatar.full
                          : this.props.author.avatar_urls[512]
                      }
                      name={this.props.author.name}
                      description={this.props.author.description}
                      position={this.props.author.acf.position}
                      twitter={this.props.author.acf.twitter}
                      email={this.props.author.media_email}
                      link={this.props.author.link}
                    />
                  </div>
                  <div>
                    <InfiniteScroll
                      pageStart={1}
                      loadMore={this.getPosts}
                      hasMore={this.state.more}
                      threshold={3000}
                      loader={
                        <LoadingBear text={"searching for more articles..."} />
                      }
                    >
                      {utilities.renderPostArray(
                        this.state.otherArticleCards,
                        "long"
                      )}
                    </InfiniteScroll>
                    {!this.state.more ? (
                      <p
                        style={{
                          color: "#404040",
                          fontFamily: "'Source Sans Pro', sans-serif",
                          textAlign: "center"
                        }}
                      >
                        no more articles!
                      </p>
                    ) : (
                      <span></span>
                    )}
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
