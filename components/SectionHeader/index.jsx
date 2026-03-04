import * as React from "react";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import InFocusLogo from "./infocus.png";
import SponsoredTitle from "./sponsoredTitle.svg";

const SectionHeader = ({ category, subcategories, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  // Defaults to true if no subcategories are passed (e.g. the games page)
  const isSubcategoryPage = subcategories != undefined
    ? subcategories.some((sub) => currentPath.includes(sub.link))
    : true;

  const isNewsOrSports = category === "News" || category === "Sports";

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
          {!isSubcategoryPage && subcategories.length > 0 && isNewsOrSports && (
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
              ${renderedSubcategories.length > 8
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
