import * as React from "react";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import InFocusLogo from "./infocus.png";
import SponsoredTitle from "./sponsoredTitle.svg";

/*
 * PRIME's wordmark: Bungee Outline in DB blue, with no fill. DB blue so the
 * section reads as part of the Daily Bruin at a glance.
 *
 * A single layer, so there is no stacking to keep in register and no
 * white-on-white failure if Google Fonts is blocked -- the fallback is simply
 * DB blue sans-serif.
 *
 * Runs larger than a solid wordmark would. Bungee Outline is drawn in hairline
 * strokes, and below roughly 100px it thins out and starts to close up; the
 * size is what keeps the outline legible, not a claim that PRIME outranks the
 * other sections.
 *
 * Framed in four corner marks, after the trim marks a printer puts at the
 * corners of a page -- PRIME ran in print for years, and the archive this
 * section leads to is that print run. Solid rules against hairline letterforms,
 * so the contrast is weight rather than a second colour.
 *
 * Everything is sized in em, so the marks track the wordmark at every
 * breakpoint from the one font-size. They are drawn in CSS rather than in the
 * font, so they still appear if Google Fonts is blocked.
 */
const CORNER_MARK = `
  content: "";
  position: absolute;
  width: 0.24em;
  height: 0.24em;
  border: 0 solid ${globals.DBblue};
  pointer-events: none;
`;
const MARK_WEIGHT = "0.04em";

const PrimeWordmark = () => (
  <div
    css={css`
      font-family: "Bungee Outline", ${globals.menuFont};
      font-weight: 400;
      line-height: 1;
      letter-spacing: 0.02em;
      color: ${globals.DBblue};
      padding: 18px 0 10px;
      font-size: 104px;
      @media (max-width: 900px) {
        font-size: 74px;
        padding: 14px 0 8px;
      }
      @media (max-width: 600px) {
        font-size: 46px;
        padding: 10px 0 6px;
      }
    `}
  >
    {/* Two elements because a single one only has two pseudo-elements and the
        frame needs four corners. The inner span is static, so its marks
        position against this one. Vertical padding stays small: Bungee's caps
        already sit 0.14em inside the line box, so the space is mostly there. */}
    <span
      css={css`
        position: relative;
        display: inline-block;
        padding: 0.04em 0.2em;

        &::before {
          ${CORNER_MARK}
          top: 0;
          left: 0;
          border-top-width: ${MARK_WEIGHT};
          border-left-width: ${MARK_WEIGHT};
        }
        &::after {
          ${CORNER_MARK}
          bottom: 0;
          right: 0;
          border-bottom-width: ${MARK_WEIGHT};
          border-right-width: ${MARK_WEIGHT};
        }
      `}
    >
      <span
        css={css`
          &::before {
            ${CORNER_MARK}
            top: 0;
            right: 0;
            border-top-width: ${MARK_WEIGHT};
            border-right-width: ${MARK_WEIGHT};
          }
          &::after {
            ${CORNER_MARK}
            bottom: 0;
            left: 0;
            border-bottom-width: ${MARK_WEIGHT};
            border-left-width: ${MARK_WEIGHT};
          }
        `}
      >
        PRIME
      </span>
    </span>
  </div>
);

