/**
 * Full: full-width ArticleCard layout with category, headline, image,
 * caption, excerpt, and byline stacked vertically.
 * This is the default card variant when no `displayType` is specified.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as locals from "./locals";
import * as styles from "./styles";
import { renderAuthors, getHeadlineStyle } from "./utilities";
import dayjs from "dayjs";
import Image from "next/image";

export default function Full(props) {
  const hasDimensions = props.imageWidth && props.imageHeight;
  const headlineFontStyle = getHeadlineStyle(props.acf);

  return (
    <div css={css`${styles.blockCard}`} className="full">
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

      <a href={props.as} style={{ textDecoration: "none" }}>
        {/* Headline */}
        <div
          css={css`
            margin: 2px 0 6px;
            ${locals.headline};
          `}
          style={{ fontStyle: headlineFontStyle }}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        />

        {/* Article image — ~50% desktop, ~85% mobile */}
        {hasDimensions ? (
          <Image
            src={props.imageurl}
            alt={props.title || "Article image"}
            width={props.imageWidth}
            height={props.imageHeight}
            layout="responsive"
            sizes="(max-width: 768px) 85vw, 50vw"
            priority={props.priority}
          />
        ) : (
          <img
            css={css`${styles.responsiveImage}`}
            src={props.imageurl}
            alt={props.title || "Article image"}
          />
        )}

        {/* Caption */}
        <div
          css={css`${styles.captionText}`}
          dangerouslySetInnerHTML={{ __html: props.caption }}
        />

        {/* Excerpt */}
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