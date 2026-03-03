/**
 * Horz: horizontal ArticleCard layout with a 50/50 split:
 * image on the left, category/headline/excerpt/byline on the right.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as globals from "../globals";
import * as locals from "./locals";
import * as styles from "./styles";
import { renderAuthors, getHeadlineStyle } from "./utilities";
import dayjs from "dayjs";
import Image from "next/image";

export default function Horz(props) {
  const headlineFontStyle = getHeadlineStyle(props.acf);

  return (
    <div css={css`${styles.flexCard}`} className="horz">
      {/* Left column — image */}
      <div
        css={css`
          padding: ${globals.cardPadding};
          width: 50%;
        `}
      >
        <a href={props.as} style={{ textDecoration: "none" }}>
          <div css={css`${styles.fillImageContainer}`}>
            <Image
              src={props.imageurl}
              alt={props.title || "Article image"}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              sizes="30vw"
            />
          </div>
        </a>
        <h4
          css={css`
            display: block;
            margin: 2px 0 0;
            ${styles.photographerCredit}
          `}
        >
          {props.photographer}
        </h4>
      </div>

      {/* Right column (text content) */}
      <div
        css={css`
          padding: ${globals.cardPadding};
          padding-left: 0;
          width: 50%;
        `}
      >
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
    </div>
  );
}
