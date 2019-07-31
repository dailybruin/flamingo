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

class HomeUpper extends React.Component {
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
                id="ArticleGrid"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: '12px 0 0',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  id="c"
                  className="article-column"
                  style={{
                    width: '100%',
                  }}
                >
                  <div
                    id="c1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: 'full',
                    })}
                  </div>
                  <div
                    id="c2"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: 'full',
                    })}
                  </div>
                </div>
                <div
                  id="ab"
                  className="article-column"
                  style={{
                    width: '100%',
                  }}
                >
                  <div
                    id="a"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: 'horz',
                    })}
                  </div>
                  <div
                    id="b"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: 'horz',
                    })}
                  </div>
                </div>
                <div
                  id="storiesdead"
                  style={{
                    width: '100%',
                  }}
                >
                  <div
                    id="d"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.dArticleCard, {
                      displayType: 'mini',
                    })}
                  </div>
                  <div
                    id="e"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.eArticleCard, {
                      displayType: 'mini',
                    })}
                  </div>
                  <div
                    id="above-ad"
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
          } else if (size.width < 900) {
            return (
              <div
                id="ArticleGrid"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: '12px 0 0',
                  wrap: 'wrap',
                }}
              >
                <div
                  id="ab"
                  className="article-column"
                  style={{
                    width: '30%',
                  }}
                >
                  <div
                    id="a"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: 'vert',
                    })}
                  </div>
                  <div
                    id="b"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: 'vert',
                    })}
                  </div>
                  <div
                    id="stories"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <StoryList
                      story={[
                        {
                          title: 'Avengers: Infinity War',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: 'https://www.youtube.com/watch?v=bleoywz0oeg',
                        },
                        {
                          title: 'Bruins in the Draft',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: '#',
                        },
                        {
                          title: '#USACVote18Elections',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: 'https://usac.ucla.edu/',
                        },
                      ]}
                      image={{
                        src:
                          'https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg',
                        alt: 'N/A',
                      }}
                    />
                  </div>
                </div>
                <div
                  id="c"
                  className="article-column"
                  style={{
                    width: '70%',
                    marginLeft: '12px',
                  }}
                >
                  <div
                    id="c1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: 'full',
                    })}
                  </div>
                  <div
                    id="c2"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: 'horz',
                    })}
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div
                      id="d"
                      className="article-card"
                      style={{
                        marginBottom: '12px',
                        width: '50%',
                        paddingRight: '6px',
                      }}
                    >
                      {React.cloneElement(this.state.dArticleCard, {
                        displayType: 'mini',
                      })}
                    </div>
                    <div
                      id="e"
                      className="article-card"
                      style={{
                        marginBottom: '12px',
                        width: '50%',
                        paddingLeft: '6px',
                      }}
                    >
                      {React.cloneElement(this.state.eArticleCard, {
                        displayType: 'mini',
                      })}
                    </div>
                  </div>
                  <div
                    id="above-ad"
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
          } else {
            return (
              <div
                id="ArticleGrid"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  margin: '12px 0 0',
                }}
              >
                <div
                  id="ab"
                  className="article-column"
                  style={{
                    width: '25%',
                  }}
                >
                  <div
                    id="a"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: 'vert',
                    })}
                  </div>
                  <div
                    id="b"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: 'vert',
                    })}
                  </div>
                </div>
                <div
                  id="c"
                  className="article-column"
                  style={{
                    width: '50%',
                    margin: '0 12px',
                  }}
                >
                  <div
                    id="c1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: 'full',
                    })}
                  </div>
                  <div
                    id="c2"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: 'horz',
                    })}
                  </div>
                </div>
                <div
                  id="storiesdead"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '25%',
                  }}
                >
                  <div
                    id="stories"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <StoryList
                      story={[
                        {
                          title: 'Avengers: Infinity War',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: 'https://www.youtube.com/watch?v=bleoywz0oeg',
                        },
                        {
                          title: 'Bruins in the Draft',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: '#',
                        },
                        {
                          title: '#USACVote18Elections',
                          text:
                            'This movie was bonker but #nospoilers because of character limit alright pals',
                          link: 'https://usac.ucla.edu/',
                        },
                      ]}
                      image={{
                        src:
                          'https://img.etimg.com/thumb/msid-64089970,width-643,imgsize-415308,resizemode-4/avengers-infinity-war-becomes-indias-highest-grossing-hollywood-film.jpg',
                        alt: 'N/A',
                      }}
                    />
                  </div>
                  <div
                    id="d"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.dArticleCard, {
                      displayType: 'mini',
                    })}
                  </div>
                  <div
                    id="e"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {React.cloneElement(this.state.eArticleCard, {
                      displayType: 'mini',
                    })}
                  </div>
                  <div
                    id="above-ad"
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

export default HomeUpper
