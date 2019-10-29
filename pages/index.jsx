import PageLayout from '../layouts/PageLayout'
import React, { Component } from 'react'
import PageWrapper from '../layouts/PageWrapper'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import HomeUpper from '../layouts/Home/HomeUpper'
import HomeMultimedia from '../layouts/Home/HomeMultimedia'
import HomeLower from '../layouts/Home/HomeLower'
// import HomeBottom from '../layouts/Home/HomeBottom'

const aTAGID = 4847
const bTAGID = 4850
const c1TAGID = 4849
const c2TAGID = 4851
const dTAGID = 4862
const eTAGID = 4863

const quadCATID = 12848

const ArticleAdStyle = {
  width: '100%',
  backgroundColor: '#aaa',
  height: '200px',
  lineHeight: '200px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontFamily: 'sans-serif',
  textTransform: 'uppercase',
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
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${aTAGID}`
    )
    const bStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${bTAGID}`
    )
    const c1StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c1TAGID}`
    )
    const c2StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c2TAGID}`
    )
    const dStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${dTAGID}`
    )
    const eStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${eTAGID}`
    )
    const qdStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${quadCATID}`
    )
    upperPosts.aStory = await aStoryRes.json()
    upperPosts.bStory = await bStoryRes.json()
    upperPosts.c1Story = await c1StoryRes.json()
    upperPosts.c2Story = await c2StoryRes.json()
    upperPosts.dStory = await dStoryRes.json()
    upperPosts.eStory = await eStoryRes.json()
    upperPosts.quadList = await qdStoryRes.json()
    return { upperPosts }
  }

  render() {
    return (
      <div>
        <HomeUpper posts={this.props.upperPosts} />
        <HomeMultimedia></HomeMultimedia>
        <HomeLower posts={this.props.lowerPosts} />
      </div>
    )
  }
}

export default PageWrapper(Index)
