import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import { PRIME_ARCHIVE_ROOT } from "../../lib/primeArchive";

/*
 * The way into the frozen PRIME archive.
 *
 * Inverted so it reads as navigation rather than as another story competing with
 * the grid around it. It points at dailybruin.com/prime -- never the old
 * prime.dailybruin.com, which redirects here now.
 */
export default function PrimeArchiveCard({ compact = false }) {
  return (
    <a
      href={PRIME_ARCHIVE_ROOT}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 12px;
        background-color: ${globals.black};
        box-shadow: ${globals.cardShadow};
        padding: ${compact ? "18px 16px" : "22px 20px"};
        color: ${globals.white};
        text-decoration: none;

        &:hover .prime-archive-cta {
          text-decoration: underline;
        }
      `}
    >
      <div
        css={css`
          font-family: "Bungee Outline", ${globals.menuFont};
          font-size: ${compact ? "32px" : "40px"};
          line-height: 1;
          color: ${globals.white};
        `}
      >
        PRIME
      </div>

      <h3
        css={css`
          font-family: ${globals.headlineFont};
          font-size: ${compact ? "19px" : "21px"};
          line-height: 1.2;
          margin: 0;
        `}
      >
        Eight years of PRIME, in one place
      </h3>

      <p
        css={css`
          font-family: ${globals.bodyFont};
          font-weight: 300;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.78);
          margin: 0;
        `}
      >
        PRIME stories published before the 2026-27 academic year are
        accessible in our archive.
      </p>

      <span
        className="prime-archive-cta"
        css={css`
          font-family: ${globals.menuFont};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          border-top: 1px solid rgba(255, 255, 255, 0.28);
          padding-top: 11px;
        `}
      >
        Enter the archive →
      </span>
    </a>
  );
}
