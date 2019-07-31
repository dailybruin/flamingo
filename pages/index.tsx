import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react'
import PageWrapper from '../layouts/PageWrapper'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import HomeUpper from '../layouts/Home/HomeUpper'
import HomeMultimedia from '../layouts/Home/HomeMultimedia'
import HomeLower from '../layouts/Home/HomeLower'

import MultimediaScroller from '@dailybruin/lux/src/components/MultimediaScroller'
import Poll from '@dailybruin/lux/src/components/Poll'

const aTAG = 12
const bTAG = 13
const c1TAG = 14
const c2TAG = 15
const dTAG = 16
const eTAG = 17

const ArticleAdStyle = {
  width: '100%',
  backgroundColor: '#aaa',
  height: '200px',
  lineHeight: '200px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
}

class Index extends Component {
  static async getInitialProps(context) {
    const upperPosts = {
      aStory: null,
      bStory: null,
      c1Story: null,
      c2Story: null,
      dStory: null,
      eStory: null,
    }
    const aStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${aTAG}`
    )
    const bStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${bTAG}`
    )
    const c1StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c1TAG}`
    )
    const c2StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c2TAG}`
    )
    const dStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${dTAG}`
    )
    const eStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${eTAG}`
    )
    upperPosts.aStory = await aStoryRes.json()
    upperPosts.bStory = await bStoryRes.json()
    upperPosts.c1Story = await c1StoryRes.json()
    upperPosts.c2Story = await c2StoryRes.json()
    upperPosts.dStory = await dStoryRes.json()
    upperPosts.eStory = await eStoryRes.json()
    return { upperPosts }
  }

  render() {
    return (
      <div>
        <HomeUpper posts={this.props.upperPosts}/>
      </div>
    )
  }
}

export default PageWrapper(Index)
