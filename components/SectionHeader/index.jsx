import * as React from "react";
// Removed useState as it is no longer needed
import Link from "next/link";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import InFocusLogo from "./infocus.png";
import SponsoredTitle from "./sponsoredTitle.svg";

const SectionHeader = (props) => {
  // 1. LOGIC: Get current path to determine if we are on a subcategory page
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  let isSubcategoryPage = true;
  // If subcategories exist, check if the current URL matches one of them
  if (props.subcategories != undefined) {
    isSubcategoryPage = props.subcategories.some((sub) =>
      currentPath.includes(sub.link)
    );
  }

  // 2. HELPER: Render the correct title or logo
  const renderTitle = () => {
    if (props.category === "Daily Bruin: In Focus") {
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
          alt="In Focus Logo"
        />
      );
    } else if (props.category === "Sponsored") {
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
          alt="Sponsored Logo"
        />
      );
    } else {
      return (
        <div dangerouslySetInnerHTML={{ __html: props.category }}></div>
      );
    }
  };

  // 3. PREPARE SUBCATEGORIES LIST
  const renderedSubcategories = props.subcategories?.map((subcategory) => (
    <a
      key={subcategory.link}
      href={subcategory.link}
      dangerouslySetInnerHTML={{
        __html: subcategory.name,
      }}
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
        {/* Header with Title (Hamburger removed) */}
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
          {renderTitle()}
        </div>

        {/* Description Text */}
        {props.description != undefined && (
          <>
            <div // desktop description
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
              dangerouslySetInnerHTML={{ __html: props.description.desktop }}
            ></div>
            <div // mobile description
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
              dangerouslySetInnerHTML={{ __html: props.description.mobile }}
            ></div>
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
        ></div>

        {/* Show Subcategories (Simplified Condition) */}
        {/* Only show if we are NOT on a subcategory page and the list exists */}
        {!isSubcategoryPage && renderedSubcategories && renderedSubcategories.length > 0 ? (
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
        ) : null}
      </div>

      {/* Sponsored Disclaimer */}
      {props.category === "Sponsored" && (
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
            <i>
              This is sponsored content independent of the Daily Bruin editorial
              staff.
            </i>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionHeader;