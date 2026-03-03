/**
 * Breaking: ArticleCard variant for breaking-news live updates.
 * Displays author, absolute time, relative elapsed time, headline,
 * full content, and an optional image with caption.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as styles from "./styles";
import {
  renderAuthors,
  getHeadlineStyle,
  formatTimeDiff,
  isDefaultImage
} from "./utilities";
import Image from "next/image";

export default function Breaking(props) {
  const postTime = new Date(props.date);
  const timeDiff = formatTimeDiff(props.date);
  const headlineFontStyle = getHeadlineStyle(props.acf);
  const showImage = !isDefaultImage(props.imageurl);

  return (
    <div css={css`${styles.breakingCard}`} className="breaking">
      {/* Text content section */}
      <div css={css`${styles.breakingContentPadding}`}>
        {/* Author byline, date, and elapsed time */}
        <span>
          <span>
            <h3 css={css`${styles.authorBylineInline}`}>
              {renderAuthors(props.authors)}
            </h3>
          </span>
          <span css={css`${styles.dateTextNoBorder}`}>
            {postTime.toLocaleString()}
          </span>
          <span css={css`${styles.dateText}`}>
            {timeDiff}
          </span>
        </span>

        {/* Headline */}
        <div
          css={css`
            margin: 2px 0 4px;
            ${styles.breakingHeadline}
          `}
          style={{ fontStyle: headlineFontStyle }}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        />

        {/* Full article content */}
        <div
          css={css`
            margin: 0 0 5px;
            ${styles.breakingBodyText}
          `}
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>

      {/* Optional image and caption (hidden when using default placeholder) */}
      {showImage && (
        <>
          <div css={css`${styles.fillImageContainer}`}>
            <Image
              src={props.imageurl}
              alt={props.title || "Article image"}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              style={{
                padding: 20,
                paddingTop: 0,
                paddingBottom: props.caption ? 0 : 10
              }}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: props.caption }}
            css={css`${styles.breakingCaption}`}
          />
        </>
      )}
    </div>
  );
}
