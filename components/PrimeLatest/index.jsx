import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import { archiveUrl } from "../../lib/primeArchive";

/*
 * "The Latest" -- stories pulled from the PRIME archive, sitting above the
 * classifieds box on the category page.
 *
 * The stories are picked once a week in getInitialProps and handed down, so the
 * same pair renders on the server and in the browser. Don't pick them here.
 *
 * Thumbnails are plain <img> on purpose. The covers live on assets3.dailybruin.com,
 * which isn't in next.config.js images.domains, and adding a host there changes
 * image handling for the whole site to decorate one sidebar.
 */

function LatestStory({ article, showExcerpt }) {
  return (
    <div
      css={css`
        padding: 13px 0;
        border-bottom: 1px solid ${globals.gray};

        &:last-of-type {
          border-bottom: none;
          padding-bottom: 6px;
        }
      `}
    >
      <a
        href={archiveUrl(article)}
        css={css`
          text-decoration: none;
          color: ${globals.black};
          display: block;

          &:hover h4 {
            text-decoration: underline;
          }
        `}
      >
        {article.coverimg && (
          <img
            src={article.coverimg}
            alt={article.coveralt || ""}
            loading="lazy"
            css={css`
              width: 100%;
              aspect-ratio: 3 / 2;
              object-fit: cover;
              display: block;
              margin-bottom: 8px;
              background-color: ${globals.lightGray};
            `}
          />
        )}

        {article.issue && (
          <div
            css={css`
              font-family: ${globals.menuFont};
              font-size: 9.5px;
              font-weight: 700;
              letter-spacing: 0.17em;
              text-transform: uppercase;
              color: ${globals.DBblue};
              margin-bottom: 4px;
            `}
          >
            {article.issue}
          </div>
        )}

        <h4
          css={css`
            font-family: ${globals.headlineFont};
            font-size: 15px;
            line-height: 1.15;
            margin: 0 0 5px;
          `}
        >
          {article.headline}
        </h4>

        {showExcerpt && article.excerpt && (
          <p
            css={css`
              font-family: ${globals.bodyFont};
              font-weight: 300;
              font-size: 12.5px;
              line-height: 1.45;
              color: #2a2a2a;
              margin: 0 0 6px;
            `}
          >
            {article.excerpt}
          </p>
        )}

        {article.author && (
          <div
            css={css`
              font-family: ${globals.menuFont};
              font-size: 10px;
              font-weight: 600;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: ${globals.darkGray};
            `}
          >
            {article.author}
          </div>
        )}
      </a>
    </div>
  );
}

export default function PrimeLatest({ articles, showExcerpt = true }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div
      css={css`
        background-color: ${globals.white};
        box-shadow: ${globals.cardShadow};
        padding: 12px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          border-bottom: 2px solid ${globals.black};
          padding-bottom: 6px;
        `}
      >
        <h3
          css={css`
            font-family: ${globals.menuFont};
            font-size: 17px;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            margin: 0;
          `}
        >
          The Latest
        </h3>
        <span
          css={css`
            font-family: ${globals.menuFont};
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: ${globals.darkGray};
            white-space: nowrap;
          `}
        >
          Archive
        </span>
      </div>

      {articles.map(article => (
        <LatestStory
          key={article.slug}
          article={article}
          showExcerpt={showExcerpt}
        />
      ))}
    </div>
  );
}
