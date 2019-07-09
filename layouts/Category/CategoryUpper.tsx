import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react'
import PageWrapper from '../layouts/PageWrapper'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import ArticleCard from '@dailybruin/lux/src/components/ArticleCard'

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

const FULLCARD = (
  <ArticleCard
    displayType="full"
    headline="This Article Works for Anything and Everything"
    excerpt="jksjdsf fhg gdlm;ks  fgjldhljfgljdksdjfg djgljkdfhgldfgkj"
    url="./#"
    // TODO: format date
    date="Jun 12 2010"
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
    excerpt="jksjdsf fhg gdlm;ks  fgjldhljfgljdksdjfg djgljkdfhgldfgkj"
    url="./#"
    // TODO: format date
    date="Jun 12 2010"
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
    excerpt="jksjdsf fhg gdlm;ks  fgjldhljfgljdksdjfg djgljkdfhgldfgkj"
    url="./#"
    // TODO: format date
    date="Jun 12 2010"
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

class HomeUpper extends React.Component {
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
                  justifyContent: 'center',
                  width: '100%',
                  margin: '12px 0 0',
                }}
              >
                <div
                  id="c1"
                  className="article-card"
                  style={{
                    marginBottom: '12px',
                  }}
                >
                  {FULLCARD}
                </div>
                <div
                  id="c1"
                  className="article-card"
                  style={{
                    marginBottom: '12px',
                  }}
                >
                  {HORZCARD}
                </div>
                <div
                  id="c2"
                  className="article-card"
                  style={{
                    marginBottom: '12px',
                  }}
                >
                  {HORZCARD}
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
                }}
              >
                <div
                  id="feat"
                  className="article-column"
                  style={{
                    width: '66%',
                    marginRight: '6px',
                  }}
                >
                  {FULLCARD}
                </div>
                <div
                  id="subfeat"
                  className="article-column"
                  style={{
                    width: '34%',
                    marginLeft: '6px',
                  }}
                >
                  <div
                    id="c1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {VERTCARD}
                  </div>
                  <div
                    id="c2"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {VERTCARD}
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
                  id="feat"
                  className="article-column"
                  style={{
                    width: '50%',
                    marginRight: '6px',
                  }}
                >
                  {FULLCARD}
                </div>
                <div
                  id="subfeat"
                  className="article-column"
                  style={{
                    width: '50%',
                    marginLeft: '6px',
                  }}
                >
                  <div
                    id="c1"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {HORZCARD}
                  </div>
                  <div
                    id="c2"
                    className="article-card"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {HORZCARD}
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
