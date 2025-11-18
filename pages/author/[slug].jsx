import PageWrapper from "../../layouts/PageWrapper";
import React from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";

import AuthorLayout from "../../layouts/Author";

function Author({ author, posts, classifieds }) {
  if (author == undefined || author.length == 0) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>{author[0].name + " - Daily Bruin"}</title>
      </Head>
      <AuthorLayout
        author={author[0]}
        posts={posts}
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

Author.getInitialProps = async (context) => {
  const { slug } = context.query;
  const authorRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/users?slug=${slug}`
  );
  const author = await authorRes.json();
  const postsRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&filter[author_name]=${slug}&categories_exclude=27179,27127` // 27179 is the category id of breaking feed posts
  );
  const posts = await postsRes.json();
  const classifiedsRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
  );
  const classifieds = await classifiedsRes.json();
  return { author, posts, classifieds };
};

export default PageWrapper(Author);
