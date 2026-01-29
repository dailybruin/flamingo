import React from 'react';
import ArticleCard from "../components/ArticleCard";
import StoryList from "../components/StoryList";
import MultimediaScroller from "../components/MultimediaScroller";
import css from "./style.module.css";
import dayjs from "dayjs";

export function buildArticleCard(story, type = "") {
  // Check if story exists and isn't an error object
  if (story && story.data === undefined) {
    // Pre-calculate these to keep the JSX clean
    const featuredMedia = story._embedded?.["wp:featuredmedia"]?.[0];
    const category = story._embedded?.["wp:term"]?.[0]?.[0];
    const imageWidth =
      featuredMedia &&
      featuredMedia.media_details &&
      featuredMedia.media_details.width
        ? featuredMedia.media_details.width
        : null;
    const imageHeight =
      featuredMedia &&
      featuredMedia.media_details &&
      featuredMedia.media_details.height
        ? featuredMedia.media_details.height
        : null;

    return (
      <ArticleCard
        displayType={type}
        headline={story.title?.rendered ?? ""}
        excerpt={story.excerpt?.rendered ?? ""}
        content={story.content?.rendered ?? ""}
        href={`/post/[slug]`}
        as={story.link}
        link={story.link}
        key={story.id.toString()}
        date={story.date}
        authors={story.coauthors ?? []}
        category={{
          name: category?.name ?? "Uncategorized",
          href: `/category/[slug]`,
          as: `/category/${category?.slug ?? ""}`
        }}
        imageurl={featuredMedia?.source_url ?? "http://wp.dailybruin.com/images/2017/03/db-logo.png"}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        caption={featuredMedia?.caption?.rendered ?? ""}
        acf={story.acf}
      />
    );
  } else {
    return <React.Fragment />;
  }
}

export function buildStoryList(type, list, link, isPriority=false) {
  const mappedList = list.map(index => {
    return {
      title: index.title.rendered,
      text: index.excerpt.rendered,
      link: index.link,
      column: index.acf.db_article_format == "column",
      db_display_options: index.acf.db_display_options
    };
  });

  if (mappedList.length == 0) {
    return;
  }

  const first = list[0];
  const featured =
    first._embedded &&
    first._embedded["wp:featuredmedia"] &&
    !first._embedded["wp:featuredmedia"].empty
      ? first._embedded["wp:featuredmedia"][0]
      : null;

  const imageWidth =
    featured &&
    featured.media_details &&
    featured.media_details.width
      ? featured.media_details.width
      : null;
  const imageHeight =
    featured &&
    featured.media_details &&
    featured.media_details.height
      ? featured.media_details.height
      : null;

  if (mappedList.length > 1) {
    mappedList[1].text = "";
  }
  if (mappedList.length > 2) {
    mappedList[2].text = "";
  }

  return (
    <StoryList
      type={type}
      link={link}
      story={mappedList}
      image={{
        src:
          featured && featured.source_url
            ? featured.source_url
            : "http://wp.dailybruin.com/images/2017/03/db-logo.png",
        alt: "N/A",
        width: imageWidth,
        height: imageHeight
      }}
      category={{
        name: list[0]._embedded["wp:term"][0][0].name,
        href: `/category/[slug]`,
        as: `/category/${list[0]._embedded["wp:term"][0][0].slug}`
      }}
      date={list[0].date}
      priority={isPriority}
    />
  );
}

export function buildMultimediaScroller(media) {
  // Safe mapping that handles missing data gracefully
  const mappedMedia = media.map((post) => {
    // 1. Safely access the featured media object
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];

    // 2. Safely access dimensions, defaulting to 0 if missing
    // We check both the media object AND the details object
    const width = featuredMedia?.media_details?.width ?? 0;
    const height = featuredMedia?.media_details?.height ?? 0;

    // 3. Safely access the URL
    const sourceUrl = featuredMedia?.source_url ?? null;

    return {
      title: post.title?.rendered ?? "Untitled Artwork", // Fallback for title
      link: post.link ?? "#",
      image: {
        preview: sourceUrl,
        width: width,
        height: height,
      },
    };
  });

  // Filter out items that have no image so the scroller doesn't show broken cards
  const validMedia = mappedMedia.filter(item => item.image.preview !== null);

  return <MultimediaScroller media={validMedia} />;
}

export function buildArticleList(stories) {
  let postArray = [];
  for (let i = 0; i < stories.length; i++) {
    postArray.push(buildArticleCard(stories[i]));
  }
  return postArray;
}

export function renderPostArray(otherArticleCards, type) {
  let renderedPostArray = [];
  for (let i = 0; i < otherArticleCards.length; i++) {
    renderedPostArray.push(
      <div className={css.card} key={i}>
        {React.cloneElement(otherArticleCards[i], {
          displayType: type
        })}
      </div>
    );
  }
  return renderedPostArray;
}

export function renderVideoArray(otherArticleCards, type) {
  let renderedPostArray = [];
  for (let i = 0; i < otherArticleCards.length; i++) {
    renderedPostArray.push(
      <div className={css["video-card"]}>
        {React.cloneElement(otherArticleCards[i], {
          displayType: type
        })}
      </div>
    );
  }
  return renderedPostArray;
}

export function renderPodcastArray(otherArticleCards, type) {
  let renderedPostArray = [];
  for (let i = 0; i < otherArticleCards.length; i++) {
    renderedPostArray.push(
      <div className={css["podcast-card"]}>
        {React.cloneElement(otherArticleCards[i], {
          displayType: type
        })}
      </div>
    );
  }
  return renderedPostArray;
}

/**
 * Trims posts fetched client-side (InfiniteScroll) to reduce memory usage.
 * Only keeps the fields needed for rendering article cards.
 * 
 * @param {Array} posts - Raw posts from WP API
 * @returns {Array} - Trimmed posts with only necessary fields
 */
export function trimClientPosts(posts) {
  if (!Array.isArray(posts)) return [];
  
  return posts.map(post => {
    const rawFeatured = post._embedded?.["wp:featuredmedia"] || [];
    const trimmedFeatured = rawFeatured.map(media => ({
      source_url: media.source_url,
      caption: media.caption,
      media_details: media.media_details ? {
        width: media.media_details.width,
        height: media.media_details.height,
      } : null,
    }));

    const rawTerms = post._embedded?.["wp:term"] || [];
    const trimmedTerms = rawTerms.map(termArray =>
      Array.isArray(termArray)
        ? termArray.map(term => ({
            id: term.id,
            name: term.name,
            slug: term.slug,
            link: term.link,
          }))
        : []
    );

    return {
      id: post.id,
      date: post.date,
      link: post.link,
      slug: post.slug,
      title: { rendered: post.title?.rendered },
      coauthors: post.coauthors,
      excerpt: { rendered: post.excerpt?.rendered },
      acf: post.acf,
      _embedded: {
        "wp:featuredmedia": trimmedFeatured,
        "wp:term": trimmedTerms,
      },
    };
  });
}
