import PageWrapper from "../../layouts/PageWrapper";
import React from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";

import SectionHeader from "../../components/SectionHeader";
import CategoryLayout from "../../layouts/Category";
import MultimediaLayout from "../../layouts/Multimedia";
import { trimClientPosts } from "../../layouts/utilities";

// Categories that use MultimediaLayout instead of CategoryLayout
const MULTIMEDIA_CATEGORIES = ["graphics", "illo", "cartoons"];

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
      engaging visualizations and apply quantitative insights to topics relevant to our UCLA community.",
    mobile:
      "The Stack is the Daily Bruin's data journalism section. We investigate public data, create \
      engaging visualizations and apply quantitative insights to topics relevant to our UCLA community."
  }
};

/* 
 * These descriptions don't show up on the page;
 * Only for the descriptions that show up on Google searches. 
 */
const categoryMetaDescriptions = {
  "sponsored":
      "Sponsored is an advertisement page managed by the Bruin Media Group. Increase visibility and traffic to your company's brand or products through the Daily Bruin website. Grow your business online with Sponsored to bring in new customers."
};

function Category({ category, subcategories, posts, classifieds }) {
  if (
    category == undefined ||
    category.data != undefined ||
    category.length == 0
  ) {
    return <Error statusCode={404} />;
  }
  const sectionLinks = subcategories.map(index => {
    const subsubcategoriesSimple = index.subsubcategories.map(index => {
      return { name: index.name, link: `/category/${index.slug}` };
    });
    return {
      name: index.name,
      link: `/category/${index.slug}`,
      subsubcategories: subsubcategoriesSimple
    };
  });

  // Fetch meta description from categoryMetaDescriptions
  let metaDescription = null;
  try {
    const slug = category[0].slug;
    if (categoryMetaDescriptions && categoryMetaDescriptions[slug]) {
      metaDescription = categoryMetaDescriptions[slug];
    }
  } catch (e) {
    metaDescription = null;
  }

  let pageTitle = category[0].name + " - Daily Bruin"
  const isMultimediaCategory = MULTIMEDIA_CATEGORIES.includes(category[0].slug);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <meta itemProp="name" content={pageTitle}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={pageTitle}></meta>
        <meta name="twitter:title" content={pageTitle}></meta>

        {metaDescription && (
          <>
            <meta name="description" content={metaDescription} />
            <meta itemProp="description" content={metaDescription} />
            <meta property="og:description" content={metaDescription} />
            <meta name="twitter:description" content={metaDescription} />
          </>
        )}
      </Head>
      <div style={{ padding: "6px" }}>
        <SectionHeader
          category={category[0].name}
          description={categoryDescriptions[category[0].slug]}
          subcategories={sectionLinks}
        />
      </div>
      {isMultimediaCategory ? (
        <MultimediaLayout
          posts={posts}
          categoryID={category[0].id}
        />
      ) : (
        <CategoryLayout
          posts={posts}
          categoryID={category[0].id}
          classifieds={classifieds.map(c => {
            return {
              category: {
                name: c._embedded["wp:term"][1][0].name,
                url: c._embedded["wp:term"][1][0].link
              },
              content: { name: c.content.rendered, url: c.link }
            };
          })}
        />
      )}
    </>
  );
}

Category.getInitialProps = async (context) => {
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
    // Multimedia categories have a simpler data fetch (no subcategories/classifieds)
    if (MULTIMEDIA_CATEGORIES.includes(slug)) {
      const subcategories = [];
      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${category[0].id}`
      );
      const posts = await postsRes.json();
      // Trim posts to reduce page data size
      const trimmedPosts = trimClientPosts(posts);
      return { category, subcategories, posts: trimmedPosts, classifieds: [] };
    }

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
    // Trim posts to reduce page data size
    const trimmedPosts = trimClientPosts(posts);

    const classifiedsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
    );
    const classifieds = await classifiedsRes.json();
    return { category, subcategories, posts: trimmedPosts, classifieds };
  } else {
    return { category };
  }
};

export default PageWrapper(Category);
