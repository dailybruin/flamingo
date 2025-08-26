import React, { Component } from "react";
import PageWrapper from "../PageWrapper";
import Error from "next/error";

import css from "../style.module.css";
import * as utilities from "../clickboard_utilities";
import Media from "react-media";

import ClassifiedsCard from "../../components/ClassifiedsCard";
import Poll from "../../components/Poll";
import SponsoredLinks from "../../components/SponsoredLinks";
import TwitterFeed from "../../components/TwitterFeed";
import GamesCard from "components/GamesCard/GamesCard";
import Link from "next/link";

const ArticleAdStyle = {
  width: "100%",
  backgroundColor: "#aaa",
  paddingTop: "83.333%",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "sans-serif"
};

const sectionNameStyle = {
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  textAlign: "center",
  marginTop: "4px"
};

export default class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.cards = {
      aArticleCard: utilities.buildArticleCard(this.props.posts.aStory[0]),
      bArticleCard: utilities.buildArticleCard(this.props.posts.bStory[0]),
      c1ArticleCard: utilities.buildArticleCard(this.props.posts.c1Story[0]),
      c2ArticleCard: utilities.buildArticleCard(this.props.posts.c2Story[0]),
      dArticleCard: utilities.buildArticleCard(this.props.posts.dStory[0]),
      eArticleCard: utilities.buildArticleCard(this.props.posts.eStory[0]),
      f1ArticleCard: utilities.buildArticleCard(this.props.posts.f1Story[0]),
      f2ArticleCard: utilities.buildArticleCard(this.props.posts.f2Story[0]),
      gArticleCard: utilities.buildStoryList("", this.props.posts.gStory, ""),
      hArticleCard: utilities.buildStoryList("", this.props.posts.hStory, ""),
      iArticleCard: utilities.buildStoryList("", this.props.posts.iStory, ""),
      jArticleCard: utilities.buildStoryList("", this.props.posts.jStory, ""),
      kArticleCard: utilities.buildStoryList("", this.props.posts.kStory, ""),
      lArticleCard: utilities.buildStoryList("", this.props.posts.lStory, "")
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
                        displayType: "full"
                      })}
                    </div>
                    <div id="c2" className={css.card}>
                      {React.cloneElement(this.cards.c2ArticleCard, {
                        displayType: "full"
                      })}
                    </div>
                    <div id="a" className={css.card}>
                      {React.cloneElement(this.cards.aArticleCard, {
                        displayType: "full"
                      })}
                    </div>
                    <div id="b" className={css.card}>
                      {React.cloneElement(this.cards.bArticleCard, {
                        displayType: "full"
                      })}
                    </div>
                    {this.props.mappedBreaking != null && (
                      <div className={css.card}>
                        <img />
                      </div>
                    )}
                    <div id="g" className={css.card}>
                      {this.cards.gArticleCard}
                    </div>
                    <div id="d" className={css.card}>
                      {React.cloneElement(this.cards.dArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div id="e" className={css.card}>
                      {React.cloneElement(this.cards.eArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    {this.props.mappedBreaking == null && (
                      <div className={css.card}></div>
                    )}
                    <div id="f1" className={css.card}>
                      {React.cloneElement(this.cards.f1ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div id="f2" className={css.card}>
                      {React.cloneElement(this.cards.f2ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div id="i" className={css.card}>
                      {this.cards.iArticleCard}
                    </div>
                    <div id="j" className={css.card}>
                      {this.cards.jArticleCard}
                    </div>
                    <div id="k" className={css.card}>
                      {this.cards.kArticleCard}
                    </div>
                    <div id="l" className={css.card}>
                      {this.cards.lArticleCard}
                    </div>
                    <div id="h" className={css.card}>
                      {this.cards.hArticleCard}
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
                        displayType: "vert"
                      })}
                    </div>
                    <div id="b" className={css.card}>
                      {React.cloneElement(this.cards.bArticleCard, {
                        displayType: "vert"
                      })}
                    </div>
                    <div id="g" className={css.card}>
                      {this.cards.gArticleCard}
                    </div>
                    <div id="f1" className={css.card}>
                      {React.cloneElement(this.cards.f1ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    {this.props.mappedBreaking != null && (
                      <div className={css.card}></div>
                    )}
                    <div id="f2" className={css.card}>
                      {React.cloneElement(this.cards.f2ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    {this.props.mappedBreaking == null && (
                      <div className={css.card}></div>
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
                        displayType: "full"
                      })}
                    </div>
                    <div id="c2" className={css.card}>
                      {React.cloneElement(this.cards.c2ArticleCard, {
                        displayType: "horz"
                      })}
                    </div>
                    <div
                      id="g-d-e"
                      className={css.column}
                      style={{ width: "100%" }}
                    >
                      <div
                        id="g-d-e"
                        className={css.column}
                        style={{ width: "50%" }}
                      >
                        <div id="d" className={css.card}>
                          {React.cloneElement(this.cards.dArticleCard, {
                            displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div
                        id="g-d-e"
                        className={css.column}
                        style={{ width: "50%" }}
                      >
                        <div id="e" className={css.card}>
                          {React.cloneElement(this.cards.eArticleCard, {
                            displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div className={css.column} style={{ width: "50%" }}>
                        <div id="i" className={css.card}>
                          {this.cards.iArticleCard}
                        </div>
                        <div id="j" className={css.card}>
                          {this.cards.jArticleCard}
                        </div>
                        <div id="l" className={css.card}>
                          {this.cards.lArticleCard}
                        </div>
                      </div>
                      <div className={css.column} style={{ width: "50%" }}>
                        <div id="k" className={css.card}>
                          {this.cards.kArticleCard}
                        </div>
                        <div id="h" className={css.card}>
                          {this.cards.hArticleCard}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css.card}>
                    <SponsoredLinks links={this.props.sponsoredLinks} />
                  </div>
                </div>
              )}
              {matches.desktop && (
                <div style={{ width: "100%" }}>
                  <div id="ads-grid" style={{ display: "flex", width: "100%" }}>
                    {/* LEFT */}
                    <div
                      id="left"
                      className={css.column}
                      style={{ width: "20%" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          borderBottom: "3px solid black"
                        }}
                      />
                      <h1 style={sectionNameStyle}>What's New?</h1>
                      <div id="a" className={css.card}>
                        {React.cloneElement(this.cards.aArticleCard, {
                          displayType: "vert"
                        })}
                      </div>
                      <div id="e" className={css.card}>
                        {React.cloneElement(this.cards.eArticleCard, {
                          displayType: "mini"
                        })}
                      </div>
                    </div>

                    {/* MIDDLE */}
                    <div
                      id="middle"
                      className={css.column}
                      style={{ width: "60%" }}
                    >
                      <div id="a" className={css.card}>
                        {React.cloneElement(this.cards.aArticleCard, {
                          displayType: "vert"
                        })}
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div
                      id="right"
                      className={css.column}
                      style={{ width: "20%" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          borderBottom: "3px solid black"
                        }}
                      />
                      <h1 style={sectionNameStyle}>Reviews</h1>
                      <div id="a" className={css.card}>
                        {React.cloneElement(this.cards.aArticleCard, {
                          displayType: "vert"
                        })}
                      </div>
                      <div id="e" className={css.card}>
                        {React.cloneElement(this.cards.eArticleCard, {
                          displayType: "mini"
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Section Break - Thick Black Line */}
                  <div
                    style={{
                      width: "100%",
                      borderBottom: "6px solid black"
                    }}
                  />
                  {/* For loop through each category and display */}
                  <h1 style={sectionNameStyle}>Category 1</h1>

                  {/* Section Break - Thick Black Line */}
                  <div
                    style={{
                      width: "100%",
                      borderBottom: "6px solid black"
                    }}
                  />
                  {/* For loop through each category and display */}
                  <h1 style={sectionNameStyle}>Category 2</h1>
                </div>
              )}
            </div>
          )}
        </Media>
      </div>
    );
  }
}
