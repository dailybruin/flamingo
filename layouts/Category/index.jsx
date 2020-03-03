import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../config.js";
import css from "../style.css";
import * as utilities from "./utilities";

import ArticleCard from "../../components/ArticleCard";
import { buildStoryList, buildArticleCard } from "../utilities";
import ClassifiedsCard from "../../components/ClassifiedsCard";

import { SizeMe } from "react-sizeme";

const ArticleColumnStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "12px"
};

const ArticleAdStyle = {
  width: "100%",
  backgroundColor: "#aaa",
  height: "250px",
  lineHeight: "200px",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "sans-serif"
};

export default class CategoryLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aArticleCard: utilities.buildArticleCard(this.props.posts[0]),
      bArticleCard: utilities.buildArticleCard(this.props.posts[1]),
      cArticleCard: utilities.buildArticleCard(this.props.posts[2]),

      otherArticleCards: utilities.buildArticleList(this.props.posts.slice(3))
    };
  }

  render() {
    return (
      <SizeMe monitorHeight={false}>
        {({ size }) => {
          if (size.width < 600) {
            return (
              <div
                id="ArticleGrid"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  margin: "12px 0 0",
                  flexWrap: "wrap"
                }}
              >
                <div
                  id="c"
                  className={css.column}
                  style={{
                    width: "100%"
                  }}
                >
                  <div
                    id="c1"
                    className={css.card}
                    style={{
                      marginBottom: "12px"
                    }}
                  >
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                  <div
                    id="c2"
                    className={css.card}
                    style={{
                      marginBottom: "12px"
                    }}
                  >
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: "full"
                    })}
                  </div>
                </div>
                <div
                  id="ab"
                  className={css.column}
                  style={{
                    width: "100%"
                  }}
                >
                  <div
                    id="a"
                    className={css.card}
                    style={{
                      marginBottom: "12px"
                    }}
                  >
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: "horz"
                    })}
                  </div>
                  <div
                    id="b"
                    className={css.card}
                    style={{
                      marginBottom: "12px"
                    }}
                  >
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: "horz"
                    })}
                  </div>
                </div>
                <div
                  id="storiesdead"
                  style={{
                    width: "100%"
                  }}
                >
                  <div
                    id="d"
                    className={css.card}
                    style={{
                      marginBottom: "12px"
                    }}
                  >
                    {React.cloneElement(this.state.dArticleCard, {
                      displayType: "mini"
                    })}
                  </div>
                  <div
                    id="e"
                    className={css.card}
                    style={{
                      marginBottom: "12px"
                    }}
                  >
                    {React.cloneElement(this.state.eArticleCard, {
                      displayType: "mini"
                    })}
                  </div>
                  <div
                    id="above-ad"
                    className={css.card}
                    style={{
                      marginBottom: "12px"
                    }}
                  >
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
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
                  {/*
                  <div id="a" className={css.card}>
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: 'vert',
                    })}
                  </div>
                  <div id="above-ad" className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                  </div>
                  <div id="b" className={css.card}>
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: 'vert',
                    })}
                  </div>*/}
                </div>
                <div
                  id="c1-c2"
                  className={css.column}
                  style={{
                    width: "66.666%"
                  }}
                >
                  {/*
                  <div id="c1" className={css.card}>
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: 'full',
                    })}
                  </div>
                  <div id="c2" className={css.card}>
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: 'horz',
                    })}
                  </div> */}
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
            var i;
            let renderedPostArray = [];
            for (i = 0; i < this.state.otherArticleCards.length; i++) {
              renderedPostArray.push(
                <div id="a" className={css.card}>
                  {React.cloneElement(this.state.otherArticleCards[i], {
                    displayType: "long"
                  })}
                </div>
              );
            }
            return (
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
                      width: "66%"
                    }}
                  >
                    <div id="a" className={css.card}>
                      {React.cloneElement(this.state.aArticleCard, {
                        displayType: "full"
                      })}
                    </div>
                  </div>{" "}
                  {/*a-b*/}
                  <div
                    id="c1-c2"
                    className={css.column}
                    style={{
                      width: "33%"
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
                  <div>{renderedPostArray}</div>
                </div>
                {/*75*/}

                <div
                  id="qd-d-e"
                  className={css.column}
                  style={{ width: "25%" }}
                >
                  <div id="above-ad" className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
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
                          category: { name: "Apartments for Rent", url: "./#" },
                          content: {
                            name:
                              "Westwood 3bed + 3bath 1,712sqft Condo for lease. Laundry in-unit + 2 car gated parking space. Private rooftop terrace. $4900/M. Call Mike at 310-666-5458 for showing. Available now!",
                            url: "./#"
                          }
                        },
                        {
                          category: { name: "Apartments for Rent", url: "./#" },
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
                </div>
                {/*33*/}
              </div>
            );
          }
        }}
      </SizeMe>
    );
  }
}

