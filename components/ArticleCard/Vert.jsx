/**
 * Vert: vertical ArticleCard layout with image on top, category, headline,
 * excerpt, and byline stacked below.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as locals from "./locals";
import * as styles from "./styles";
import { renderAuthors, getHeadlineStyle } from "./utilities";
import dayjs from "dayjs";
import Image from "next/image";

export default function Vert(props) {
  const hasDimensions = props.imageWidth && props.imageHeight;
  const headlineFontStyle = getHeadlineStyle(props.acf);

  return (
    <div css={css`${styles.blockCard}`} className="vert">
      {/* Article thumbnail image */}
      <a href={props.as} style={{ textDecoration: "none" }}>
        {hasDimensions ? (
          <Image
            src={props.imageurl}
            alt={props.title || "Article image"}
            width={props.imageWidth}
            height={props.imageHeight}
            layout="responsive"
            sizes="20vw"
            priority={!!props.priority}
          />
        ) : (
          <img
            css={css`${styles.responsiveImage}`}
            src={props.imageurl}
            alt={props.title || "Article image"}
          />
        )}
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
            ${locals.headline};
          `}
          style={{ fontStyle: headlineFontStyle }}
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