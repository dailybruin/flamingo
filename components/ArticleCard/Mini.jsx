/**
 * Mini — compact ArticleCard with a small thumbnail on the left and
 * category + headline on the right. Used for related posts, sidebar lists, etc.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as locals from "./locals";
import * as styles from "./styles";
import { getHeadlineStyle } from "./utilities";
import Image from "next/image";

export default function Mini(props) {
  const headlineFontStyle = getHeadlineStyle(props.acf);

  return (
    <div css={css`${styles.flexCard}`} className="mini">
      {/* Thumbnail column */}
      <div css={css`width: 100px; min-width: 100px;`}>
        <a href={props.as} style={{ textDecoration: "none" }}>
          <div
            css={css`
              height: 100%;
              width: 100%;
              min-height: 50px;
              overflow: hidden;
              position: relative;
            `}
          >
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
      </div>

      {/* Text content column */}
      <div css={css`padding: 10px;`}>
        {/* Category */}
        <span>
          <a href={props.category?.as} css={css`${styles.categoryLink}`}>
            <h2
              css={css`
                ${styles.categoryHeading}
                margin: 0;
              `}
              dangerouslySetInnerHTML={{ __html: props.category?.name }}
            />
          </a>
        </span>

        {/* Headline (smaller for mini variant) */}
        <a href={props.as} style={{ textDecoration: "none" }}>
          <h1
            css={css`
              margin: 2px 0 4px;
              ${locals.headline};
              font-size: 0.85rem;
              font-weight: 550;
            `}
            style={{ fontStyle: headlineFontStyle }}
            dangerouslySetInnerHTML={{ __html: props.headline }}
          />
        </a>
      </div>
    </div>
  );
}
