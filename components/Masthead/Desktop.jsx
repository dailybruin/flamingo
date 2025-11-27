import * as React from "react";
/** @jsxImportSource @emotion/react */
import { Global, css, jsx } from "@emotion/core";
import dayjs from "dayjs";
import Head from "next/head";

import * as globals from "../globals";

import logo from "./dailybruin.svg";
import menuIcon from "./menu.svg";
import searchIcon from "./search.svg";
import minisearchIcon from "./minisearch.svg";
import facebookIcon from "./facebook.svg";
import twitterIcon from "./twitter.svg";
import instagramIcon from "./instagram.svg";
import mailIcon from "./mail.svg";
import youtubeIcon from "./youtube.png";
import Image from "next/image";

let expandedHeight = "106px";
let collapsedHeight = "60px";

export default class Desktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: true,
      searchExpanded: false
    };
    this.MastheadCard = React.createRef();
    this.SearchBar = React.createRef();
    this.Logo = React.createRef();

    this.isScrolled = this.isScrolled.bind(this);
    this.expandMenu = this.expandMenu.bind(this);
    this.collapseMenu = this.collapseMenu.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.isScrolled);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.isScrolled);
  }

  isScrolled() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.collapseMenu();
    } else if (
      (document.body.scrollTop <= 0 ||
        document.documentElement.scrollTop <= 0) &&
      !this.state.menuExpanded
    ) {
      this.expandMenu();
    }
  }

  expandMenu() {
    const block = this.MastheadCard.current;
    const logo = this.Logo.current;
    if (!this.state.menuExpanded) {
      block.style.height = expandedHeight;
      logo.style.height = "60px";
      this.state.menuExpanded = true;
    }
  }

  collapseMenu() {
    const block = this.MastheadCard.current;
    const logo = this.Logo.current;
    if (this.state.menuExpanded) {
      block.style.height = collapsedHeight;
      logo.style.height = "48px";

      this.state.menuExpanded = false;
    }
  }

  expandSearch() {
    this.SearchBar.current.focus();
  }

  render() {
    let date = dayjs();
    let today = date.format("dddd, MMM D, YYYY");
    let renderedCategories = [];
    if (this.props.categories != null) {
      for (let i in this.props.categories) {
        renderedCategories.push(
          <a
            key={i}
            href={this.props.categories[i].as}
            css={css`
              display: table-cell;
              text-align: center;
              padding: 8px 4px;
              font-family: ${globals.menuFont};
              font-size: 13px;
              font-weight: bold;
              text-decoration: none;
              text-transform: uppercase;
              color: #000;
              white-space: nowrap;
              &:hover {
                text-decoration: underline;
              }

              &.isSticky {
                background-color: red;
              }
            `}
          >
            {this.props.categories[i].name}
          </a>
        );
      }
    }
    return (
      <React.Fragment>
      <div
        id="masthead" 
        ref={this.MastheadCard}
        css={css`
          background: #ffffff;
          box-shadow: ${globals.cardShadow};
          overflow: hidden;
          height: ${expandedHeight};
          transition: height 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
          position: sticky;
          top: 0;
          z-index: 10;
          margin: 6px;
        `}
      >
        <div
          css={css`
            padding: 6px 18px;
            display: table;
            table-layout: fixed;
            width: 100%;
            vertical-align: middle;
          `}
        >
          <div
            css={css`
              display: table-cell;
              text-align: left;
              white-space: nowrap;
              vertical-align: middle;
              @media (max-width: 900px) {
                display: none;
              }
            `}
          >
            <h2
              css={css`
                white-space: nowrap;
                display: inline-block;
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
          <div
            css={css`
              display: table-cell;
              text-align: center;
              white-space: nowrap;
            `}
          >
            <a
              ref={this.Logo}
              href="/"
              css={css`
                display: inline-block;
                vertical-align: middle;
                height: 60px;
                padding: 8px 0;
                transition: height 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
                @media (max-width: 600px) {
                  height: 24px;
                }
              `}
            >
                <Image
                  src={logo}
                  alt="Logo"
                  style={{
                    display: "inline-block",
                    height: "100%",
                    width: "auto"
                  }}
                />
            </a>
          </div>
          <div
            css={css`
              display: table-cell;
              text-align: right;
              vertical-align: middle;
              white-space: nowrap;
            `}
          >
            <div
              css={css`
                display: inline-block;
                position: relative;
                transition: all 500ms;
                height: 36px;
              `}
            >
              <div
                css={css`
                  display: inline-block;
                  vertical-align: middle;
                  margin-top: 2px;
                  margin-right: 10px;

                  & > a {
                    padding: 0 4px;
                    font-family: ${globals.menuFont};
                    font-weight: bold;
                    text-transform: uppercase;
                    line-height: 34px;
                    font-size: 14px;
                    color: #000;
                    display: inline-block;
                    vertical-align: middle;
                    height: 36px;
                  }

                  & > a:hover {
                    text-decoration: underline;
                  }

                  @media (max-width: 650px) {
                    display: none;
                  }
                `}
              >
                <div
                  id="social-media"
                  css={css`
                    display: inline-block;

                    & a {
                      margin: 0 6px;
                      display: inline-block;
                      vertical-align: middle;
                    }
                    & a img {
                      display: block;
                      height: 14px;
                    }

                    /* Universal hover effect */
                    & a:hover {
                      opacity: 0.7;
                    }
                  `}
                >
                  <a
                    href="https://www.facebook.com/dailybruin"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image
                      src={(facebookIcon && facebookIcon.src) || facebookIcon}
                      alt="Facebook"
                      width={14}
                      height={14}
                      layout="fixed"
                    />
                  </a>
                  <a
                    href="https://www.twitter.com/dailybruin"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image
                      src={(twitterIcon && twitterIcon.src) || twitterIcon}
                      alt="Twitter"
                      width={14}
                      height={14}
                      layout="fixed"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/dailybruin"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image
                      src={(instagramIcon && instagramIcon.src) || instagramIcon}
                      alt="Instagram"
                      width={14}
                      height={14}
                      layout="fixed"
                    />
                  </a>
                  <a
                    href="http://eepurl.com/cFEiZX"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image
                      src={(mailIcon && mailIcon.src) || mailIcon}
                      alt="Newsletter"
                      width={14}
                      height={14}
                      layout="fixed"
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/user/ucladailybruin"
                    target="_blank"
                    rel="noopener"
                  >
                    <Image
                      src={youtubeIcon}
                      alt="YouTube"
                      width={14}
                      height={14}
                      layout="fixed"
                    />
                  </a>
                </div>
                <a href="/advertise">Advertise</a>
                <a href="https://uclastudentmedia.com/donate/">
                  Donate
                </a>
                <a href="/submit">Submit</a>
              </div>
              <div
                css={css`
                  display: inline-block;
                  position: relative;
                  transition: all 500ms;
                  height: 36px;
                  width: 36px;
                  vertical-align: middle;
                `}
              >
                <form method="get" action="/search">
                  <input
                    ref={this.SearchBar}
                    id="SearchBar"
                    type="text"
                    name="q"
                    placeholder="search"
                    pattern="\S+.*"
                    css={css`
                      position: absolute;
                      right: 0;
                      z-index: 10;
                      height: 36px;
                      background-color: #000;
                      color: #000;
                      resize: none;
                      transition: width 500ms cubic-bezier(0.25, 0.8, 0.25, 1),
                        color 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
                      width: 0;
                      padding: 0;
                      border: none;
                      outline: none;
                      line-height: 36px;
                      font-size: 18px;
                      font-family: ${globals.menuFont};
                      font-weight: bold;
                      &:focus {
                        width: 250px;
                        padding: 0 36px 0 6px;
                        color: #fff;
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
                      position: absolute;
                      z-index: 12;
                      width: 36px;
                      height: 36px;
                      right: 0;
                      top: 0;
                      border: none;
                      padding: 6px;
                      cursor: pointer;
                      color: #fff;
                      outline: none;
                      display: none;
                      background-color: #000;
                      
                      &:hover {
                        display: block;
                      }
                      /* This allows the input to stay open when hovering the button */
                      &:hover ~ input {
                        width: 250px;
                        padding: 0 36px 0 6px;
                        color: #fff;
                      }
                      &:focus {
                        outline: none;
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
                      position: absolute;
                      z-index: 11;
                      right: 0;
                      top: 0;
                      border: none;
                      padding: 0;
                      cursor: pointer;
                      background-color: transparent;
                      outline: none;
                      &:focus {
                        outline: none;
                      }
                    `}
                    onClick={this.expandSearch}
                  >
                    <div 
                      id="Masthead__SearchIconBox"
                      css={css`
                        display: inline-block;
                        vertical-align: middle;
                        transition: all 200ms;
                        transition-delay: 100ms;
                        width: 36px;
                        height: 36px;
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
            </div>
          </div>
        </div>
        <div
          css={css`
            padding: 0 12px;
          `}
        >
          <div
            css={css`
              width: 100%;
              height: 1px;
              background-color: #000;
            `}
          ></div>
        </div>
        <div
          css={css`
            background-color: #fff;
            overflow-x: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          <div
            css={css`
              padding: 0 12px;
              display: table;
              width: 100%;
              box-sizing: border-box;
            `}
          >
            {renderedCategories}
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}
