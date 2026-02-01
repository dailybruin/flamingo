import * as React from "react";
/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/core";
import Head from "next/head";
import Image from "next/image";
import * as globals from "../globals";
import dayjs from "dayjs";

import logo from "./dailybruin.svg";
import menuIcon from "./menu.svg";
import searchIcon from "./search.svg";
import minisearchIcon from "./minisearch.svg";

import {
  searchInputStyles,
  searchSubmitButtonStyles,
  searchIconBoxStyles,
  searchContainerStyles,
  categoryLinkStyles,
  socialColumnStyles,
  socialLinkStyles
} from "./MobileStyles";

// MobileMenuButton Component
export const MobileMenuButton = ({ onClick, isExpanded }) => (
  <button
    css={css`
      display: table-cell;
      vertical-align: middle;
      border: none;
      padding: 4px;
      cursor: pointer;
      background-color: transparent;
      outline: none;
      height: 36px;
      width: 36px;
      transition: transform 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
    `}
    style={{
      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)"
    }}
    onClick={onClick}
    aria-label={isExpanded ? "Close menu" : "Open menu"}
  >
    <img
      src={(menuIcon && menuIcon.src) || menuIcon}
      alt=""
      css={css`
        height: 100%;
        background-color: white;
      `}
    />
  </button>
);

// MobileLogo Component
export const MobileLogo = () => {
  const date = dayjs();

  return (
    <a
      href="/"
      css={css`
        display: inline-block;
        vertical-align: middle;
        height: 32px;
        padding: 4px 0;
        position: relative;
        width: 180px;
      `}
    >
      <Image
        src={(logo && logo.src) || logo}
        alt="Daily Bruin"
        layout="fill"
        objectFit="contain"
      />
      {date.date() === 1 && date.month() === 3 && (
        <>
          <Head>
            <link
              href="https://wp.dailybruin.com/wp-content/themes/caeruleum/css/dbcomic.ttf"
              rel="stylesheet"
            />
          </Head>
          <Global
            styles={css`
              * {
                font-family: "Comic Sans MS", sans-serif !important;
              }
            `}
          />
        </>
      )}
    </a>
  );
};

// MobileSearchBar Component
export const MobileSearchBar = ({ searchBarRef, onExpandSearch }) => (
  <div css={searchContainerStyles}>
    <form method="get" action="/search">
      <input
        ref={searchBarRef}
        id="SearchBar"
        type="text"
        name="q"
        placeholder="search"
        pattern="\S+.*"
        css={searchInputStyles}
      />
      <button
        type="submit"
        css={css`
          ${searchSubmitButtonStyles}
          background-image: url(${(minisearchIcon && minisearchIcon.src) || minisearchIcon});
        `}
        aria-label="Submit search"
      />
      <div
        css={searchIconBoxStyles}
        onClick={onExpandSearch}
        onKeyDown={(e) => e.key === "Enter" && onExpandSearch()}
        role="button"
        tabIndex={0}
        aria-label="Expand search"
      >
        <div
          id="Masthead__SearchIconBox"
          css={css`
            display: inline-block;
            vertical-align: middle;
            transition: all 200ms;
            transition-delay: 100ms;
            height: 100%;
          `}
        >
          <img
            src={(searchIcon && searchIcon.src) || searchIcon}
            alt=""
            css={css`
              height: 100%;
            `}
          />
        </div>
      </div>
    </form>
  </div>
);

// MobileCategoryLinks Component
export const MobileCategoryLinks = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <>
      {categories.map((category, index) => (
        <a
          key={index}
          href={category.as}
          css={categoryLinkStyles}
        >
          {category.name}
        </a>
      ))}
    </>
  );
};

// MobileSocialLinks Component
export const MobileSocialLinks = () => (
  <div css={socialColumnStyles}>
    <a
      href="https://www.facebook.com/dailybruin"
      target="_blank"
      rel="noopener noreferrer"
      css={socialLinkStyles}
    >
      Facebook
    </a>
    <a
      href="https://twitter.com/dailybruin"
      target="_blank"
      rel="noopener noreferrer"
      css={socialLinkStyles}
    >
      Twitter
    </a>
    <a
      href="https://www.instagram.com/dailybruin"
      target="_blank"
      rel="noopener noreferrer"
      css={socialLinkStyles}
    >
      Instagram
    </a>
    <a
      href="http://eepurl.com/cFEiZX"
      target="_blank"
      rel="noopener noreferrer"
      css={socialLinkStyles}
    >
      Newsletter
    </a>
    <a href="/advertise" css={socialLinkStyles}>
      Advertise
    </a>
    <a
      href="https://uclastudentmedia.com/donate/"
      target="_blank"
      rel="noopener noreferrer"
      css={socialLinkStyles}
    >
      Donate
    </a>
    <a
      href="/submit"
      target="_blank"
      rel="noopener noreferrer"
      css={socialLinkStyles}
    >
      Submit
    </a>
  </div>
);
