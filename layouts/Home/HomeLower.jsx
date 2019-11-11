import React, { Component } from "react";
import PageWrapper from "../PageWrapper";
import fetch from "isomorphic-unfetch";
import Error from "next/error";

import css from "./style.css";

import ArticleCard from "../../components/ArticleCard";
import StoryList from "../../components/StoryList";
import Poll from "../../components/Poll";
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

const HORZCARD = (
  <ArticleCard
    displayType="horz"
    headline="This Article Works for Anything and Everything"
    excerpt="The North Westwood Neighborhood Council accomplished many of its goals, but members faced challenges from a lack of experience and […]"
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

class HomeLower extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SizeMe monitorHeight={false}>
        {({ size }) => {
          if (size.width < 600) {
            return (
              <div id="ArticleGrid" style={{}}>
                <div id="cf" className={css.column} style={{}}>
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
                  <div id="f1" className={css.card}>
                    {HORZCARD}
                  </div>
                  <div id="f2" className={css.card}>
                    {HORZCARD}
                  </div>
                  <div id="f3" className={css.card}>
                    {HORZCARD}
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
                  <div className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
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
                  <div className={css.card}>
                    <StoryList
                      type="NEWS"
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
                      image={{
                        src:
                          "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                        alt: "N/A"
                      }}
                    />
                  </div>
                  <div className={css.card}>
                    <StoryList
                      type="A&E"
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
                      image={{
                        src:
                          "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                        alt: "N/A"
                      }}
                    />
                  </div>
                  <div className={css.card}>
                    <StoryList
                      type="OPINION"
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
                      image={{
                        src:
                          "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                        alt: "N/A"
                      }}
                    />
                  </div>
                  <div className={css.card}>
                    <StoryList
                      type="SPORTS"
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
                      image={{
                        src:
                          "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                        alt: "N/A"
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          } else if (size.width < 900) {
            return (
              <div id="ArticleGrid" style={{}}>
                <div
                  id="cf"
                  className={css.column}
                  style={{
                    width: "33.333%"
                  }}
                >
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
                  <div className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
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
                </div>
                <div
                  id="f1-f2-f3"
                  className={css.column}
                  style={{
                    width: "66.666%"
                  }}
                >
                  <div id="f1" className={css.card}>
                    {HORZCARD}
                  </div>
                  <div id="f2" className={css.card}>
                    {HORZCARD}
                  </div>
                  <div id="f3" className={css.card}>
                    {HORZCARD}
                  </div>
                  <div className={css.column} style={{ width: "100%" }}>
                    <div className={css.column} style={{ width: "50%" }}>
                      <div className={css.card}>
                        <StoryList
                          type="NEWS"
                          story={[
                            {
                              title: "Avengers: Infinity War",
                              text:
                                "This movie was bonker but #nospoilers because of character limit alright pals",
                              link:
                                "https://www.youtube.com/watch?v=bleoywz0oeg"
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
                          image={{
                            src:
                              "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                            alt: "N/A"
                          }}
                        />
                      </div>
                      <div className={css.card}>
                        <StoryList
                          type="A&E"
                          story={[
                            {
                              title: "Avengers: Infinity War",
                              text:
                                "This movie was bonker but #nospoilers because of character limit alright pals",
                              link:
                                "https://www.youtube.com/watch?v=bleoywz0oeg"
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
                          image={{
                            src:
                              "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                            alt: "N/A"
                          }}
                        />
                      </div>
                    </div>
                    <div className={css.column} style={{ width: "50%" }}>
                      <div className={css.card}>
                        <StoryList
                          type="OPINION"
                          story={[
                            {
                              title: "Avengers: Infinity War",
                              text:
                                "This movie was bonker but #nospoilers because of character limit alright pals",
                              link:
                                "https://www.youtube.com/watch?v=bleoywz0oeg"
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
                          image={{
                            src:
                              "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                            alt: "N/A"
                          }}
                        />
                      </div>
                      <div className={css.card}>
                        <StoryList
                          type="SPORTS"
                          story={[
                            {
                              title: "Avengers: Infinity War",
                              text:
                                "This movie was bonker but #nospoilers because of character limit alright pals",
                              link:
                                "https://www.youtube.com/watch?v=bleoywz0oeg"
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
                          image={{
                            src:
                              "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                            alt: "N/A"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div id="ArticleGrid" style={{}}>
                <div
                  id="cf"
                  className={css.column}
                  style={{
                    width: "25%"
                  }}
                >
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
                  <div className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                  </div>
                </div>
                <div
                  id="f1-f2-f3"
                  className={css.column}
                  style={{
                    width: "50%"
                  }}
                >
                  <div id="f1" className={css.card}>
                    {HORZCARD}
                  </div>
                  <div id="f2" className={css.card}>
                    {HORZCARD}
                  </div>
                  <div id="f3" className={css.card}>
                    {HORZCARD}
                  </div>
                </div>
                <div className={css.column} style={{ width: "25%" }}>
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
                </div>
                <div>
                  <div
                    className={css.column}
                    style={{
                      width: "25%"
                    }}
                  >
                    <div id="ns" className={css.card}>
                      <StoryList
                        type="NEWS"
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
                        image={{
                          src:
                            "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                          alt: "N/A"
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={css.column}
                    style={{
                      width: "25%"
                    }}
                  >
                    <div id="op" className={css.card}>
                      <StoryList
                        type="OPINION"
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
                        image={{
                          src:
                            "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                          alt: "N/A"
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={css.column}
                    style={{
                      width: "25%"
                    }}
                  >
                    <div id="ae" className={css.card}>
                      <StoryList
                        type="A&E"
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
                        image={{
                          src:
                            "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                          alt: "N/A"
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className={css.column}
                    style={{
                      width: "25%"
                    }}
                  >
                    <div id="sp" className={css.card}>
                      <StoryList
                        type="SPORTS"
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
                        image={{
                          src:
                            "https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg",
                          alt: "N/A"
                        }}
                      />
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

export default HomeLower;
