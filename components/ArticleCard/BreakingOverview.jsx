/**
 * BreakingOverview: summary card shown at the top of a breaking-news feed.
 * Displays a "What we're covering here" header, an excerpt, and an optional image.
 * Has a red border to visually distinguish it from regular Breaking cards.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as styles from "./styles";
import { isDefaultImage } from "./utilities";
import Image from "next/image";

export default function BreakingOverview(props) {
  const showImage = !isDefaultImage(props.imageurl);

  return (
    <div
      css={css`
        ${styles.breakingCard}
        border: 2px solid #d12008;
        position: sticky;
      `}
      className="breakingOverview"
    >
      {/* Header and excerpt */}
      <div css={css`${styles.breakingContentPadding}`}>
        <span>
          <span>
            <h3
              css={css`
                ${styles.breakingHeadline}
                margin: 0;
                font-size: 1.3rem;
                display: inline;
              `}
            >
              {"What we're covering here"}
            </h3>
          </span>
        </span>
        <div
          css={css`
            margin: 10px 0 5px;
            ${styles.breakingBodyText}
          `}
          dangerouslySetInnerHTML={{ __html: props.excerpt }}
        />
      </div>

      {/* Optional image (hidden when using default placeholder) */}
      {showImage && (
        <div css={css`${styles.fillImageContainer}`}>
          <Image
            src={props.imageurl}
            alt={props.title || "Article image"}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            style={{ padding: 20, paddingTop: 0, paddingBottom: 10 }}
          />
        </div>
      )}
    </div>
  );
}
