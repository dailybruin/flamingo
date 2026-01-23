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
        caption={featuredMedia?.caption?.rendered ?? ""}
        acf={story.acf}
      />
    );
  } else {
    return <React.Fragment />;
  }
}

export function buildStoryList(type, list, link) {
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
        src: list[0]._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "http://wp.dailybruin.com/images/2017/03/db-logo.png",
        alt: "N/A"
      }}
      category={{
        name: list[0]._embedded["wp:term"][0][0].name,
        href: `/category/[slug]`,
        as: `/category/${list[0]._embedded["wp:term"][0][0].slug}`
      }}
      date={list[0].date}
    />
  );
}

export function buildMultimediaScroller(media) {
  const mappedMedia = media.map(index => {
    return {
      title: index.title.rendered,
      link: index.link,
      preview:
        index._embedded["wp:featuredmedia"] != undefined
          ? index._embedded["wp:featuredmedia"][0].source_url
          : null
    };
  });
  return <MultimediaScroller media={mappedMedia} />;
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
    }));

    const rawTerms = post._embedded?.["wp:term"] || [];
    const trimmedTerms = rawTerms.map(termArray =>
      Array.isArray(termArray)
        ? termArray.map(term => ({
            id: term.id,
            name: term.name,
            slug: term.slug,
          }))
        : []
    );

    return {
      id: post.id,
      date: post.date,
      link: post.link,
      slug: post.slug,
      title: post.title,
      coauthors: post.coauthors,
      excerpt: post.excerpt,
      acf: post.acf,
      _embedded: {
        "wp:featuredmedia": trimmedFeatured,
        "wp:term": trimmedTerms,
      },
    };
  });
}
