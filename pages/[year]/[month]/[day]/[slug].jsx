import PageWrapper from "layouts/PageWrapper";
import React, { useEffect } from "react";
import Error from "next/error";
import { Config } from "config.js";
import Head from "next/head";
import he from "he";

import ArticleLayout from "layouts/Article";
import PhotoGalleryLayout from "layouts/PhotoGallery/index_old"; //old photo gallery layout
import PGalleryLayout from "layouts/PhotoGallery/PGalleryLayout"; //new 2021 gallery layout
import FeatureLayout from "layouts/Feature";

/* TODO: note to future devs: old gallery layout seeks acf field "gallery" that has an int. new gallery layout seeks acf field "db_gallery_id" that has an int. */

function Post({ post, id, feature, authors, tagged, relatedPosts, gallery, oldGallery, photos, classifieds }) {
  if (
    post == undefined ||
    post == null ||
    post.data != undefined ||
    post.length == 0
  ) {
    return <Error statusCode={404} />;
  }
  let renderedMeta = [];
  for (let meta of post[0].yoast_meta) {
    renderedMeta.push(React.createElement("meta", meta));
  }

  useEffect(() => {
    if (post[0].categories.includes(23087)) {
      window.location.replace(`/sponsored/${post[0].slug}`);
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          {he.decode(post[0].title.rendered) + " - Daily Bruin"}
        </title>
        {renderedMeta}
      </Head>
      {feature == true && (
        <FeatureLayout
          article={post[0]}
          authors={authors}
          tagged={tagged}
          relatedPosts={relatedPosts}
        />
      )}
      {oldGallery == true && (
        <PhotoGalleryLayout
          post={post[0]}
          photos={photos}
          photographers={authors}
        />
      )}
      {gallery == true && (
        <PGalleryLayout
          post={post[0]}
          authors={authors}
          galleryID={id}
          relatedPosts={relatedPosts}
        />
      )}
      {photos == undefined &&
        feature != true &&
        gallery != true && (
          <ArticleLayout
            article={post[0]}
            authors={authors}
            relatedPosts={relatedPosts}
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

Post.getInitialProps = async (context) => {
  const { slug } = context.query;
  const postRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed`
  );
  const post = await postRes.json();

  if (post.data != undefined || post.length == 0) {
    return { post };
  }
  let authors = [];
  if (post[0].coauthors != undefined) {
    for (let author of post[0].coauthors) {
      const authorsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/users/${author.id}`
      );
      authors.push(await authorsRes.json());
    }
  }
  let relatedPosts = [];
  if (post[0].related_posts != undefined) {
    for (let related of post[0].related_posts) {
      const relatedRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts/${related.id}?_embed`
      );
      relatedPosts.push(await relatedRes.json());
    }
  }
  if (post[0].acf["db_feature"] == true) {
    let feature = true;
    let tagged = [];
    if (post[0].acf["db_feature_tag"] != "") {
      const taggedRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${
          post[0].acf["db_feature_tag"]
        }`
      );
      tagged = await taggedRes.json();
    }
    return { feature, post, authors, tagged, relatedPosts };
  }
  // it's a page with old gallery layout
  if (
    post[0].acf["db_gallery_id"] == null &&
    post[0].acf.gallery != undefined
  ) {
    // console.log("Detected as old gallery layout.")
    const photosRes = await fetch(
      `${Config.apiUrl}/wp-json/db/v1/gallery/${post[0].acf.gallery}`
    );
    const photos = await photosRes.json();
    const oldGallery = true;
    return { oldGallery, post, photos, authors, relatedPosts };
  }
  // it's a page with new gallery layout
  if (
    post[0].acf["db_gallery_id"] != null &&
    post[0].acf["db_gallery_id"] != ""
  ) {
    // console.log("Detected as new gallery layout.")
    const photosRes = await fetch(
      `${Config.apiUrl}/wp-json/db/v1/gallery/${post[0].acf["db_gallery_id"]}`
    );
    const photos = await photosRes.json();
    const gallery = true;
    const id = post[0].acf["db_gallery_id"];
    return { gallery, post, id, photos, authors, relatedPosts };
  }
  const classifiedsRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
  );
  const classifieds = await classifiedsRes.json();
  return { post, classifieds, authors, relatedPosts };
}

export default PageWrapper(Post);