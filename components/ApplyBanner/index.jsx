import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

/*
 * Recruitment bar that sits between the top ad and the masthead.
 *
 * Everything an editor would want to change lives in the four constants below.
 * DEADLINE is the real thing that makes this safe to ship: once it passes the
 * component renders nothing, so a forgotten banner can't outlive the
 * application window. It is written as an explicit -07:00 (PDT) offset so the
 * cutoff means noon in Los Angeles no matter where the pod or the reader is.
 */
const HEADLINE = "Apply to the Daily Bruin!";
const DETAIL = "Applications due Oct. 5 at 12 p.m.";
const APPLY_URL = "https://apply.uclastudentmedia.com/publications/daily-bruin";
const DEADLINE = new Date("2026-10-05T12:00:00-07:00");

export default function ApplyBanner() {
  if (Date.now() > DEADLINE.getTime()) {
    return null;
  }

  return (
    <a
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      css={css`
        display: block;
        width: 100%;
        background-color: ${globals.DBblue};
        box-shadow: ${globals.cardShadow};
        padding: 10px 16px;
        text-align: center;
        text-decoration: none;
        color: ${globals.white};
        font-family: ${globals.menuFont};
        line-height: 1.3;
        transition: background-color 0.15s ease-in-out;

        &:hover,
        &:focus {
          background-color: #006ba3;
          color: ${globals.white};
          text-decoration: none;
        }

        &:hover .apply-banner-headline,
        &:focus .apply-banner-headline {
          text-decoration: underline;
        }
      `}
    >
      <span
        className="apply-banner-headline"
        css={css`
          font-weight: 700;
          font-size: 17px;
          letter-spacing: 0.02em;

          ${globals.phone} {
            font-size: 16px;
          }
        `}
      >
        {HEADLINE}
      </span>{" "}
      <span
        css={css`
          font-weight: 400;
          font-size: 16px;
          white-space: nowrap;

          ${globals.phone} {
            display: block;
            font-size: 14px;
            white-space: normal;
          }
        `}
      >
        {DETAIL}
      </span>
    </a>
  );
}
