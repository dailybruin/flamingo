import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import dayjs from "dayjs";
import * as globals from "../../globals";
import Image from "next/image";
import {
  inlineBlockVerticalMiddle,
  whiteSpaceNowrap,
  outlineNone,
  menuLinkStyles,
  absoluteTopRight,
  ACTION_HEIGHT,
  ACTION_WIDTH,
  SEARCH_EXPANDED_WIDTH,
  Z_INDEX_SEARCH_INPUT,
  Z_INDEX_SEARCH_ICON,
  Z_INDEX_SEARCH_SUBMIT
} from "./Styles";

// DateDisplay Component
export const DateDisplay = () => {
  const date = dayjs();
  const today = date.format("dddd, MMM D, YYYY");

  return (
    <div
      css={css`
        display: table-cell;
        text-align: left;
        ${whiteSpaceNowrap};
        vertical-align: middle;
        @media (max-width: 900px) {
          display: none;
        }
      `}
    >
      <h2
        css={css`
          ${whiteSpaceNowrap};
          ${inlineBlockVerticalMiddle};
          margin: 0;
          font-family: ${globals.headlineFont};
          font-style: normal;
          font-weight: 550;
          font-size: 16px;
        `}
      >
        {today}
      </h2>
    </div>
  );
};

// SocialMediaLinks Component
export const SocialMediaLinks = () => {
  const socialLinks = [
    { href: "https://www.facebook.com/dailybruin", icon: require("../assets/facebook.svg") },
    { href: "https://www.twitter.com/dailybruin", icon: require("../assets/twitter.svg") },
    { href: "https://www.instagram.com/dailybruin", icon: require("../assets/instagram.svg") },
    { href: "http://eepurl.com/cFEiZX", icon: require("../assets/mail.svg") },
    { href: "https://www.youtube.com/user/ucladailybruin", icon: require("../assets/youtube.png") }
  ];

  return (
    <div
      id="social-media"
      css={css`
        display: inline-block;

        & a {
          margin: 0 6px;
          ${inlineBlockVerticalMiddle};
        }
        & a img {
          display: block;
          height: 14px;
        }

        & a:hover img {
          fill: ${globals.DBblue};
        }
      `}
    >
      {socialLinks.map((link, index) => (
        <a key={index} href={link.href} target="_blank" rel="noopener">
          <Image
            src={(link && link.icon) || link}
            alt="Facebook"
            width={14}
            height={14}
            layout="fixed"
          />
        </a>
      ))}
    </div>
  );
};

// TopNavLinks Component
export const TopNavLinks = () => (
  <div
    css={css`
      ${inlineBlockVerticalMiddle};
      margin-top: 2px;
      margin-right: 10px;

      & > a {
        padding: 0 4px;
        ${menuLinkStyles};
        line-height: 34px;
        font-size: 14px;
        ${inlineBlockVerticalMiddle};
        height: ${ACTION_HEIGHT};
      }

      @media (max-width: 650px) {
        display: none;
      }
    `}
  >
    <SocialMediaLinks />
    <a href="/advertise">Advertise</a>
    <a href="https://uclastudentmedia.com/donate/">Donate</a>
    <a href="/submit">Submit</a>
  </div>
);

// SearchBar Component
export const SearchBar = ({ searchBarRef, onExpandSearch }) => {
  const minisearchIcon = require("../assets/minisearch.svg");
  const searchIcon = require("../assets/search.svg");

  return (
    <div
      css={css`
        ${inlineBlockVerticalMiddle};
        position: relative;
        transition: all 500ms;
        height: ${ACTION_HEIGHT};
        width: ${ACTION_WIDTH};
      `}
    >
      <form method="get" action="/search">
        <input
          ref={searchBarRef}
          id="SearchBar"
          type="text"
          name="q"
          placeholder="search"
          pattern="\S+.*"
          css={css`
            ${absoluteTopRight(Z_INDEX_SEARCH_INPUT)};
            height: ${ACTION_HEIGHT};
            background-color: ${globals.black};
            color: ${globals.black};
            resize: none;
            transition: width 500ms cubic-bezier(0.25, 0.8, 0.25, 1),
              color 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
            width: 0;
            padding: 0;
            border: none;
            ${outlineNone};
            line-height: ${ACTION_HEIGHT};
            font-size: 18px;
            font-family: ${globals.menuFont};
            font-weight: bold;
            &:focus {
              width: ${SEARCH_EXPANDED_WIDTH};
              padding: 0 ${ACTION_WIDTH} 0 6px;
              color: ${globals.white};
            }
            &:focus + button {
              display: block;
            }
            &:focus + button + #Masthead__SearchIconBox {
              background-color: #000;
            }
          `}
        />

        <button
          type="submit"
          css={css`
            ${absoluteTopRight(Z_INDEX_SEARCH_SUBMIT)};
            width: ${ACTION_WIDTH};
            height: ${ACTION_HEIGHT};
            border: none;
            padding: 6px;
            cursor: pointer;
            color: ${globals.white};
            ${outlineNone};
            display: none;
            background-color: ${globals.black};
            background-image: url(${minisearchIcon});
            background-repeat: no-repeat;
            background-size: 24px;
            background-position: 6px;
            &:hover {
              display: block;
            }
            /* This allows the input to stay open when hovering the button */
            &:hover ~ input {
              width: ${SEARCH_EXPANDED_WIDTH};
              padding: 0 ${ACTION_WIDTH} 0 6px;
              color: ${globals.white};
            }
            &:focus {
              display: block;
            }
          `}
        >
          {/* Placed the image INSIDE the button */}
          <Image
            src={(minisearchIcon && minisearchIcon.src) || minisearchIcon}
            alt="Search"
            width={24}
            height={24}
            layout="fixed"
          />
        </button>

        {/* 3. SEARCH TRIGGER ICON (The magnifying glass) */}
        <div
          css={css`
            ${absoluteTopRight(Z_INDEX_SEARCH_ICON)};
            border: none;
            padding: 0;
            cursor: pointer;
            background-color: transparent;
            ${outlineNone};
          `}
          onClick={onExpandSearch}
        >
          <div
            id="Masthead__SearchIconBox"
            css={css`
              ${inlineBlockVerticalMiddle};
              transition: all 200ms;
              transition-delay: 100ms;
              width: ${ACTION_WIDTH};
              height: ${ACTION_HEIGHT};
              /* Flexbox helps center the Next Image perfectly */
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Image
              src={(searchIcon && searchIcon.src) || searchIcon}
              alt="Expand Search"
              width={36}
              height={36}
              layout="fixed"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

// CategoryLinks Component
export const CategoryLinks = ({ categories }) => {
  if (!categories) return null;

  return (
    <div
      css={css`
        padding: 0 12px;
        display: table;
        width: 100%;
        box-sizing: border-box;
      `}
    >
      {categories.map((category, index) => (
        <a
          key={index}
          href={category.as}
          css={css`
            display: table-cell;
            text-align: center;
            padding: 8px 4px;
            ${menuLinkStyles};
            font-size: 13px;
            text-decoration: none;
            ${whiteSpaceNowrap};
            &.isSticky {
              background-color: red;
            }
          `}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
};
