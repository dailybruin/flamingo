import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react'
import PageWrapper from '../layouts/PageWrapper'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import css from './style.css'
import MultimediaScroller from '../../components/MultimediaScroller'

const ArticleAdStyle = {
  width: '100%',
  backgroundColor: '#aaa',
  height: '200px',
  lineHeight: '200px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
}

class HomeMultimedia extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div
        id="multimediaScroller"
        className={css.card}
      >
        <MultimediaScroller
          media={[
            {
              title:
                'First comprehensive study on otters reveals low genetic diversity',
              preview:
                'https://dailybruin.com/images/2019/06/image2-640x479.jpeg',
              link: './#',
            },
            {
              title:
                'First comprehensive study on otters reveals low genetic diversity',
              preview:
                'https://dailybruin.com/images/2019/06/image2-640x479.jpeg',
              link: './#',
            },
            {
              title:
                'First comprehensive study on otters reveals low genetic diversity',
              preview:
                'https://dailybruin.com/images/2019/06/image2-640x479.jpeg',
              link: './#',
            },
            {
              title:
                'First comprehensive study on otters reveals low genetic diversity',
              preview:
                'https://dailybruin.com/images/2019/06/image2-640x479.jpeg',
              link: './#',
            },
            {
              title:
                'First comprehensive study on otters reveals low genetic diversity',
              preview:
                'https://dailybruin.com/images/2019/06/image2-640x479.jpeg',
              link: './#',
            },
          ]}
        />
      </div>
    )
  }
}

export default HomeMultimedia
