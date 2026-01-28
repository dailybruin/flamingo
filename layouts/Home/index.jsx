import React, { Component } from "react";
import Image from "next/image";
import css from "../style.module.css";
import * as utilities from "../utilities";
import Media from "react-media";

import ClassifiedsCard from "../../components/ClassifiedsCard";
import SponsoredLinks from "../../components/SponsoredLinks";
import GamesCard from "components/GamesCard/GamesCard";

export default class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.cards = {
      aArticleCard: utilities.buildArticleCard(this.props.posts.aStory[0]),
      bArticleCard: utilities.buildArticleCard(this.props.posts.bStory[0]),
      c1ArticleCard: utilities.buildArticleCard(this.props.posts.c1Story[0]),
      c2ArticleCard: utilities.buildArticleCard(this.props.posts.c2Story[0]),
      d1ArticleCard: utilities.buildArticleCard(this.props.posts.d1Story[0]),
      d2ArticleCard: utilities.buildArticleCard(this.props.posts.d2Story[0]),
      f1ArticleCard: utilities.buildArticleCard(this.props.posts.f1Story[0]),
      f2ArticleCard: utilities.buildArticleCard(this.props.posts.f2Story[0]),

      m1MultimediaScroller: utilities.buildMultimediaScroller(this.props.media),

