import PageWrapper from "../../layouts/PageWrapper";
import React from "react";
import Error from "next/error";
import Head from "next/head";

import {
  fetchTagWithSlug,
  fetchPostsFromTagId,
  fetchClassifieds
} from "../../lib/fetchWordPress";

import TagHeader from "../../components/TagHeader";
import TagLayout from "../../layouts/Tag";

function Tag({ tag, posts, classifieds }) {
  if (tag.data != undefined || tag.length == 0)
    return <Error statusCode={404} />;
  return (
    <>
      <Head>
        <title
          dangerouslySetInnerHTML={{
            __html: tag[0].name + " - Daily Bruin"
          }}
        />
      </Head>
      <div>
        <div style={{ padding: "6px" }}>
          <TagHeader
            tag={tag[0].name}
            explainer={tag[0].description}
          />
        </div>
        <TagLayout
          tagID={tag[0].id}
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
      </div>
    </>
  );
}

Tag.getInitialProps = async (context) => {
  const { slug } = context.query;
  const tag = await fetchTagWithSlug(slug);
  if (tag.length > 0) {
    const [posts, classifieds] = await Promise.all([
      fetchPostsFromTagId(tag[0].id),
      fetchClassifieds()
    ]);
    return { tag, posts, classifieds };
  }
  return { tag };
};

export default PageWrapper(Tag);
