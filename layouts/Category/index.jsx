import React, { Component } from "react";
import Error from "next/error";
import css from "../style.module.css";

import { fetchPostsFromCategoryIdPaginated } from "../../lib/fetchWordPress";
import * as utilities from "../utilities";
import InfiniteScroll from "react-infinite-scroller";
import Media from "react-media";

import LoadingBear from "../../components/LoadingBear";
import ClassifiedsCard from "../../components/ClassifiedsCard";
import PrimeLatest from "../../components/PrimeLatest";
import PrimeArchiveCard from "../../components/PrimeArchiveCard";

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
    fetchPostsFromCategoryIdPaginated(this.props.categoryID, page)
      .then(posts => {
        if (posts && posts.length > 0) {
          this.setState({
            otherArticleCards: this.state.otherArticleCards.concat(
              utilities.buildArticleList(posts)
            )
          });
        } else {
          this.setState({ more: false });
        }
      })
      .catch(() => this.setState({ more: false }));
  }

  /* Get the sidebar graphic for this category, if it exists */
  renderGraphic() {
    const { sidebarGraphic } = this.props;

    // 1. Ensure sidebarGraphic object exists (it might be null from the parent)
    // 2. Ensure an image URL is actually present
    if (!sidebarGraphic || !sidebarGraphic.imageUrl) {
      return null;
    }

    return (
      <a
        href={sidebarGraphic.link || sidebarGraphic.imageUrl} // Fallback to imageUrl if link is missing
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
          src={sidebarGraphic.imageUrl}
          alt="Section Sidebar Graphic"
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

  /* "The Latest" -- only on PRIME, and only once the archive is actually serving.
   * The stories are picked weekly in getInitialProps so the server and the
   * browser agree; this just draws what it was handed. */
  renderPrimeLatest(showExcerpt = true) {
    const { primeLatest } = this.props;

    if (!primeLatest || primeLatest.length === 0) {
      return null;
    }

    return (
      <div className={css.card}>
        <PrimeLatest articles={primeLatest} showExcerpt={showExcerpt} />
      </div>
    );
  }

  /* The way into the frozen archive. Same gate as the sidebar -- both link into
   * /prime/*, which 404s until the Worker routes are bound. */
  renderPrimeArchiveCard(compact = false) {
    if (!this.props.showPrimeArchiveCard) {
      return null;
    }

    return (
      <div className={css.card}>
        <PrimeArchiveCard compact={compact} />
      </div>
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

                  {/* No right rail and no classifieds box exist on phone, so
                      "above the classifieds" has nowhere to land. These drop
                      into the stack instead of disappearing -- most of our
                      readers are on a phone. */}
                  {this.renderPrimeLatest()}
                  {this.renderPrimeArchiveCard(true)}

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
                  {this.renderPrimeArchiveCard()}
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

                  {/* Excerpts are dropped here -- the tablet rail is a third of
                      768px and three lines of dek per story pushes classifieds
                      off the screen. */}
                  {this.renderPrimeLatest(false)}

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
                  {this.renderPrimeArchiveCard()}
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
                  {/* Editors asked for this above the classifieds box; it goes
                      at the top of the rail so it clears the fold. */}
                  {this.renderPrimeLatest()}

                  <div id="above-ad" className={css.card}>
                    <broadstreet-zone zone-id="69405"></broadstreet-zone>
                  </div>

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
