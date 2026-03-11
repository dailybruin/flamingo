/**
 * Article component: renders a full article page including headline, feature
 * image, byline, body content, share buttons, and author cards
 *
 * Props:
 *   headline, link, date, authors, categories, featureimg, featureimgWidth,
 *   featureimgHeight, caption, content, acf
 */

import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import {
  renderCategories,
  renderAuthors,
  getAuthorImage,
  getHeadlineStyle
} from "./utilities";
import * as styles from "./styles";
import ShareButtons from "../ShareButtons";
import ReviewInfobox from "../ReviewInfobox";
import AuthorCard from "../AuthorCard";
import Image from "next/image";

export default function Article(props) {
  const {
    authors = [],
    acf = {},
    headline,
    link,
    date,
    categories,
    featureimg,
    featureimgWidth,
    featureimgHeight,
    caption,
    content
  } = props;

  // Filter out authors that weren't properly fetched
  const validAuthors = authors.filter((a) => a && a.name);

  // Build circular author avatar thumbnails for the byline area
  const authorPictures = validAuthors.map((author) => (
    <a key={`pic-${author.slug}`} href={`/author/${author.slug}`}>
      <div css={css`${styles.authorAvatar}`}>
        <Image
          src={getAuthorImage(author)}
          alt={author.name || "Author"}
          layout="fill"
          objectFit="cover"
          sizes="96px"
          loading="lazy"
        />
      </div>
    </a>
  ));

  // Build full author bio cards shown at the bottom of the article
  const renderedAuthorCards = validAuthors.map((author) => (
    <div css={css`${styles.authorCardWrapper}`} key={author.name}>
      <AuthorCard
        image={getAuthorImage(author)}
        name={author.name}
        description={author.description}
        position={author.acf?.position}
        twitter={author.acf?.twitter}
        email={author.media_email}
        link={author.link}
      />
    </div>
  ));

  // Render review infobox if the ACF field is set
  const renderedInfobox = acf.db_infobox ? (
    <ReviewInfobox
      title={acf.db_infobox}
      rating={acf.db_number_of_paws === "" ? null : acf.db_number_of_paws}
    />
  ) : null;

  // Use NextJS <Image> when dimensions are available, and we can otherwise fall back to <img>
  const hasDimensions = featureimgWidth && featureimgHeight;

  // Determine italic headline style from ACF metadata
  const headlineFontStyle = getHeadlineStyle(acf);

  return (
    <div css={css`${styles.cardWrapper}`}>
      {/* Category links */}
      <div css={css`${styles.categoryRow}`}>
        {renderCategories(categories)}
      </div>

      {/* Headline */}
      <h1
        css={css`${styles.headline}`}
        style={{ fontStyle: headlineFontStyle }}
        dangerouslySetInnerHTML={{ __html: headline }}
      />

      {/* Feature image (links to original source) */}
      <a
        href={featureimg}
        target="_blank"
        rel="noopener noreferrer"
        css={css`${styles.featureImageLink}`}
      >
        {hasDimensions ? (
          <Image
            src={featureimg}
            alt="Feature image"
            width={featureimgWidth}
            height={featureimgHeight}
            layout="responsive"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        ) : (
          <img
            src={featureimg}
            alt="Feature image"
            css={css`${styles.featureImageFallback}`}
          />
        )}
      </a>

      {/* Image caption */}
      <div
        dangerouslySetInnerHTML={{ __html: caption }}
        css={css`${styles.caption}`}
      />

      {/* Article body section */}
      <div css={css`${styles.bodyPadding}`}>
        {/* Floating infobox (review rating, etc.) */}
        <div css={css`${styles.infoboxWrapper}`}>
          {renderedInfobox}
        </div>

        {/* Author avatars and byline */}
        <div>
          {authorPictures}
          <div style={{ display: "inline-block", verticalAlign: "middle" }}>
            <h3 css={css`${styles.authorByline}`}>
              By {renderAuthors(authors)}
            </h3>
            <h4 css={css`${styles.dateLine}`}>
              {dayjs.utc(date).format("MMM D, YYYY h:mm a")}
            </h4>
          </div>
        </div>

        {/* Corrections notice (only shown when corrections exist) */}
        {acf.corrections && acf.corrections !== "" && (
          <div
            css={css`${styles.corrections}`}
            dangerouslySetInnerHTML={{ __html: acf.corrections }}
          />
        )}

        {/* Main article content */}
        <div
          css={css`${styles.contentBody}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Share buttons */}
        <div>
          <ShareButtons title={headline} url={link} />
        </div>

        {/* Author bio cards */}
        <div css={css`${styles.authorCardsContainer}`}>
          {renderedAuthorCards}
        </div>
      </div>
    </div>
  );
}
