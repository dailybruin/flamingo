import PageWrapper from "../../layouts/PageWrapper";
import React, { Component } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";

import SectionHeader from "../../components/SectionHeader";
import CategoryLayout from "../../layouts/Category";

class Category extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const categoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/categories?slug=${slug}`
    );
    const category = await categoryRes.json();
    if (category.length > 0) {
      const subcategoriesRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${category[0].id}`
      );
      const subcategories = await subcategoriesRes.json();
      for (let i = 0; i < subcategories.length; i++) {
        const subsubcategoriesRes = await fetch(
          `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${subcategories[i].id}`
        );
        subcategories[i].subsubcategories = await subsubcategoriesRes.json();
      }
      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${category[0].id}`
      );
      const posts = await postsRes.json();
      return { category, subcategories, posts };
    }
    return { category };
  }
  render() {
    if (this.props.category.length == 0) return <Error statusCode={404} />;

    const posts = this.props.posts.map((category, index) => {
      return (
        <ul key={index}>
          <li>
            <Link
              as={`/category/${category.slug}`}
              href={`/category?slug=${category.slug}&apiRoute=category`}
            >
              <a>{category.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    const sectionLinks = this.props.subcategories.map(index => {
      const subsubcategoriesSimple = index.subsubcategories.map(index => {
        return { name: index.name, link: `/category/${index.slug}` };
      });
      console.log(subsubcategoriesSimple);
      return {
        name: index.name,
        link: `/category/${index.slug}`,
        subsubcategories: subsubcategoriesSimple
      };
    });
    return (
      <div>
        <Head>
          <title
            dangerouslySetInnerHTML={{
              __html: this.props.category[0].name + " - Daily Bruin"
            }}
          />
        </Head>
        <div style={{ padding: "6px" }}>
          <SectionHeader
            category={this.props.category[0].name}
            subcategories={sectionLinks}
          />
        </div>
        <CategoryLayout posts={this.props.posts} />
        <h1>{this.props.category[0].name} Posts</h1>
        {posts}
      </div>
    );
  }
}

export default PageWrapper(Category);
