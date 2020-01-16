import PageWrapper from '../../layouts/PageWrapper'
import React, { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../../config.js'

import SectionHeader from '../../components/SectionHeader'
import CategoryUpper from '../../layouts/Category/CategoryUpper'
import CategoryLower from '../../layouts/Category/CategoryLower'

class Tag extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query
    const tagRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug}`
    )
    const tag = await tagRes.json()
    if (tag.length > 0) {
      const tagsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/tags?parent=${tag[0].id}`
      )
      const tags = await tagsRes.json()
      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${
          tag[0].id
        }`
      )
      const posts = await postsRes.json()
      return { tag, tags, posts }
    }
    return { tag }
  }
  render() {
    console.log(this.props.tag)
    if (this.props.tag.length == 0) return <Error statusCode={404} />

    const posts = this.props.posts.map((post, index) => {
      return (
        <ul key={index}>
          <li>
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <a>{post.title.rendered}</a>
            </Link>
          </li>
        </ul>
      )
    })
    const sectionLinks = this.props.tags.map(index => {
      return { name: index.name, link: index.link }
    })
    return (
      <div>
        <SectionHeader
          name={this.props.tag[0].name}
          sectionList={sectionLinks}
        />
        <CategoryUpper />
        <CategoryLower />
        <h1>{this.props.tag[0].name} Posts</h1>
        {posts}
      </div>
    )
  }
}

export default PageWrapper(Tag)
