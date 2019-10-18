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
  height: '250px',
  lineHeight: '200px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
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
        name: 'nedstark',
        link: './#',
      },
    ]}
    category={{
      name: 'NEWS',
      link: './#',
    }}
    imageurl={
      'https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg'
    }
  />
)

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
        name: 'nedstark',
        link: './#',
      },
    ]}
    category={{
      name: 'NEWS',
      link: './#',
    }}
    imageurl={
      'https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg'
    }
  />
)

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
        name: 'nedstark',
        link: './#',
      },
    ]}
    category={{
      name: 'NEWS',
      link: './#',
    }}
    imageurl={
      'https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg'
    }
  />
)

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
        name: 'nedstark',
        link: './#',
      },
    ]}
    category={{
      name: 'NEWS',
      link: './#',
    }}
    imageurl="https://dailybruin.com/images/2019/06/web.ae_.lorenzo.picA_.AK_-640x427.jpg"
  />
)

class CategoryLower extends React.Component {
  constructor(props) {
    super(props)
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
                }}
              >
                <div
                  id="feat"
                  className="article-column"
                  style={{
                    width: '100%',
                  }}
                >
                  <div style={{ marginBottom: '12px' }}> {HORZCARD} </div>
                  <div style={{ marginBottom: '12px' }}> {HORZCARD} </div>
                  <div style={{ marginBottom: '12px' }}> {HORZCARD} </div>
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
                }}
              >
                <div
                  id="feat"
                  className="article-column"
                  style={{
                    width: '100%',
                  }}
                >
                  <div style={{ marginBottom: '12px' }}> {LONGCARD} </div>
                  <div style={{ marginBottom: '12px' }}> {LONGCARD} </div>
                  <div style={{ marginBottom: '12px' }}> {LONGCARD} </div>
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
                  id="feat"
                  className="article-column"
                  style={{
                    width: '75%',
                    marginRight: '12px',
                  }}
                >
                  <div style={{ marginBottom: '12px' }}> {LONGCARD} </div>
                  <div style={{ marginBottom: '12px' }}> {LONGCARD} </div>
                  <div style={{ marginBottom: '12px' }}> {LONGCARD} </div>
                </div>
                <div
                  id="subfeat"
                  className="article-column"
                  style={{
                    width: '25%',
                  }}
                >
                  <div
                    id="c1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ marginBottom: '12px' }}>
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

export default CategoryLower
