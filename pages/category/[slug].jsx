import PageWrapper from '../../layouts/PageWrapper'
import React, { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import { Config } from '../../config.js'

import SectionHeader from '../../components/SectionHeader'
import CategoryLayout from '../../layouts/Category'

class Category extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query
    const categoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/categories?slug=${slug}`
    )
    const category = await categoryRes.json()
    if (category.length > 0) {
      const categoriesRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${category[0].id}`
      )
      const categories = await categoriesRes.json()
      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${
          category[0].id
        }`
      )
      const posts = await postsRes.json()
      return { category, categories, posts }
    }
    return { category }
  }
  render() {
    console.log(this.props.category)
    if (this.props.category.length == 0) return <Error statusCode={404} />

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
    const sectionLinks = this.props.categories.map(index => {
      return { name: index.name, link: index.link }
    })
    return (
      <div>
        <SectionHeader
          name={this.props.category[0].name}
          sectionList={sectionLinks}
        />
      <CategoryLayout posts={this.props.posts}/>
        <h1>{this.props.category[0].name} Posts</h1>
        {posts}
      </div>
    )
  }
}

export default PageWrapper(Category)
