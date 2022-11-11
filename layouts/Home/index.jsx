import React, { Component } from "react";
import PageWrapper from "../PageWrapper";
import Error from "next/error";

import css from "../style.module.css";
import * as utilities from "../utilities";
import Media from "react-media";

import ClassifiedsCard from "../../components/ClassifiedsCard";
import Poll from "../../components/Poll";
import StoryList from "../../components/StoryList";
import SponsoredLinks from "../../components/SponsoredLinks";
import TwitterFeed from "../../components/TwitterFeed";
import * as globals from "../../components/globals";

const ArticleAdStyle = {
  width: "100%",
  backgroundColor: "#aaa",
  paddingTop: "83.333%",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "sans-serif"
};

export default class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.cards = {
      aArticleCard: utilities.buildArticleCard(this.props.posts.aStory[0],"",this.props.darkmode),
      bArticleCard: utilities.buildArticleCard(this.props.posts.bStory[0],"",this.props.darkmode),
      c1ArticleCard: utilities.buildArticleCard(this.props.posts.c1Story[0],"",this.props.darkmode),
      c2ArticleCard: utilities.buildArticleCard(this.props.posts.c2Story[0],"",this.props.darkmode),
      dArticleCard: utilities.buildArticleCard(this.props.posts.dStory[0],"",this.props.darkmode),
      eArticleCard: utilities.buildArticleCard(this.props.posts.eStory[0],"",this.props.darkmode),
      f1ArticleCard: utilities.buildArticleCard(this.props.posts.f1Story[0],"",this.props.darkmode),
      f2ArticleCard: utilities.buildArticleCard(this.props.posts.f2Story[0],"",this.props.darkmode),

      m1MultimediaScroller: utilities.buildMultimediaScroller(this.props.media),

