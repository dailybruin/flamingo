import PageLayout from '../layouts/PageLayout'
import PageWrapper from '../layouts/PageWrapper'
import React, { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../config.js'

import PostUpper from '../layouts/Post/PostUpper'

class Post extends Component {
  static async getInitialProps(context) {
    console.log('initial props for category')
    const { slug } = context.query
    console.log(slug)
    const postRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed`
    )
    const post = await postRes.json()
    return { post }
  }
  render() {
    return (
      <PostUpper article={this.props.post[0]}/>
    )
  }
}

export default PageWrapper(Post)
