import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import css from "../style.module.css";
import * as utilities from "../utilities";
import InfiniteScroll from "react-infinite-scroller";
import Media from "react-media";

import LoadingBear from "../../components/LoadingBear";
import ClassifiedsCard from "../../components/ClassifiedsCard";

export default class PodcastsLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otherArticleCards: utilities.buildArticleList(this.props.posts, this.props.darkmode),

      more: true
    };
    this.getPosts = this.getPosts.bind(this);

    this.classifiedsCards = (
      <ClassifiedsCard
        header="Featured Classifieds"
        classifieds={this.props.classifieds}
      />
    )
  }

  getPosts(page) {
    fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${this.props.categoryID}&page=${page}`
    )
      .then(response => response.json())
      .then(
        json => {
          if (json.data == undefined) {
            this.setState({
              otherArticleCards: this.state.otherArticleCards.concat(
                utilities.buildArticleList(json, this.props.darkmode)
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
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={this.getPosts}
                    hasMore={this.state.more}
                    threshold={3000}
                    loader={
                      <LoadingBear text={"searching for more podcasts..."} />
                    }
                  >
                    {utilities.renderPodcastArray(
                      this.state.otherArticleCards,
                      "podcast",
                      this.props.darkmode
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
                    width: "66.666%"
                  }}
                >
                  <div>
                    <InfiniteScroll
                      pageStart={1}
                      loadMore={this.getPosts}
                      hasMore={this.state.more}
                      threshold={3000}
                      loader={
                        <LoadingBear text={"searching for more podcasts..."} />
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          alignContent: "stretch",
                          flexWrap: "wrap"
                        }}
                      >
                        {utilities.renderPodcastArray(
                          this.state.otherArticleCards,
                          "podcast",
                          this.props.darkmode
                        )}
                      </div>
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
                  <div id="classifieds" className={css.card}>
                    {React.cloneElement(this.classifiedsCards, {
                        darkmode: this.props.darkmode
                    })}
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
                  <div>
                    <InfiniteScroll
                      pageStart={1}
                      loadMore={this.getPosts}
                      hasMore={this.state.more}
                      threshold={3000}
                      loader={
                        <LoadingBear text={"searching for more podcasts..."} />
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          alignContent: "stretch",
                          flexWrap: "wrap"
                        }}
                      >
                        {utilities.renderPodcastArray(
                          this.state.otherArticleCards,
                          "podcast",
                          this.props.darkmode
                        )}
                      </div>
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
                    {React.cloneElement(this.classifiedsCards, {
                        darkmode: this.props.darkmode
                    })}
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
