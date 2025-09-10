import PageWrapper from "../../layouts/PageWrapper";
import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";

import SectionHeader from "../../components/SectionHeader";
import CategoryLayout from "../../layouts/Category";

const COLUMN_SERIES_FEATURE_FLAG = false;

const categoryDescriptions = {
  quad: {
    desktop:
      "The Quad is the Daily Bruin's explanatory journalism section, which aims to break down salient topics \
    to make them digestible for UCLA's student body and community at large. Our in-depth reporting incorporates the \
    broader context of these topics to give a more comprehensive view on financial, lifestyle and academic discussions.",
    mobile:
      "The Quad is an explanatory journalism hub which contextualizes current events for readers, \
    with stories ranging from cultural trends to the interrogation of sociopolitical issues."
  },
  "press-release": {
    desktop:
      "The Daily Bruin announces news relevant to the organization as press releases. \
      For more information about The Bruin, contact <a href='mailto:dboutreach@dailybruin.com'>dboutreach@dailybruin.com</a>",
    mobile:
      "The Daily Bruin announces news relevant to the organization as press releases. \
      For more information about The Bruin, contact <a href='mailto:dboutreach@dailybruin.com'>dboutreach@dailybruin.com</a>"
  },
  "the-stack": {
    desktop:
      "The Stack is the Daily Bruin's data journalism section. We investigate public data, create \
      engaging visualizations and \apply quantitative insights to topics relevant to our UCLA community.",
    mobile:
      "The Stack is the Daily Bruin's data journalism section. We investigate public data, create \
      engaging visualizations and apply quantitative insights to topics relevant to our UCLA community."
  },
  "sponsored": {
    desktop:
      "Sponsored is an advertisement page from the Bruin Media Group. Increase visibility and traffic to your company's \
      brand or products through the Daily Bruin website. Grow your business online with Sponsored to bring in new customers.",
    mobile:
      "Sponsored is an advertisement page from the Bruin Media Group. Increase visibility and traffic to your company's \
      brand or products through the Daily Bruin website. Grow your business online with Sponsored to bring in new customers."
  }
};

class Category extends Component {
  static async getInitialProps(context) {
    // slug is from url
    const { slug } = context.query;
    if (slug == 'breaking') {
      const category = undefined
      return { category }
    }
    const categoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/categories?slug=${slug}`
    );
    const category = await categoryRes.json();
    if (category.length > 0) {
      const subcategoriesRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${category[0].id}&per_page=100`
      );
      const subcategories = await subcategoriesRes.json();
      for (let i = 0; i < subcategories.length; i++) {
        // const subsubcategoriesRes = await fetch(
        //   `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${subcategories[i].id}`
        // );
        // subcategories[i].subsubcategories = await subsubcategoriesRes.json();
        subcategories[i].subsubcategories = [];
      }

      // Put Opinion Column Series after Opinion Columns
      if (slug == "opinion") {
        const columnsIndex = subcategories.findIndex(
          sub => sub.slug == "opinion-columns"
        );
        const columnSeriesIndex = subcategories.findIndex(
          sub => sub.slug == "opinion-column-series"
        );
        const temp = subcategories[columnsIndex];
        subcategories[columnsIndex] = subcategories[columnSeriesIndex];
        subcategories[columnSeriesIndex] = temp;

        if (!COLUMN_SERIES_FEATURE_FLAG) {
          subcategories.pop();
        }
      }

      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${category[0].id}`
      );
      const posts = await postsRes.json();

      const classifiedsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
      );
      const classifieds = await classifiedsRes.json();
      return { category, subcategories, posts, classifieds };
    } else {
      return { category };
    }
  }
  render() {
    if (
      this.props.category == undefined ||
      this.props.category.data != undefined ||
      this.props.category.length == 0 ||
      this.slug == 'breaking'
    ) {
      return <Error statusCode={404} />;
    }
    const sectionLinks = this.props.subcategories.map(index => {
      const subsubcategoriesSimple = index.subsubcategories.map(index => {
        return { name: index.name, link: `/category/${index.slug}` };
      });
      return {
        name: index.name,
        link: `/category/${index.slug}`,
        subsubcategories: subsubcategoriesSimple
      };
    });
    return (
      <>
        <Head>
          <title>{this.props.category[0].name + " - Daily Bruin"}</title>
        </Head>
        <div style={{ padding: "6px" }}>
          <SectionHeader
            category={this.props.category[0].name}
            description={categoryDescriptions[this.props.category[0].slug]}
            subcategories={sectionLinks}
          />
        </div>
        <CategoryLayout
          posts={this.props.posts}
          categoryID={this.props.category[0].id}
          classifieds={this.props.classifieds.map(c => {
            return {
              category: {
                name: c._embedded["wp:term"][1][0].name,
                url: c._embedded["wp:term"][1][0].link
              },
              content: { name: c.content.rendered, url: c.link }
            };
          })}
        />
      </>
    );
  }
}

export default PageWrapper(Category);
