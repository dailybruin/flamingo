import PageWrapper from "../../layouts/PageWrapper";
import React from "react";
import Link from "next/link";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";

import SectionHeader from "../../components/SectionHeader";
import MultimediaLayout from "../../layouts/Multimedia";

function Graphics({ category, subcategories, posts }) {
  if (category.length == 0) return <Error statusCode={404} />;

  const postsLinks = posts.map((category, index) => {
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
    <div>
      <Head>
        <title>{category[0].name + " - Daily Bruin"}</title>
      </Head>
      <div style={{ padding: "6px" }}>
        <SectionHeader
          category={category[0].name}
          subcategories={sectionLinks}
        />
      </div>
      <MultimediaLayout
        posts={posts}
        categoryID={category[0].id}
      />
    </div>
  );
}

Graphics.getInitialProps = async () => {
  const categoryRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/categories?slug=graphics`
  );
  const category = await categoryRes.json();
  if (category.length > 0) {
    const subcategories = [];
    const postsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${category[0].id}`
    );
    const posts = await postsRes.json();
    return { category, subcategories, posts };
  }
  return { category };
};

export default PageWrapper(Graphics);
