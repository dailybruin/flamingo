import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react'
import PageWrapper from '../layouts/PageWrapper'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import ArticleCard from '@dailybruin/lux/src/components/ArticleCard'
import StoryList from '@dailybruin/lux/src/components/StoryList'

import { SizeMe } from 'react-sizeme'

const ArticleColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '12px',
}

const ArticleAdStyle = {
  width: '100%',
  backgroundColor: '#aaa',
  height: '200px',
  lineHeight: '200px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
}

class HomeLower extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aArticleCard: (
        <ArticleCard
          headline={this.props.posts.aStory[0].title.rendered}
          excerpt={this.props.posts.aStory[0].excerpt.rendered}
          url={`/post/${this.props.posts.aStory[0].slug}`}
          // TODO: format date
          date={Date.parse(this.props.posts.aStory[0].date)}
          authors={[
            {
              name: this.props.posts.aStory[0]._embedded.author[0].name,
              link: this.props.posts.aStory[0]._embedded.author[0].link,
            },
          ]}
          category={{
            name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
            link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
          }}
          imageurl={
            this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
              .source_url
          }
        />
      ),
      bArticleCard: (
        <ArticleCard
          headline={this.props.posts.bStory[0].title.rendered}
          excerpt={this.props.posts.bStory[0].excerpt.rendered}
          url={`/post/${this.props.posts.bStory[0].slug}`}
          // TODO: format date
          date={Date.parse(this.props.posts.bStory[0].date)}
          authors={[
            {
              name: this.props.posts.bStory[0]._embedded.author[0].name,
              link: this.props.posts.bStory[0]._embedded.author[0].link,
            },
          ]}
          category={{
            name: this.props.posts.bStory[0]['_embedded']['wp:term'][0][0].name,
            link: this.props.posts.bStory[0]['_embedded']['wp:term'][0][0].link,
          }}
          imageurl={
            this.props.posts.bStory[0]._embedded['wp:featuredmedia'][0]
              .source_url
          }
        />
      ),
      c1ArticleCard: (
        <ArticleCard
          headline={this.props.posts.c1Story[0].title.rendered}
          excerpt={this.props.posts.c1Story[0].excerpt.rendered}
          url={`/post/${this.props.posts.c1Story[0].slug}`}
          // TODO: format date
          date={Date.parse(this.props.posts.c1Story[0].date)}
          authors={[
            {
              name: this.props.posts.c1Story[0]._embedded.author[0].name,
              link: this.props.posts.c1Story[0]._embedded.author[0].link,
            },
          ]}
          category={{
            name: this.props.posts.c1Story[0]['_embedded']['wp:term'][0][0]
              .name,
            link: this.props.posts.c1Story[0]['_embedded']['wp:term'][0][0]
              .link,
          }}
          imageurl={
            this.props.posts.c1Story[0]._embedded['wp:featuredmedia'][0]
              .source_url
          }
        />
      ),
      c2ArticleCard: (
        <ArticleCard
          headline={this.props.posts.c2Story[0].title.rendered}
          excerpt={this.props.posts.c2Story[0].excerpt.rendered}
          url={`/post/${this.props.posts.c2Story[0].slug}`}
          // TODO: format date
          date={Date.parse(this.props.posts.c2Story[0].date)}
          authors={[
            {
              name: this.props.posts.c2Story[0]._embedded.author[0].name,
              link: this.props.posts.c2Story[0]._embedded.author[0].link,
            },
          ]}
          category={{
            name: this.props.posts.c2Story[0]['_embedded']['wp:term'][0][0]
              .name,
            link: this.props.posts.c2Story[0]['_embedded']['wp:term'][0][0]
              .link,
          }}
          imageurl={
            this.props.posts.c2Story[0]._embedded['wp:featuredmedia'][0]
              .source_url
          }
        />
      ),
      dArticleCard: (
        <ArticleCard
          headline={this.props.posts.dStory[0].title.rendered}
          excerpt={this.props.posts.dStory[0].excerpt.rendered}
          url={`/post/${this.props.posts.dStory[0].slug}`}
          // TODO: format date
          date={Date.parse(this.props.posts.dStory[0].date)}
          authors={[
            {
              name: this.props.posts.dStory[0]._embedded.author[0].name,
              link: this.props.posts.dStory[0]._embedded.author[0].link,
            },
          ]}
          category={{
            name: this.props.posts.dStory[0]['_embedded']['wp:term'][0][0].name,
            link: this.props.posts.dStory[0]['_embedded']['wp:term'][0][0].link,
          }}
          imageurl={
            this.props.posts.dStory[0]._embedded['wp:featuredmedia'][0]
              .source_url
          }
        />
      ),
      eArticleCard: (
        <ArticleCard
          headline={this.props.posts.eStory[0].title.rendered}
          excerpt={this.props.posts.eStory[0].excerpt.rendered}
          url={`/post/${this.props.posts.eStory[0].slug}`}
          // TODO: format date
          date={Date.parse(this.props.posts.eStory[0].date)}
          authors={[
            {
              name: this.props.posts.eStory[0]._embedded.author[0].name,
              link: this.props.posts.eStory[0]._embedded.author[0].link,
            },
          ]}
          category={{
            name: this.props.posts.eStory[0]['_embedded']['wp:term'][0][0].name,
            link: this.props.posts.eStory[0]['_embedded']['wp:term'][0][0].link,
          }}
          imageurl={
            this.props.posts.eStory[0]._embedded['wp:featuredmedia'][0]
              .source_url
          }
        />
      ),
    }
  }

  render() {
    return (
      <SizeMe monitorHeight={false}>
        {({ size }) => {
          if (size.width < 600) {
            return (
              <div
                id="under-brush"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: '12px 0 0',
                }}
              >
                <div
                  className="article-column"
                  style={{
                    width: '100%',
                  }}
                >
                  <div
                    id="f1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    id="f2"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    className="article-column"
                    style={{
                      width: '100%',
                      margin: '0',
                      display: 'flex',
                    }}
                  >
                    <div
                      id="poll"
                      className="article-card"
                      style={{
                        margin: '0 12px 12px 0',
                      }}
                    >
                      <Poll
                        poll={[
                          {
                            choice: 'De Neve',
                            votes: 10,
                          },
                          {
                            choice: 'Covel',
                            votes: 90,
                          },
                          {
                            choice: 'Feast',
                            votes: 30,
                          },
                          {
                            choice: 'Bruin Plate',
                            votes: 40,
                          },
                        ]}
                        question={
                          "There's a lot going on at UCLA. Tuition hikes, protests, and more fun things. That's why we're asking you this question. What's your favorite dining hall?"
                        }
                        hasVoted={false}
                        legend={'Number of Students'}
                      />
                    </div>
                    <div
                      id="under-ad"
                      className="article-card"
                      style={{
                        marginBottom: '12px',
                        flexGrow: '2',
                        width: '300px',
                      }}
                    >
                      <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                    </div>
                  </div>
                  <div
                    id="f3"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    id="f4"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                </div>
              </div>
            )
          } else if (size.width < 900) {
            return (
              <div
                id="under-brush"
                style={{
                  justifyContent: 'center',
                  width: '100%',
                  margin: '12px 0 0',
                }}
              >
                <div
                  className="article-column"
                  style={{
                    width: '100%',
                  }}
                >
                  <div
                    id="f1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    id="f2"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    id="f3"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    className="article-column"
                    style={{
                      width: '100%',
                      margin: '0',
                      display: 'flex',
                    }}
                  >
                    <div
                      id="popular"
                      className="article-card"
                      style={{
                        marginBottom: '12px',
                      }}
                    >
                      <StoryList
                        story={[
                          {
                            title: 'Most popular story',
                            text:
                              'This movie was bonker but #nospoilers because of character limit alright pals',
                            link: '#',
                          },
                          {
                            title: 'Second most popular',
                            text:
                              'This movie was bonker but #nospoilers because of character limit alright pals',
                            link: '#',
                          },
                          {
                            title: 'Third most popular',
                            text:
                              'This movie was bonker but #nospoilers because of character limit alright pals',
                            link: '#',
                          },
                        ]}
                        type="popular"
                      />
                    </div>
                    <div
                      id="poll"
                      className="article-card"
                      style={{
                        margin: '0 12px 12px',
                      }}
                    >
                      <Poll
                        poll={[
                          {
                            choice: 'De Neve',
                            votes: 10,
                          },
                          {
                            choice: 'Covel',
                            votes: 90,
                          },
                          {
                            choice: 'Feast',
                            votes: 30,
                          },
                          {
                            choice: 'Bruin Plate',
                            votes: 40,
                          },
                        ]}
                        question={
                          "There's a lot going on at UCLA. Tuition hikes, protests, and more fun things. That's why we're asking you this question. What's your favorite dining hall?"
                        }
                        hasVoted={false}
                        legend={'Number of Students'}
                      />
                    </div>
                    <div
                      id="under-ad"
                      className="article-card"
                      style={{
                        marginBottom: '12px',
                        flexGrow: '2',
                      }}
                    >
                      <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div
                id="under-brush"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: '12px 0 0',
                }}
              >
                <div
                  className="article-column"
                  style={{
                    width: '75%',
                  }}
                >
                  <div
                    id="f1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    id="f2"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    id="f3"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                  <div
                    id="f4"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <ArticleCard
                      headline={this.props.posts.aStory[0].title.rendered}
                      excerpt={this.props.posts.aStory[0].excerpt.rendered}
                      url={this.props.posts.aStory[0].link}
                      // TODO: format date
                      date={Date.parse(this.props.posts.aStory[0].date)}
                      authors={[
                        {
                          name: this.props.posts.aStory[0]._embedded.author[0].name,
                          link: this.props.posts.aStory[0]._embedded.author[0].link,
                        },
                      ]}
                      category={{
                        name: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].name,
                        link: this.props.posts.aStory[0]['_embedded']['wp:term'][0][0].link,
                      }}
                      imageurl={
                        this.props.posts.aStory[0]._embedded['wp:featuredmedia'][0]
                          .source_url
                      }
                    />
                  </div>
                </div>
                <div
                  className="article-column"
                  style={{
                    width: '25%',
                    margin: '0 0 0 12px',
                  }}
                >
                  <div
                    id="popular"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <StoryList
                      story={[
                        {
                          title: 'Most popular story',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: '#',
                        },
                        {
                          title: 'Second most popular',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: '#',
                        },
                        {
                          title: 'Third most popular',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: '#',
                        },
                      ]}
                      type="popular"
                    />
                  </div>
                  <div
                    id="poll"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <Poll
                      poll={[
                        {
                          choice: 'De Neve',
                          votes: 10,
                        },
                        {
                          choice: 'Covel',
                          votes: 90,
                        },
                        {
                          choice: 'Feast',
                          votes: 30,
                        },
                        {
                          choice: 'Bruin Plate',
                          votes: 40,
                        },
                      ]}
                      question={
                        "There's a lot going on at UCLA. Tuition hikes, protests, and more fun things. That's why we're asking you this question. What's your favorite dining hall?"
                      }
                      hasVoted={false}
                      legend={'Number of Students'}
                    />
                  </div>
                  <div
                    id="under-ad"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                  </div>
                </div>
              </div>
            )
          }
        }}
      </SizeMe>
    )
  }
}

export default HomeLower
