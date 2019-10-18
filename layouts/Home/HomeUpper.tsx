import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react'
import PageWrapper from '../layouts/PageWrapper'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import css from './style.css'
import { buildStoryList, buildArticleCard } from './utilities.js'
import { SizeMe } from 'react-sizeme'

const ColumnStyle = {
  display: 'inline-block',
}

const CardStyle = {
  display: 'block',
  padding: '6px',
}

const ArticleAdStyle = {
  width: '100%',
  backgroundColor: '#aaa',
  height: '250px',
  lineHeight: '250px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
}

class HomeUpper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aArticleCard: buildArticleCard(this.props.posts.aStory[0]),
      bArticleCard: buildArticleCard(this.props.posts.bStory[0]),
      c1ArticleCard: buildArticleCard(this.props.posts.c1Story[0]),
      c2ArticleCard: buildArticleCard(this.props.posts.c2Story[0]),
      dArticleCard: buildArticleCard(this.props.posts.dStory[0]),
      eArticleCard: buildArticleCard(this.props.posts.eStory[0]),

      qdStoryList: buildStoryList('THE QUAD', this.props.posts.quadList),
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
                  className={css.column}
                  style={{
                    width: '100%',
                  }}
                >
                  <div
                    id="c1"
                    className={css.card}
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
                    className={css.card}
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
                  className={css.column}
                  style={{
                    width: '100%',
                  }}
                >
                  <div
                    id="a"
                    className={css.card}
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
                    className={css.card}
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
                    className={css.card}
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
                    className={css.card}
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
                    className={css.card}
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
              <div id="ArticleGrid" style={{ width: '100%' }}>
                <div
                  id="a-ad-b"
                  className={css.column}
                  style={{
                    width: '33.333%',
                  }}
                >
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
                  </div>
                </div>
                <div
                  id="c1-c2"
                  className={css.column}
                  style={{
                    width: '66.666%',
                  }}
                >
                  <div id="c1" className={css.card}>
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: 'full',
                    })}
                  </div>
                  <div id="c2" className={css.card}>
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: 'horz',
                    })}
                  </div>
                  <div
                    id="qd-d-e"
                    className={css.column}
                    style={{ width: '100%' }}
                  >
                    <div
                      id="qd-d-e"
                      className={css.column}
                      style={{ width: '50%' }}
                    >
                      <div id="d" className={css.card}>
                        {React.cloneElement(this.state.dArticleCard, {
                          displayType: 'mini',
                        })}
                      </div>
                      <div id="e" className={css.card}>
                        {React.cloneElement(this.state.eArticleCard, {
                          displayType: 'mini',
                        })}
                      </div>
                    </div>
                    <div
                      id="qd-d-e"
                      className={css.column}
                      style={{ width: '50%' }}
                    >
                      <div id="qd" className={css.card}>
                        {this.state.qdStoryList}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div id="ArticleGrid" style={{ width: '100%' }}>
                <div
                  id="a-b"
                  className={css.column}
                  style={{
                    width: '25%',
                  }}
                >
                  <div id="a" className={css.card}>
                    {React.cloneElement(this.state.aArticleCard, {
                      displayType: 'vert',
                    })}
                  </div>
                  <div id="b" className={css.card}>
                    {React.cloneElement(this.state.bArticleCard, {
                      displayType: 'vert',
                    })}
                  </div>
                </div>
                <div
                  id="c1-c2"
                  className={css.column}
                  style={{
                    width: '50%',
                  }}
                >
                  <div id="c1" className={css.card}>
                    {React.cloneElement(this.state.c1ArticleCard, {
                      displayType: 'full',
                    })}
                  </div>
                  <div id="c2" className={css.card}>
                    {React.cloneElement(this.state.c2ArticleCard, {
                      displayType: 'horz',
                    })}
                  </div>
                </div>
                <div
                  id="qd-d-e"
                  className={css.column}
                  style={{ width: '25%' }}
                >
                  <div id="above-ad" className={css.card}>
                    <div style={ArticleAdStyle}>ADVERTISEMENT</div>
                  </div>
                  <div id="qd" className={css.card}>
                    {this.state.qdStoryList}
                  </div>
                  <div id="d" className={css.card}>
                    {React.cloneElement(this.state.dArticleCard, {
                      displayType: 'mini',
                    })}
                  </div>
                  <div id="e" className={css.card}>
                    {React.cloneElement(this.state.eArticleCard, {
                      displayType: 'mini',
                    })}
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