      qdStoryList: utilities.buildStoryList(
        "THE QUAD",
        this.props.posts.quadList,
        "/category/quad",
        this.props.darkmode
      ),
      nsStoryList: utilities.buildStoryList(
        "NEWS",
        this.props.posts.newsList,
        "/category/news",
        this.props.darkmode
      ),
      enStoryList: utilities.buildStoryList(
        "ENTERPRISE",
        this.props.posts.enterpriseList,
        "/category/enterprise",
        this.props.darkmode
      ),
      opStoryList: utilities.buildStoryList(
        "OPINION",
        this.props.posts.opinionList,
        "/category/opinion",
        this.props.darkmode
      ),
      aeStoryList: utilities.buildStoryList(
        "A&E",
        this.props.posts.artsList,
        "/category/arts-entertainment",
        this.props.darkmode
      ),
      spStoryList: utilities.buildStoryList(
        "SPORTS",
        this.props.posts.sportsList,
        "/category/sports",
        this.props.darkmode
      ),
      classifieds: (<ClassifiedsCard
        
        header="Featured Classifieds"
        classifieds={this.props.classifieds}
      />),
      sponsored: (<SponsoredLinks 
        links={this.props.sponsoredLinks} 
        
      />)
    };
  }

  render() {
    return (
      <div>
        <Media
          queries={{
            phone: "(max-width: 600px)",
            tablet: "(min-width: 601px) and (max-width: 900px)",
            desktop: "(min-width: 901px)"
          }}
          defaultMatches={{ desktop: true }}
        >
          {matches => (
            <div>
              {matches.phone && (
                <div id="ArticleGrid" style={{ width: "100%" }}>
                  <div
                    id="a-b"
                    className={css.column}
                    style={{ width: "100%" }}
                  >
                    <div id="c1" className={css.card}>
                      {React.cloneElement(this.cards.c1ArticleCard, {
                        darkmode: this.props.darkmode, displayType: "full"
                      })}
                    </div>
                    <div id="c2" className={css.card}>
                      {React.cloneElement(this.cards.c2ArticleCard, {
                        darkmode: this.props.darkmode, displayType: "full"
                      })}
                    </div>
                    <div id="a" className={css.card}>
                      {React.cloneElement(this.cards.aArticleCard, {
                        darkmode: this.props.darkmode, displayType: "full"
                      })}
                    </div>
                    <div id="b" className={css.card}>
                      {React.cloneElement(this.cards.bArticleCard, {
                        darkmode: this.props.darkmode, displayType: "full"
                      })}
                    </div>
                    {this.props.mappedBreaking != null && (
                      <div className={css.card}>
                        <TwitterFeed />
                      </div>
                    )}
                    <div
                      id="above-ad"
                      style={{ textAlign: "center" }}
                      className={css.card}
                    >
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div id="qd" className={css.card}>
                      {React.cloneElement(this.cards.qdStoryList, {
                        darkmode: this.props.darkmode
                      })}
                    </div>
                    <div id="d" className={css.card}>
                      {React.cloneElement(this.cards.dArticleCard, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    <div id="e" className={css.card}>
                      {React.cloneElement(this.cards.eArticleCard, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    <div id="MultimediaScroller" className={css.card}>
                      {this.cards.m1MultimediaScroller}
                    </div>
                    {this.props.mappedBreaking == null && (
                      <div className={css.card}>
                        <TwitterFeed />
                      </div>
                    )}
                    <div id="classifieds" className={css.card}>
                      {React.cloneElement(this.cards.classifieds, {
                        darkmode: this.props.darkmode
                      })}
                    </div>
                    <div id="f1" className={css.card}>
                      {React.cloneElement(this.cards.f1ArticleCard, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    <div id="f2" className={css.card}>
                      {React.cloneElement(this.cards.f2ArticleCard, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    <div
                      id="above-ad"
                      style={{ textAlign: "center" }}
                      className={css.card}
                    >
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div id="ns" className={css.card}>
                      {React.cloneElement(this.cards.nsStoryList, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    <div id="en" className={css.card}>
                      {React.cloneElement(this.cards.enStoryList, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    <div id="op" className={css.card}>
                      {React.cloneElement(this.cards.opStoryList, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    <div id="ae" className={css.card}>
                      {React.cloneElement(this.cards.aeStoryList, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    <div id="sp" className={css.card}>
                      {React.cloneElement(this.cards.spStoryList, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                  </div>
                </div>
              )}
              {matches.tablet && (
                <div id="ArticleGrid" style={{ width: "100%" }}>
                  <div
                    id="a-ad-b"
                    className={css.column}
                    style={{
                      width: "33.333%"
                    }}
                  >
                    <div id="a" className={css.card}>
                      {React.cloneElement(this.cards.aArticleCard, {
                        darkmode: this.props.darkmode, displayType: "vert"
                      })}
                    </div>
                    <div
                      id="above-ad"
                      className={css.card}
                      style={{ textAlign: "center" }}
                    >
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div id="b" className={css.card}>
                      {React.cloneElement(this.cards.bArticleCard, {
                        darkmode: this.props.darkmode, displayType: "vert"
                      })}
                    </div>
                    <div id="qd" className={css.card}>
                      {React.cloneElement(this.cards.qdStoryList, {
                        darkmode: this.props.darkmode
                      })}
                    </div>
                    <div id="classifieds" className={css.card}>
                      {React.cloneElement(this.cards.classifieds, {
                        darkmode: this.props.darkmode
                      })}
                    </div>
                    <div id="f1" className={css.card}>
                      {React.cloneElement(this.cards.f1ArticleCard, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    {this.props.mappedBreaking != null && (
                      <div className={css.card}>
                        <TwitterFeed />
                      </div>
                    )}
                    <div
                      id="above-ad"
                      style={{ textAlign: "center" }}
                      className={css.card}
                    >
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div id="f2" className={css.card}>
                      {React.cloneElement(this.cards.f2ArticleCard, {
                        darkmode: this.props.darkmode, displayType: "mini"
                      })}
                    </div>
                    {this.props.mappedBreaking == null && (
                      <div className={css.card}>
                        <TwitterFeed />
                      </div>
                    )}
                  </div>
                  <div
                    id="c1-c2"
                    className={css.column}
                    style={{
                      width: "66.666%"
                    }}
                  >
                    <div id="c1" className={css.card}>
                      {React.cloneElement(this.cards.c1ArticleCard, {
                        darkmode: this.props.darkmode, displayType: "full"
                      })}
                    </div>
                    <div id="c2" className={css.card}>
                      {React.cloneElement(this.cards.c2ArticleCard, {
                        darkmode: this.props.darkmode, displayType: "horz"
                      })}
                    </div>
                    <div
                      id="qd-d-e"
                      className={css.column}
                      style={{ width: "100%" }}
                    >
                      <div
                        id="qd-d-e"
                        className={css.column}
                        style={{ width: "50%" }}
                      >
                        <div id="d" className={css.card}>
                          {React.cloneElement(this.cards.dArticleCard, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div
                        id="qd-d-e"
                        className={css.column}
                        style={{ width: "50%" }}
                      >
                        <div id="e" className={css.card}>
                          {React.cloneElement(this.cards.eArticleCard, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div id="MultimediaScroller" className={css.card}>
                        {this.cards.m1MultimediaScroller}
                      </div>
                      <div className={css.column} style={{ width: "50%" }}>
                        <div id="ns" className={css.card}>
                          {React.cloneElement(this.cards.nsStoryList, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                        <div id="en" className={css.card}>
                          {React.cloneElement(this.cards.enStoryList, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                        <div id="ae" className={css.card}>
                          {React.cloneElement(this.cards.aeStoryList, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div className={css.column} style={{ width: "50%" }}>
                        <div id="op" className={css.card}>
                          {React.cloneElement(this.cards.opStoryList, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                        <div id="sp" className={css.card}>
                        {React.cloneElement(this.cards.spStoryList, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div className={css.column} style={{ width: "100%" }}>
                        <div className={css.card}>
                          <a href="https://prime.dailybruin.com">
                            <img
                              src="https://wp.dailybruin.com/images/2020/09/prime_mainsite.jpg"
                              style={{ width: "100%" }}
                            />
                          </a>
                        </div>
                        <div className={css.card}>
                          {React.cloneElement(this.cards.sponsored, {
                            darkmode: this.props.darkmode
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {matches.desktop && (
                <div id="ArticleGrid" style={{ width: "100%" }}>
                  <div>
                    <div
                      id="left"
                      className={css.column}
                      style={{
                        width: "25%"
                      }}
                    >
                      <div id="a" className={css.card}>
                        {React.cloneElement(this.cards.aArticleCard, {
                          darkmode: this.props.darkmode, displayType: "vert"
                        })}
                      </div>
                      <div id="b" className={css.card}>
                        {React.cloneElement(this.cards.bArticleCard, {
                          darkmode: this.props.darkmode, displayType: "vert"
                        })}
                      </div>
                      <div id="classifieds" className={css.card}>
                        {React.cloneElement(this.cards.classifieds, {
                          darkmode: this.props.darkmode
                        })}
                      </div>
                      <div style={{ textAlign: "center" }} className={css.card}>
                        <broadstreet-zone zone-id="69405"></broadstreet-zone>
                      </div>
                      <div id="ns" className={css.card}>
                      {React.cloneElement(this.cards.nsStoryList, {
                          darkmode: this.props.darkmode
                        })}
                      </div>
                      <div id="en" className={css.card}>
                      {React.cloneElement(this.cards.enStoryList, {
                          darkmode: this.props.darkmode
                        })}
                      </div>
                    </div>
                    <div
                      id="center"
                      className={css.column}
                      style={{
                        width: "50%"
                      }}
                    >
                      <div id="c1" className={css.card}>
                        {React.cloneElement(this.cards.c1ArticleCard, {
                          darkmode: this.props.darkmode, displayType: "full"
                        })}
                      </div>
                      <div id="c2" className={css.card}>
                        {React.cloneElement(this.cards.c2ArticleCard, {
                          darkmode: this.props.darkmode, displayType: "horz"
                        })}
                      </div>
                      <div id="MultimediaScroller" className={css.card}>
                        {this.cards.m1MultimediaScroller}
                      </div>
                      <div id="f1" className={css.card}>
                        {React.cloneElement(this.cards.f1ArticleCard, {
                          darkmode: this.props.darkmode, displayType: "horz"
                        })}
                      </div>
                      <div id="f2" className={css.card}>
                        {React.cloneElement(this.cards.f2ArticleCard, {
                          darkmode: this.props.darkmode, displayType: "horz"
                        })}
                      </div>
                      <div className={css.column} style={{ width: "50%" }}>
                        <div id="op" className={css.card}>
                          {React.cloneElement(this.cards.opStoryList, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div className={css.column} style={{ width: "50%" }}>
                        <div id="ae" className={css.card}>
                          {React.cloneElement(this.cards.aeStoryList, {
                            darkmode: this.props.darkmode, displayType: "mini"
                          })}
                        </div>
                      </div>
                    </div>
                    <div
                      id="right"
                      className={css.column}
                      style={{ width: "25%" }}
                    >
                      {this.props.mappedBreaking != null && (
                        <div className={css.card}>
                          <TwitterFeed />
                        </div>
                      )}
                      <div
                        id="above-ad"
                        className={css.card}
                        style={{ textAlign: "center" }}
                      >
                        <broadstreet-zone zone-id="69405"></broadstreet-zone>
                      </div>
                      <div id="qd" className={css.card}>
                        {React.cloneElement(this.cards.qdStoryList, {
                          darkmode: this.props.darkmode
                        })}
                      </div>
                      <div id="d" className={css.card}>
                        {React.cloneElement(this.cards.dArticleCard, {
                          darkmode: this.props.darkmode, displayType: "mini"
                        })}
                      </div>
                      <div id="e" className={css.card}>
                        {React.cloneElement(this.cards.eArticleCard, {
                          darkmode: this.props.darkmode, displayType: "mini"
                        })}
                      </div>
                      {this.props.mappedBreaking == null && (
                        <div className={css.card}>
                          <TwitterFeed />
                        </div>
                      )}
                      <div id="sp" className={css.card}>
                      {React.cloneElement(this.cards.spStoryList, {
                          darkmode: this.props.darkmode
                        })}
                      </div>
                      <div className={css.card}>
                        <a href="https://prime.dailybruin.com">
                          <img
                            src="https://wp.dailybruin.com/images/2020/09/prime_mainsite.jpg"
                            style={{ width: "100%", height: "auto" }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* <div className={css.column} style={{ width: "50%" }}>
                      <div className={css.card}>
                        <a href="https://prime.dailybruin.com">
                          <img
                            src="https://dailybruin.com/images/2020/06/Image-from-iOS.jpg"
                            style={{ width: "100%" }}
                          />
                        </a>
                      </div>
                    </div> */}
                    <div className={css.column} style={{ width: "50%" }}>
                      <div className={css.card}>
                        {React.cloneElement(this.cards.sponsored, {
                          darkmode: this.props.darkmode
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Media>
      </div>
    );
  }
}