const FULLCARD = (
  <ArticleCard
    displayType="full"
    headline="This Article Works for Anything and Everything"
    excerpt="Animal-assisted therapy group supports students, UCLA Health patients Erin Rice once watched her therapy dog make a 6-year-old boy open his eyes, look at his mother and begin communicating after a surgery that removed one hemisphere of his brain. “’This warm, fuzzy thing in his bed, this is what’s going to help him create those connections in his remaining hemisphere,’” Rice said a […]"
    url="./#"
    // TODO: format date
    date={new Date()}
    authors={[
      {
        name: "nedstark",
        link: "./#"
      }
    ]}
    category={{
      name: "NEWS",
      link: "./#"
    }}
    imageurl={
      "https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg"
    }
  />
);

const VERTCARD = (
  <ArticleCard
    displayType="vert"
    headline="This Article Works for Anything and Everything"
    excerpt="Animal-assisted therapy group supports students, UCLA Health patients Erin Rice once watched her therapy dog make a 6-year-old boy open his eyes, look at his mother and begin communicating after a surgery that removed one hemisphere of his brain. “’This warm, fuzzy thing in his bed, this is what’s going to help him create those connections in his remaining hemisphere,’” Rice said a […]"
    url="./#"
    // TODO: format date
    date={new Date()}
    authors={[
      {
        name: "nedstark",
        link: "./#"
      }
    ]}
    category={{
      name: "NEWS",
      link: "./#"
    }}
    imageurl={
      "https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg"
    }
  />
);

const HORZCARD = (
  <ArticleCard
    displayType="horz"
    headline="This Article Works for Anything and Everything"
    excerpt="Animal-assisted therapy group supports students, UCLA Health patients Erin Rice once watched her therapy dog make a 6-year-old boy open his eyes, look at his mother and begin communicating after a surgery that removed one hemisphere of his brain. “’This warm, fuzzy thing in his bed, this is what’s going to help him create those connections in his remaining hemisphere,’” Rice said a […]"
    url="./#"
    // TODO: format date
    date={new Date()}
    authors={[
      {
        name: "nedstark",
        link: "./#"
      }
    ]}
    category={{
      name: "NEWS",
      link: "./#"
    }}
    imageurl={
      "https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg"
    }
  />
);

const MINICARD = (
  <ArticleCard
    displayType="mini"
    headline="This Article Works for Anything and Everything"
    excerpt="Animal-assisted therapy group supports students, UCLA Health patients Erin Rice once watched her therapy dog make a 6-year-old boy open his eyes, look at his mother and begin communicating after a surgery that removed one hemisphere of his brain. “’This warm, fuzzy thing in his bed, this is what’s going to help him create those connections in his remaining hemisphere,’” Rice said a […]"
    url="./#"
    // TODO: format date
    date={new Date()}
    authors={[
      {
        name: "nedstark",
        link: "./#"
      }
    ]}
    category={{
      name: "NEWS",
      link: "./#"
    }}
    imageurl={
      "https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg"
    }
  />
);

const LONGCARD = (
  <ArticleCard
    displayType="long"
    headline="This Article Works for Anything and Everything"
    excerpt="Animal-assisted therapy group supports students, UCLA Health patients Erin Rice once watched her therapy dog make a 6-year-old boy open his eyes, look at his mother and begin communicating after a surgery that removed one hemisphere of his brain. “’This warm, fuzzy thing in his bed, this is what’s going to help him create those connections in his remaining hemisphere,’” Rice said a […]"
    url="./#"
    // TODO: format date
    date={new Date()}
    authors={[
      {
        name: "nedstark",
        link: "./#"
      }
    ]}
    category={{
      name: "NEWS",
      link: "./#"
    }}
    imageurl={
      "https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg"
    }
  />
);
