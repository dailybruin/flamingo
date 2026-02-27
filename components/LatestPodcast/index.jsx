/**
 * LatestPodcast: renders the latest podcast episode's embedded player
 * on the home page. The WordPress post content typically contains an
 * iframe embed (Spotify, Apple Podcasts, etc.) which is rendered directly.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as globals from "../globals";
import dayjs from "dayjs";

export default function LatestPodcast({ podcast }) {
  if (!podcast) return null;

  return (
    <div
      css={css`
        display: block;
        box-shadow: ${globals.cardShadow};
        background-color: #ffffff;
        overflow: hidden;
      `}
    >
      {/* Section header */}
      <div
        css={css`
          background-color: #000000;
          padding: 2px 10px 0;
          box-shadow: ${globals.cardShadow};
          font-family: ${globals.menuFont};
          font-style: normal;
          font-weight: 900;
          font-size: 18px;
          line-height: 24px;
          text-transform: uppercase;
          color: #ffffff;
          height: 27px;
        `}
      >
        Latest Podcast
      </div>

      {/* Podcast content */}
      <div css={css`padding: 10px;`}>
        {/* Title linking to full article */}
        <a
          href={podcast.link}
          css={css`
            text-decoration: none;
            color: #000000;
            &:hover {
              color: ${globals.DBblue};
            }
          `}
        >
          <h3
            css={css`
              margin: 0 0 4px;
              font-family: ${globals.headlineFont};
              font-style: normal;
              font-weight: bold;
              font-size: 1.1rem;
              line-height: 1.25;
            `}
            dangerouslySetInnerHTML={{ __html: podcast.title }}
          />
        </a>

        {/* Date */}
        <span
          css={css`
            font-family: ${globals.bodyFont};
            font-weight: 300;
            font-size: 11px;
            color: ${globals.darkGray};
          `}
        >
          {podcast.date
            ? dayjs(podcast.date).format("MMM D, YYYY")
            : ""}
        </span>

        {/* Embedded player from WordPress content */}
        <div
          css={css`
            margin-top: 8px;

            /* Make any embedded iframes responsive */
            iframe {
              max-width: 100%;
              border-radius: 8px;
            }

            /* Hide non-embed content (text paragraphs, images, etc.)
               so only the player iframe shows */
            & > p,
            & > div:not(:has(iframe)),
            & > figure,
            & > img {
              display: none;
            }

            /* Keep containers that hold iframes visible */
            & > div:has(iframe),
            & > p:has(iframe),
            & > figure:has(iframe) {
              display: block;
            }
          `}
          dangerouslySetInnerHTML={{ __html: podcast.content }}
        />
      </div>
    </div>
  );
}
