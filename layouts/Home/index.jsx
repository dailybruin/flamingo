import React, { Component } from "react";
import PageWrapper from "../PageWrapper";
import fetch from "isomorphic-unfetch";
import Error from "next/error";

import css from "../style.css";
import * as utilities from "../utilities";
import { SizeMe } from "react-sizeme";

import ClassifiedsCard from "../../components/ClassifiedsCard";
import Poll from "../../components/Poll";
import StoryList from "../../components/StoryList";

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
    this.state = {
      aArticleCard: utilities.buildArticleCard(this.props.posts.aStory[0]),
      bArticleCard: utilities.buildArticleCard(this.props.posts.bStory[0]),
      c1ArticleCard: utilities.buildArticleCard(this.props.posts.c1Story[0]),
      c2ArticleCard: utilities.buildArticleCard(this.props.posts.c2Story[0]),
      dArticleCard: utilities.buildArticleCard(this.props.posts.dStory[0]),
      eArticleCard: utilities.buildArticleCard(this.props.posts.eStory[0]),
      f1ArticleCard: utilities.buildArticleCard(this.props.posts.f1Story[0]),
      f2ArticleCard: utilities.buildArticleCard(this.props.posts.f2Story[0]),

      m1MultimediaScroller: utilities.buildMultimediaScroller(this.props.media),

      qdStoryList: utilities.buildStoryList(
        "THE QUAD",
        this.props.posts.quadList
      ),
      nsStoryList: utilities.buildStoryList("NEWS", this.props.posts.newsList),
      opStoryList: utilities.buildStoryList(
        "OPINION",
        this.props.posts.opinionList
      ),
      aeStoryList: utilities.buildStoryList("A&E", this.props.posts.artsList),
      spStoryList: utilities.buildStoryList(
        "SPORTS",
        this.props.posts.sportsList
      )
    };
  }

  render() {
    return (
      <SizeMe monitorHeight={false}>
        {({ size }) => {
          if (size.width < 600) {
            return (
              <div id="ArticleGrid" style={{ width: "100%" }}>
                <div id="a-b" className={css.column}>
                  <div id="c1" className={css.card}>
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div id="c2" className={css.card}>
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div id="a" className={css.card}>
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div id="b" className={css.card}>
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div id="above-ad" className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                  </div>
                  <div id="qd" className={css.card}>
                    {this.state.qdStoryList}
                  </div>
                  <div id="d" className={css.card}>
                    {React.cloneElement(this.state.dArticleCard, {
                      displayType: "mini"
                    })}
                  </div>
                  <div id="e" className={css.card}>
                    {React.cloneElement(this.state.eArticleCard, {
                      displayType: "mini"
                    })}
                  </div>
                  <div id="f1" className={css.card}>
                    {React.cloneElement(this.state.f1ArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div id="f2" className={css.card}>
                    {React.cloneElement(this.state.f2ArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                </div>
              </div>
            );
          } else if (size.width < 900) {
            return (
              <div id="ArticleGrid" style={{ width: "100%" }}>
                <div
                  id="a-ad-b"
                  className={css.column}
                  style={{
                    width: "33.333%"
                  }}
                >
                  <div id="a" className={css.card}>
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: "vert"
                    })}
                  </div>
                  <div id="above-ad" className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                  </div>
                  <div id="b" className={css.card}>
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: "vert"
                    })}
                  </div>
                </div>
                <div
                  id="c1-c2"
                  className={css.column}
                  style={{
                    width: "66.666%"
                  }}
                >
                  <div id="c1" className={css.card}>
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div id="c2" className={css.card}>
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: "horz"
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
                        {React.cloneElement(this.state.dArticleCard, {
                          displayType: "mini"
                        })}
                      </div>
                      <div id="e" className={css.card}>
                        {React.cloneElement(this.state.eArticleCard, {
                          displayType: "mini"
                        })}
                      </div>
                    </div>
                    <div
                      id="qd-d-e"
                      className={css.column}
                      style={{ width: "50%" }}
                    >
                      <div id="qd" className={css.card}>
                        {this.state.qdStoryList}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
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
                      {React.cloneElement(this.state.aArticleCard, {
                        displayType: "vert"
                      })}
                    </div>
                    <div id="b" className={css.card}>
                      {React.cloneElement(this.state.bArticleCard, {
                        displayType: "vert"
                      })}
                    </div>
                    <div id="classifieds" className={css.card}>
                      <ClassifiedsCard
                        header="Featured Classifieds"
                        classifieds={[
                          {
                            category: { name: "Room for Rent", url: "./#" },
                            content: {
                              name:
                                "Female preferred to rent private furnished room with shared bath. $925 includes utilities and internet , full kitchen and laundry privileges. 1 dog and 2 cats in house. Non smoking. Julia 310-874-5908",
                              url: "./#"
                            }
                          },
                          {
                            category: {
                              name: "Apartments for Rent",
                              url: "./#"
                            },
                            content: {
                              name:
                                "Westwood 3bed + 3bath 1,712sqft Condo for lease. Laundry in-unit + 2 car gated parking space. Private rooftop terrace. $4900/M. Call Mike at 310-666-5458 for showing. Available now!",
                              url: "./#"
                            }
                          },
                          {
                            category: {
                              name: "Apartments for Rent",
                              url: "./#"
                            },
                            content: {
                              name:
                                "2 bedroom 2 1/2 bath Condo. Aproximately 2000 sq ft. $3999/month or fully furnished for $4485/month. Comfortable for 4-5 students 310-430-1626",
                              url: "./#"
                            }
                          },
                          {
                            category: { name: "Computer/Internet", url: "./#" },
                            content: {
                              name:
                                "GRAD STUDENT WANTED: I’m putting together a Kickstarter crowdfunding campaign and looking for a sharp grad student to promote it, primarily social media. Please send experience, pay rate and contact info to – ebrown@sky44.com",
                              url: "./#"
                            }
                          }
                        ]}
                      />
                    </div>
                    <div className={css.card}>
                      <div style={ArticleAdStyle}></div>
                    </div>
                    <div id="ns" className={css.card}>
                      {this.state.nsStoryList}
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
                      {React.cloneElement(this.state.c1ArticleCard, {
                        displayType: "full"
                      })}
                    </div>
                    <div id="c2" className={css.card}>
                      {React.cloneElement(this.state.c2ArticleCard, {
                        displayType: "horz"
                      })}
                    </div>
                    <div id="MultimediaScroller" className={css.card}>
                      {this.state.m1MultimediaScroller}
                    </div>
                    <div id="f1" className={css.card}>
                      {React.cloneElement(this.state.f1ArticleCard, {
                        displayType: "horz"
                      })}
                    </div>
                    <div id="f2" className={css.card}>
                      {React.cloneElement(this.state.f2ArticleCard, {
                        displayType: "horz"
                      })}
                    </div>
                    <div className={css.column} style={{ width: "50%" }}>
                      <div id="op" className={css.card}>
                        {this.state.opStoryList}
                      </div>
                    </div>
                    <div className={css.column} style={{ width: "50%" }}>
                      <div id="ae" className={css.card}>
                        {this.state.aeStoryList}
                      </div>
                    </div>
                  </div>
                  <div
                    id="right"
                    className={css.column}
                    style={{ width: "25%" }}
                  >
                    <div id="above-ad" className={css.card}>
                      <div style={ArticleAdStyle}></div>
                    </div>
                    <div id="qd" className={css.card}>
                      {this.state.qdStoryList}
                    </div>
                    <div id="d" className={css.card}>
                      {React.cloneElement(this.state.dArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div id="e" className={css.card}>
                      {React.cloneElement(this.state.eArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div id="poll" className={css.card}>
                      <Poll
                        poll={[
                          {
                            choice: "De Neve",
                            votes: 10
                          },
                          {
                            choice: "Covel",
                            votes: 90
                          },
                          {
                            choice: "Feast",
                            votes: 30
                          },
                          {
                            choice: "Bruin Plate",
                            votes: 40
                          }
                        ]}
                        question={
                          "There's a lot going on at UCLA. Tuition hikes, protests, and more fun things. That's why we're asking you this question. What's your favorite dining hall?"
                        }
                        hasVoted={false}
                        legend={"Number of Students"}
                      />
                    </div>
                    <div id="pop" className={css.card}>
                      <StoryList
                        type="POPULAR"
                        story={[
                          {
                            title: "Avengers: Infinity War",
                            text:
                              "This movie was bonker but #nospoilers because of character limit alright pals",
                            link: "https://www.youtube.com/watch?v=bleoywz0oeg"
                          },
                          {
                            title: "Bruins in the Draft",
                            text:
                              "This movie was bonker but #nospoilers because of character limit alright pals",
                            link: "#"
                          },
                          {
                            title: "#USACVote18Elections",
                            text:
                              "This movie was bonker but #nospoilers because of character limit alright pals",
                            link: "https://usac.ucla.edu/"
                          }
                        ]}
                      />
                    </div>
                    <div id="sp" className={css.card}>
                      {this.state.spStoryList}
                    </div>
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
