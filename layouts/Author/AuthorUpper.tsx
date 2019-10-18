import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react'
import PageWrapper from '../layouts/PageWrapper'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import css from './style.css'

import { SizeMe } from 'react-sizeme'
import AuthorCard from '../../components/AuthorCard'

const ArticleAdStyle = {
  width: '100%',
  backgroundColor: '#aaa',
  height: '250px',
  lineHeight: '200px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
}

class AuthorUpper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authorCard: (
        <AuthorCard
          image={this.props.author['avatar_urls'][96]}
          name={this.props.author.name}
          position="ADMINISTRATOR"
          twitter="lol"
          email="lol"
        />
      ),
    }
  }

  render() {
    return (
      <SizeMe monitorHeight={false}>
        {({ size }) => {
          if (size.width < 600) {
            return <p></p>
          } else if (size.width < 900) {
            return <p></p>
          } else {
            return (
              <div style={{ width: '100%' }}>
                <div
                  className={css.column}
                  style={{
                    width: '25%',
                  }}
                >
                  <div id="a" className={css.card}>
                    {this.state.authorCard}
                  </div>
                </div>
                <div
                  className={css.column}
                  style={{
                    width: '50%',
                  }}
                >
                </div>
                <div
                  id="extras"
                  className={css.column}
                  style={{
                    width: '25%',
                  }}
                >
                  <div id="above-ad" className={css.card}>
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

export default AuthorUpper
