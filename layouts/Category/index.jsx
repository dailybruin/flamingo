import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import css from "../style.module.css";
import * as utilities from "../utilities";
import InfiniteScroll from "react-infinite-scroller";
import Media from "react-media";

import LoadingBear from "../../components/LoadingBear";
import ClassifiedsCard from "../../components/ClassifiedsCard";

export default class CategoryLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aArticleCard: utilities.buildArticleCard(this.props.posts[0]),
      bArticleCard: utilities.buildArticleCard(this.props.posts[1]),
      cArticleCard: utilities.buildArticleCard(this.props.posts[2]),
      otherArticleCards: utilities.buildArticleList(this.props.posts.slice(3)),

      more: true
    };
    this.getPosts = this.getPosts.bind(this);
  }

  getPosts(page) {
    fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${this.props.categoryID}&page=${page}`
    )
      .then(response => response.json())
      .then(
        json => {
          if (json.data == undefined && json.length != 0) {
            // Trim posts to reduce memory usage
            const trimmedPosts = utilities.trimClientPosts(json);
            this.setState({
              otherArticleCards: this.state.otherArticleCards.concat(
                utilities.buildArticleList(trimmedPosts)
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

  // TODO: DO NOT HARDOCODE THIS. MAKE SIDEBAR CUSTOMIZABLE.
  renderGraphic() {
    /* 
     * Only render graphic on Men's and 
     * Women's basketball pages
     */
    const id = Number(this.props.categoryID);
    if (id !== 1437 && id !== 1447) return null;

    return (
      <a
        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vT5wKo3pYx1tOLT3bCv5ayFTunUjV4uLo3y1j2917FubRVxdR3W-iIS5pidFG5zn10yswHRTcUgkszy/pubchart?oid=886287258&format=interactive"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          textDecoration: "none",
          paddingLeft: "5px",
          paddingRight: "5px",
          marginBottom: "5px"
        }}
      >
        <img
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT5wKo3pYx1tOLT3bCv5ayFTunUjV4uLo3y1j2917FubRVxdR3W-iIS5pidFG5zn10yswHRTcUgkszy/pubchart?oid=886287258&format=image"
          alt="Click to view full chart"
          title="Click to view full chart"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
          }}
        />
      </a>
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
                {/* TODO: Make this more customizable, not hard coded. */}
                {this.renderGraphic()}
                <div
                  id="c"
                  className={css.column}
                  style={{
                    width: "100%"
                  }}
                >
                  <div id="c1" className={css.card}>
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div id="c2" className={css.card}>
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div id="c2" className={css.card}>
                    {React.cloneElement(this.state.cArticleCard, {
                      displayType: "full"
                    })}
                  </div>
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
                    width: "66.666%"
                  }}
                >
                  <div id="a" className={css.card}>
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: "full"
                    })}
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
                  <div id="c1" className={css.card}>
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: "vert"
                    })}
                  </div>
                  <div id="c2" className={css.card}>
                    {React.cloneElement(this.state.cArticleCard, {
                      displayType: "mini"
                    })}
                  </div>
                  {/* TODO: Make this more customizable, not hard coded. */}
                  {this.renderGraphic()}
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
                  </div>
                  {/*a-b*/}
                  <div
                    id="c1-c2"
                    className={css.column}
                    style={{
                      width: "33.33%"
                    }}
                  >
                    <div id="c1" className={css.card}>
                      {React.cloneElement(this.state.bArticleCard, {
                        displayType: "vert"
                      })}
                    </div>
                    <div id="c2" className={css.card}>
                      {React.cloneElement(this.state.cArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                  </div>
                  {/*c1-c2*/}
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
                  {/* TODO: Make this more customizable, not hard coded. */}
                  {this.renderGraphic()}
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