      gArticleCard: utilities.buildStoryList(
                "",
        this.props.posts.gStory,
        "",
        true
      ),
      hArticleCard: utilities.buildStoryList(
        "",
        this.props.posts.hStory,
        ""
      ),
      iArticleCard: utilities.buildStoryList(
        "",
        this.props.posts.iStory,
        ""
      ),
      jArticleCard: utilities.buildStoryList(
        "",
        this.props.posts.jStory,
        ""
      ),
      kArticleCard: utilities.buildStoryList(
        "",
        this.props.posts.kStory,
        ""
      ),
      lArticleCard: utilities.buildStoryList(
        "",
        this.props.posts.lStory,
        ""
      )
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
                        displayType: "full",
                        priority: true
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
                    <div id="c2" className={css.card}>
                      {React.cloneElement(this.cards.c2ArticleCard, {
                        displayType: "full"
                      })}
                    </div>
                    {this.props.mappedBreaking != null && (
                      <div className={css.card}>
                        <img />
                      </div>
                    )}
                    <div
                      id="above-ad"
                      style={{ textAlign: "center" }}
                      className={css.card}
                    >
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div id="g" className={css.card}>
                      {this.cards.gArticleCard}
                    </div>
                    <div id="d1" className={css.card}>
                      {React.cloneElement(this.cards.d1ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div id="d2" className={css.card}>
                      {React.cloneElement(this.cards.d2ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div id="MultimediaScroller" className={css.card}>
                      {this.cards.m1MultimediaScroller}
                    </div>
                    {this.props.mappedBreaking == null && (
                      <div className={css.card}>
                      </div>
                    )}
                    <div id="classifieds" className={css.card}>
                      <ClassifiedsCard
                        header="Featured Classifieds"
                        classifieds={this.props.classifieds}
                      />
                    </div>
                    <div id="f1" className={css.card}>
                      {React.cloneElement(this.cards.f1ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div id="i" className={css.card}>
                        {this.cards.iArticleCard}
                    </div>
                    <div id="f2" className={css.card}>
                      {React.cloneElement(this.cards.f2ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    <div
                      id="above-ad"
                      style={{ textAlign: "center" }}
                      className={css.card}
                    >
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div id="h" className={css.card}>
                      {this.cards.hArticleCard}
                    </div>
                    <div id="j" className={css.card}>
                      {this.cards.jArticleCard}
                    </div>
                    <div
                      id="above-ad"
                      style={{ textAlign: "center" }}
                      className={css.card}
                    >
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div id="k" className={css.card}>
                        {this.cards.kArticleCard}
                    </div>
                    <div id="l" className={css.card}>
                          {this.cards.lArticleCard}
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
                    <div
                      id="above-ad"
                      className={css.card}
                      style={{ textAlign: "center" }}
                    >
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div id="b" className={css.card}>
                      {React.cloneElement(this.cards.bArticleCard, {
                        displayType: "vert"
                      })}
                    </div>
                    <div id="g" className={css.card}>
                      {this.cards.gArticleCard}
                    </div>
                    <div id="classifieds" className={css.card}>
                      <ClassifiedsCard
                        header="Featured Classifieds"
                        classifieds={this.props.classifieds}
                      />
                    </div>
                    <div id="f1" className={css.card}>
                      {React.cloneElement(this.cards.f1ArticleCard, {
                        displayType: "mini"
                      })}
                    </div>
                    {this.props.mappedBreaking != null && (
                      <div className={css.card}>
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
                        displayType: "mini"
                      })}
                    </div>
                    {this.props.mappedBreaking == null && (
                      <div className={css.card}>
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
                        displayType: "full",
                        priority: true
                      })}
                    </div>
                    <div id="c2" className={css.card}>
                      {React.cloneElement(this.cards.c2ArticleCard, {
                        displayType: "horz"
                      })}
                    </div>
                    <div
                      id="g-d1-d2"
                      className={css.column}
                      style={{ width: "100%" }}
                    >
                      <div
                        id="g-d1-d2"
                        className={css.column}
                        style={{ width: "50%" }}
                      >
                        <div id="d1" className={css.card}>
                          {React.cloneElement(this.cards.d1ArticleCard, {
                            displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div
                        id="g-d1-d2"
                        className={css.column}
                        style={{ width: "50%" }}
                      >
                        <div id="d2" className={css.card}>
                          {React.cloneElement(this.cards.d2ArticleCard, {
                            displayType: "mini"
                          })}
                        </div>
                      </div>
                      <div id="MultimediaScroller" className={css.card}>
                        {this.cards.m1MultimediaScroller}
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
                        <div className={css.card}>
                          <a href="https://prime.dailybruin.com">
                            <Image
                              src="https://wp.dailybruin.com/images/2020/09/prime_mainsite.jpg"
                              alt="Prime Magazine"
                              width={828}
                              height={1375}
                              sizes="20vw"
                            />
                          </a>
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
                          displayType: "vert",
                          priority: true
                        })}
                      </div>
                      <div id="b" className={css.card}>
                        {React.cloneElement(this.cards.bArticleCard, {
                          displayType: "vert"
                        })}
                      </div>
                      <div id="classifieds" className={css.card}>
                        <ClassifiedsCard
                          header="Featured Classifieds"
                          classifieds={this.props.classifieds}
                        />
                      </div>
                      <div style={{ textAlign: "center" }} className={css.card}>
                        <broadstreet-zone zone-id="69405"></broadstreet-zone>
                      </div>
                      <div id="i" className={css.card}>
                        {this.cards.iArticleCard}
                      </div>
                      <div id="j" className={css.card}>
                        {this.cards.jArticleCard}
                      </div>
                      {/*
                        Put twitter feed here
                      */}
                      <div className={css.card}>
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
                          displayType: "full",
                          priority: true
                        })}
                      </div>
                      <div id="c2" className={css.card}>
                        {React.cloneElement(this.cards.c2ArticleCard, {
                          displayType: "horz"
                        })}
                      </div>
                      <div id="MultimediaScroller" className={css.card}>
                        {this.cards.m1MultimediaScroller}
                      </div>
                      <div id="f1" className={css.card}>
                        {React.cloneElement(this.cards.f1ArticleCard, {
                          displayType: "horz"
                        })}
                      </div>
                      <div id="f2" className={css.card}>
                        {React.cloneElement(this.cards.f2ArticleCard, {
                          displayType: "horz"
                        })}
                      </div>
                      <div className={css.column} style={{ width: "50%" }}>
                        <div id="k" className={css.card}>
                          {this.cards.kArticleCard}

                        </div>
                      </div>
                      <div className={css.column} style={{ width: "50%" }}>
                        <div id="l" className={css.card}>
                          {this.cards.lArticleCard}
                        </div>
                      </div>
                    </div>
                    <div
                      id="right"
                      className={css.column}
                      style={{ width: "25%" }}
                    >
                      {this.props.mappedBreaking != null && (
                        /* put westwordle here
                           */
                        <div className={css.card}>
                        </div>
                      )}
                      <div
                        id="above-ad"
                        className={css.card}
                        style={{ textAlign: "center" }}
                      >
                        <broadstreet-zone zone-id="69405"></broadstreet-zone>
                      </div>
                      <div id="g" className={css.card}>
                        {this.cards.gArticleCard}
                      </div>
                      <div id="d1" className={css.card}>
                        {React.cloneElement(this.cards.d1ArticleCard, {
                          displayType: "mini"
                        })}
                      </div>
                      <div id="d2" className={css.card}>
                        {React.cloneElement(this.cards.d2ArticleCard, {
                          displayType: "mini"
                        })}
                      </div>
                      <div
                        id="game"
                      >
                        <a href="/category/games">
                        <div className={css.card}>
                          <GamesCard></GamesCard>
                        </div>
                        </a>
                      </div>
                      <div id="h" className={css.card}>
                        {this.cards.hArticleCard}
                      </div>
                      <div className={css.card}>
                        <a href="https://prime.dailybruin.com">
                          <Image
                            src="https://wp.dailybruin.com/images/2020/09/prime_mainsite.jpg"
                            alt="Prime Magazine"
                            width={828}
                            height={1375}
                            sizes="20vw"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={css.column} style={{ width: "100%" }}>
                      <div className={css.card}>
                        <SponsoredLinks links={this.props.sponsoredLinks} />
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
