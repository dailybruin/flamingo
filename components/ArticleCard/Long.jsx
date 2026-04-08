/**
 * Long: horizontal ArticleCard layout with the image on the left (via CSS order)
 * and category/headline/excerpt/byline text on the right. Uses flex layout.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as locals from "./locals";
import * as styles from "./styles";
import { renderAuthors, getHeadlineStyle } from "./utilities";
import dayjs from "dayjs";
import Image from "next/image";

export default function Long(props) {
  const headlineFontStyle = getHeadlineStyle(props.acf);

  return (
    <div
      css={css`
        ${styles.flexCard}
        height: 100%;
      `}
      className="long"
    >
      {/* Text content column */}
      <div css={css`padding: 10px; flex: 3;`}>
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

        {/* Headline */}
        <a href={props.as} style={{ textDecoration: "none" }}>
          <h1
            css={css`
              margin: 2px 0;
              ${locals.headline};
            `}
            style={{ fontStyle: headlineFontStyle }}
            dangerouslySetInnerHTML={{ __html: props.headline }}
          />
        </a>

        {/* Excerpt */}
        <a href={props.as} style={{ textDecoration: "none" }}>
          <div
            css={css`${locals.excerpt}`}
            dangerouslySetInnerHTML={{ __html: props.excerpt }}
          />
        </a>

        {/* Author byline */}
        <h3 css={css`${styles.authorBylineSpaced}`}>
          By {renderAuthors(props.authors)}
        </h3>
      </div>

      {/* Image column */}
      <div
        css={css`
          flex-basis: 350px;
          order: -1;
          padding: 10px;
        `}
      >
        <a href={props.as} style={{ textDecoration: "none" }}>
          <div
            css={css`
              ${styles.fillImageContainer}
              min-height: 200px;
            `}
          >
            <Image
              src={props.imageurl}
              alt={props.title || "Article image"}
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