const SectionHeader = ({ category, subcategories, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  // Defaults to true if no subcategories are passed (e.g. the games page)
  const isSubcategoryPage = subcategories != undefined
    ? subcategories.some((sub) => currentPath.includes(sub.link))
    : true;

  const isNewsOrSports = category === "News" || category === "Sports";

  /* Matched loosely on purpose: the name comes from WordPress, where an editor
   * can retype it as "Prime" or leave a stray space, and a strict compare would
   * silently drop us back to the default title with no clue why. */
  const isPrime =
    typeof category === "string" && category.trim().toUpperCase() === "PRIME";

  /*
   * PRIME's blurb is now a single short line, so it needs none of the prose
   * treatment the old mission-statement paragraph did -- the default
   * description styling below handles it exactly like every other section's.
   * The one adjustment is a little more air under the wordmark, which runs much
   * taller than a normal section title.
   *
   * Empty for every other category, so nothing else moves.
   */
  const primeDescriptionCSS = isPrime ? `padding-top: 4px;` : "";

  const renderTitle = () => {
    if (category === "Daily Bruin: In Focus") {
      return (
        <img
          src={(InFocusLogo && InFocusLogo.src) || InFocusLogo}
          css={css`
            display: inline-block;
            height: 100%;
            max-height: 64px;
            margin: 0px;
            padding: 0px;
          `}
        />
      );
    } else if (isPrime) {
      /* Bungee Outline in DB blue. See PrimeWordmark above. */
      return <PrimeWordmark />;
    } else if (category === "Sponsored") {
      return (
        <img
          src={(SponsoredTitle && SponsoredTitle.src) || SponsoredTitle}
          css={css`
            display: inline-block;
            height: 100%;
            max-height: 64px;
            margin: 0px;
            padding: 0px;
          `}
        />
      );
    } else {
      return <div dangerouslySetInnerHTML={{ __html: category }} />;
    }
  };

  const renderedSubcategories = subcategories?.map((subcategory) => (
    <a
      key={subcategory.link}
      href={subcategory.link}
      dangerouslySetInnerHTML={{ __html: subcategory.name }}
      css={css`
        font-family: ${globals.menuFont};
        text-transform: uppercase;
        font-weight: bold;
        font-size: 12px;
        padding: 1px 5px;
        color: black;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      `}
    />
  ));

  const showSubcategories =
    renderedSubcategories?.length > 0 &&
    ((!isSubcategoryPage && !isNewsOrSports) || (isNewsOrSports && isOpen));

  return (
    <>
      <div
        css={css`
          box-shadow: ${globals.cardShadow};
          background-color: white;
          display: block;
          padding: 0 10px 10px;
        `}
      >
        {/* Header with Title & Hamburger Icon */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            text-align: center;
            list-style: none;
            color: black;
            font-family: ${globals.menuFont};
            font-weight: bold;
            font-size: 40px;
            text-transform: uppercase;
            padding-top: 8px;
          `}
        >
          {/* Show Hamburger Toggle ONLY for News and Sports */}
          {!isSubcategoryPage && subcategories?.length > 0 && isNewsOrSports && (
            <div
              css={css`
                position: absolute;
                right: 0;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
              `}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  width: 25px;
                  height: 18px;
                `}
              >
                <div css={css`width: 100%; height: 3px; background-color: black;`} />
                <div css={css`width: 100%; height: 3px; background-color: black;`} />
                <div css={css`width: 100%; height: 3px; background-color: black;`} />
              </div>
            </div>
          )}
          {renderTitle()}
        </div>

        {/* Description Text */}
        {description != undefined && (
          <>
            <div
              css={css`
                text-align: center;
                list-style: none;
                color: black;
                font-family: ${globals.menuFont};
                font-size: 16px;
                padding-bottom: 8px;
                margin-left: 32px;
                margin-right: 32px;
                ${primeDescriptionCSS}
                @media (max-width: 600px) {
                  display: none;
                }
              `}
              dangerouslySetInnerHTML={{ __html: description.desktop }}
            />
            <div
              css={css`
                text-align: center;
                list-style: none;
                color: black;
                font-family: ${globals.menuFont};
                font-size: 16px;
                padding-bottom: 8px;
                margin-left: 32px;
                margin-right: 32px;
                ${primeDescriptionCSS}
                @media (min-width: 601px) {
                  display: none;
                }
              `}
              dangerouslySetInnerHTML={{ __html: description.mobile }}
            />
          </>
        )}

        {/* Decorative Line */}
        <div
          css={css`
            width: 100%;
            background-color: black;
            height: 1px;
            margin-bottom: 5px;
          `}
        />

        {/* Subcategories */}
        {showSubcategories && (
          <div
            css={css`
              ${(renderedSubcategories?.length || 0) > 8
                ? `
                margin: auto;
                text-align: left;
                column-count: 6;
                column-width: 150px;
                a {
                  display: block;
                  margin-left: 40px;
                }`
                : `
                text-align: center;
                a {
                  display: inline-block;
                }
                `}
              @media (max-width: 600px) {
                text-align: center;
                a {
                  display: inline-block;
                  margin: 4px 8px;
                  white-space: normal;
                }
              }
            `}
          >
            {renderedSubcategories}
          </div>
        )}
      </div>

      {/* Sponsored Disclaimer */}
      {category === "Sponsored" && (
        <div
          css={css`
            box-shadow: ${globals.cardShadow};
            background-color: white;
            display: block;
            padding: 0 10px 10px;
          `}
        >
          <div
            css={css`
              text-align: center;
              list-style: none;
              color: black;
              font-family: ${globals.menuFont};
              font-size: 16px;
              padding-bottom: 8px;
              margin-left: 32px;
              margin-right: 32px;
            `}
          >
            <i>This is sponsored content independent of the Daily Bruin editorial staff.</i>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionHeader;
