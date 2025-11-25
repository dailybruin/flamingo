import React from 'react';
import ArticleCard from "../components/ArticleCard";
import StoryList from "../components/StoryList";
import MultimediaScroller from "../components/MultimediaScroller";
import css from "./style.module.css";
import dayjs from "dayjs";

export function buildArticleCard(story, type = "") {
  if (story != null && story != undefined && story.data == undefined) {
    const featured =
      story._embedded &&
      story._embedded["wp:featuredmedia"] &&
      !story._embedded["wp:featuredmedia"].empty
        ? story._embedded["wp:featuredmedia"][0]
        : null;

    const imageWidth =
      featured &&
      featured.media_details &&
      featured.media_details.width
        ? featured.media_details.width
        : 1200;
    const imageHeight =
      featured &&
      featured.media_details &&
      featured.media_details.height
        ? featured.media_details.height
        : 675;

    return (
      <ArticleCard
        displayType={type}
        headline={story.title != undefined ? story.title.rendered : ""}
        excerpt={story.excerpt != undefined ? story.excerpt.rendered : ""}
        content={ story.content != undefined ? story.content.rendered : ""} //currently sending all story content as a prop to all cards
        href={`/post/[slug]`}
        as={story.link}
        link={story.link}
        key={story.id.toString()}
        date={story.date}
        authors={story.coauthors != undefined ? story.coauthors : []}
        category={{
          name: story._embedded["wp:term"][0][0].name,
          href: `/category/[slug]`,
          as: `/category/${story._embedded["wp:term"][0][0].slug}`
        }}
        imageurl={
          featured && featured.source_url
            ? featured.source_url
            : "http://wp.dailybruin.com/images/2017/03/db-logo.png"
        }
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        caption={
          featured &&
          featured.caption &&
          featured.caption.rendered != undefined
            ? featured.caption.rendered
            : ""
        }
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
      : 1200;
  const imageHeight =
    featured &&
    featured.media_details &&
    featured.media_details.height
      ? featured.media_details.height
      : 675;

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
