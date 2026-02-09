import PageWrapper from "layouts/PageWrapper";
import React, { useEffect, createElement } from "react";
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
  // Moved useEffect to top level due to react hook violation
  useEffect(() => {
    if (post && post[0] && post[0].categories && post[0].categories.includes(23087)) {
      window.location.replace(`/sponsored/${post[0].slug}`);
    }
  }, [post]);

  const isInvalidPost = !post || post.data !== undefined || post.length === 0;
  if (isInvalidPost) {
    return <Error statusCode={404} />;
  }
  
  let renderedMeta = [];
  for (let meta of post[0].yoast_meta) {
    renderedMeta.push(createElement("meta", meta));
  }

  return (
    <>
      <Head>
        <title>
          {he.decode(post[0].title.rendered) + " - Daily Bruin"}
        </title>
        {renderedMeta}
      </Head>
      {feature && (
        <FeatureLayout
          article={post[0]}
          authors={authors}
          tagged={tagged}
          relatedPosts={relatedPosts}
        />
      )}
      {oldGallery && (
        <PhotoGalleryLayout
          post={post[0]}
          photos={photos}
          photographers={authors}
        />
      )}
      {gallery && (
        <PGalleryLayout
          post={post[0]}
          authors={authors}
          galleryID={id}
          relatedPosts={relatedPosts}
        />
      )}
      {!feature &&
        !oldGallery &&
        !gallery && (
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
  try {
    // Fetch the main post
    const post = await fetchPost(slug);

    // Return early if post is invalid
    if (!post || post.data !== undefined || post.length === 0) {
      return { post: post ?? [] };
    }

    const postData = post[0];
    const acf = postData.acf || {};

    // Fetch authors and related posts in parallel
    const [authors, relatedPosts] = await Promise.all([
      fetchAuthors(postData.coauthors),
      fetchRelatedPosts(postData.related_posts)
    ]);

    // Handle Feature articles
    if (acf.db_feature === true) {
      const tagged = await fetchTaggedPosts(acf.db_feature_tag);
      return { feature: true, post, authors, tagged, relatedPosts };
    }

    // Handle Old Gallery layout
    if (acf.db_gallery_id === null && acf.gallery !== undefined) {
      const photos = await fetchGalleryPhotos(acf.gallery);
      return { oldGallery: true, post, photos, authors, relatedPosts };
    }

    // Handle New Gallery layout (2021+)
    if (acf.db_gallery_id !== null && acf.db_gallery_id !== "") {
      const photos = await fetchGalleryPhotos(acf.db_gallery_id);
      return { 
        gallery: true, 
        post, 
        id: acf.db_gallery_id, 
        photos, 
        authors, 
        relatedPosts 
      };
    }

    // Handle Regular articles - fetch classifieds
    const classifieds = await fetchClassifieds();
    return { post, classifieds, authors, relatedPosts };

  } catch (error) {
    console.error("Error fetching post data:", error);
    // Return empty/invalid post to trigger 404 page
    return { post: [] };
  }
}

// Helper function to safely fetch JSON
async function safeFetch(url, fallback = null) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`HTTP error fetching ${url}: ${response.status}`);
      return fallback;
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return fallback;
  }
}

// Helper function to fetch the main post
async function fetchPost(slug) {
  return safeFetch(
    `${Config.apiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    []
  );
}

// Helper function to fetch authors in parallel
async function fetchAuthors(coauthors) {
  if (!coauthors || coauthors.length === 0) {
    return [];
  }

  const authorPromises = coauthors.map(author =>
    safeFetch(
      `${Config.apiUrl}/wp-json/wp/v2/users/${author.id}`,
      null
    )
  );

  const results = await Promise.all(authorPromises);
  return results.filter(author => author !== null);
}

// Helper function to fetch related posts
async function fetchRelatedPosts(relatedPostsData) {
  if (!relatedPostsData || relatedPostsData.length === 0) {
    return [];
  }

  const relatedPromises = relatedPostsData.map(related =>
    safeFetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts/${related.id}?_embed`,
      null
    )
  );

  const results = await Promise.all(relatedPromises);
  return results.filter(post => post !== null);
}

// Helper function to fetch tagged posts for features
async function fetchTaggedPosts(featureTag) {
  if (!featureTag || featureTag === "") {
    return [];
  }

  return safeFetch(
    `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${featureTag}`,
    []
  );
}

// Helper function to fetch gallery photos
async function fetchGalleryPhotos(galleryId) {
  if (!galleryId) {
    return [];
  }

  return safeFetch(
    `${Config.apiUrl}/wp-json/db/v1/gallery/${galleryId}`,
    []
  );
}

// Helper function to fetch classifieds
async function fetchClassifieds() {
  return safeFetch(
    `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`,
    []
  );
}

export default PageWrapper(Post);