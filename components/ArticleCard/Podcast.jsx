/**
 * Podcast: ArticleCard variant for podcast episodes. Uses a 1:1 (square)
 * aspect ratio thumbnail with category, headline, excerpt, and byline below.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as locals from "./locals";
import * as styles from "./styles";
import { renderAuthors } from "./utilities";
import dayjs from "dayjs";
import Image from "next/image";

export default function Podcast(props) {
  return (
    <div
      css={css`
        ${styles.blockCard}
        height: 100%;
      `}
      className="podcast"
    >
      {/* 1:1 square podcast cover art */}
      <a href={props.as} style={{ textDecoration: "none" }}>
        <div
          css={css`
            width: 100%;
            margin: auto;
            padding-top: 100%;
            position: relative;
          `}
        >
          <Image
            src={props.imageurl}
            alt={props.title || "Podcast image"}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        </div>
      </a>

      {/* Photographer credit */}
      <h4 css={css`${styles.photographerCredit}`}>
        {props.photographer}
      </h4>

      {/* Category and date */}
      <span>
        <a href={props.category?.as} css={css`${styles.categoryLink}`}>
          <h2
            css={css`${styles.categoryHeading}`}
            dangerouslySetInnerHTML={{ __html: props.category?.name }}
          />
        </a>
        <span css={css`${styles.dateText}`}>
          {dayjs(props.date).format("MMM D, YYYY h:mm a")}
        </span>
      </span>

      {/* Headline and excerpt */}
      <a href={props.as} style={{ textDecoration: "none" }}>
        <div
          css={css`
            margin: 2px 0 4px;
            ${locals.headline}
          `}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        />
        <div
          css={css`
            margin: 0 0 5px;
            ${locals.excerpt}
          `}
          dangerouslySetInnerHTML={{ __html: props.excerpt }}
        />
      </a>

      {/* Author byline */}
      <h3 css={css`${styles.authorByline}`}>
        By {renderAuthors(props.authors)}
      </h3>
    </div>
  );
}
