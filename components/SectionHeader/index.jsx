import * as React from "react";
import Link from "next/link";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import InFocusLogo from "./infocus.png";

export default class SectionHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, // Track whether subcategories are shown
    };
    this.toggleSubcategories = this.toggleSubcategories.bind(this);
  }

  toggleSubcategories() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen, // Toggle dropdown
    }));
  }

  render() {
    // Get the current page path
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

    // Check if the current page is a subcategory by comparing with subcategory links

    // this line sets the default of isSubcategory to true if this prop doesn't exist
    // this is relevant for the games page (where no subcategories are passed)
    let isSubcategoryPage = true;
    if (this.props.subcategories != undefined) {
      isSubcategoryPage = this.props.subcategories.some(sub => currentPath.includes(sub.link));
    }

    // Check if this is a category that should show the hamburger toggle
    const isNewsOrSports = this.props.category === "News" || this.props.category === "Sports";

    let renderedSubcategories = [];
    const renderTitle = () => {
      if (this.props.category === "Daily Bruin: In Focus") {
        return (
          <img
            src={InFocusLogo}
            css={css`
              display: inline-block;
              height: 100%;
              max-height: 64px;
              margin: 0px;
              padding: 0px;
            `}
          ></img>
        );
      } else {
        return (
          <div dangerouslySetInnerHTML={{ __html: this.props.category }}></div>
        );
      }
    };

    if (this.props.subcategories != undefined) {
      for (let i = 0; i < this.props.subcategories.length; i++) {
        renderedSubcategories.push(
          <a
            key={this.props.subcategories[i].link}
            href={this.props.subcategories[i].link}
            dangerouslySetInnerHTML={{
              __html: this.props.subcategories[i].name,
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
        );
      }
    }

    return (
      <div
        css={css`
          box-shadow: ${globals.cardShadow};
          background-color: white;
          display: block;
          padding: 0 10px 10px;
        `}
      >
        {/* Header with Title & Hamburger Icon (Hamburger aligned to the right) */}
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
          {!isSubcategoryPage && this.props.subcategories.length > 0 && isNewsOrSports && (
            <div
              css={css`
                position: absolute;
                right: 0;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 25px;
                height: 18px;
              `}
              onClick={this.toggleSubcategories}
            >
              <div
                css={css`
                  width: 100%;
                  height: 3px;
                  background-color: black;
                `}
              />
              <div
                css={css`
                  width: 100%;
                  height: 3px;
                  background-color: black;
                `}
              />
              <div
                css={css`
                  width: 100%;
                  height: 3px;
                  background-color: black;
                `}
              />
            </div>
          )}
          {renderTitle()}
        </div>

        {this.props.description != undefined && (
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
              dangerouslySetInnerHTML={{ __html: this.props.description.desktop }}
            >
            </div>
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
              dangerouslySetInnerHTML={{ __html: this.props.description.mobile }}
            >
            </div>
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

        {/* Show Subcategories based on category type */}
        {(!isSubcategoryPage && !isNewsOrSports) || (isNewsOrSports && this.state.isOpen) ? (
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
                display: none;
              }
            `}
          >
            {renderedSubcategories}
          </div>
        ) : null}
      </div>
    );
  }
}
