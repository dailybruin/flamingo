import PageWrapper from "../../layouts/PageWrapper";
import React from "react";
import Link from "next/link";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";

import SectionHeader from "../../components/SectionHeader";
import PodcastsLayout from "../../layouts/Podcasts";

function Category({ category, subcategories, posts, classifieds }) {
  if (category.length == 0) return <Error statusCode={404} />;
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
  return (
    <>
      <Head>
        <title>{category[0].name + " - Daily Bruin"}</title>
      </Head>
      <div style={{ padding: "6px" }}>
        <SectionHeader
          category={category[0].name}
          subcategories={sectionLinks}
        />
      </div>
      <PodcastsLayout
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
    </>
  );
}

Category.getInitialProps = async () => {
  const categoryRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/categories?slug=podcasts`
  );
  const category = await categoryRes.json();
  if (category.length > 0) {
    const subcategories = [];
    const postsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${category[0].id}`
    );
    const posts = await postsRes.json();

    const classifiedsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
    );
    const classifieds = await classifiedsRes.json();
    return { category, subcategories, posts, classifieds };
  }
  return { category };
};

export default PageWrapper(Category);
