/**
 * LatestPodcast: renders the latest podcast episode's embedded player
 * on the home page. The WordPress post content typically contains an
 * iframe embed (Spotify, Apple Podcasts, etc.) which is rendered directly.
 */
import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";

export default function LatestPodcast({ podcast }) {
  if (!podcast) return null;

  return (
    <div
      css={css`
        /* Embedded player from WordPress content */
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
  );
}
