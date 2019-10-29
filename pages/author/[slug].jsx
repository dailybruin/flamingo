import PageWrapper from '../../layouts/PageWrapper'
import React, { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../../config.js'

import AuthorUpper from '../../layouts/Author/AuthorUpper'

class Author extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query
    const authorRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/users?slug=${slug}`
    )
    const author = await authorRes.json()
    const postsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?author=${author.id}`
    )
    const posts = await postsRes.json()
    return { author, posts }
  }
  render() {
    return (
      <AuthorUpper author={this.props.author[0]} posts={this.props.posts}/>
    )
  }
}

export default PageWrapper(Author)
