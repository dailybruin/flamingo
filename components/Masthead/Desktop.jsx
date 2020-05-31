import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Link from "next/link";
import * as moment from "moment";

import * as globals from "../globals";

import logo from "./dailybruin.svg";
import menuIcon from "./menu.svg";
import searchIcon from "./search.svg";
import minisearchIcon from "./minisearch.svg";

let expandedHeight = "110px";
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
    let today = moment().format("dddd, MMMM Do YYYY");
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
              font-size: 15px;
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
      <div
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
              <img
                src={logo}
                css={css`
                  display: inline-block;
                  height: 100%;
                `}
              ></img>
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

                  & a {
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

                  & a:hover {
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
                  `}
                >
                  <a
                    href="https://www.facebook.com/dailybruin"
                    title="Facebook"
                    css={css`
                      color: ${globals.DBblue};
                    `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="-18 -18 42 42"
                      css={css`
                        &:hover {
                          fill: ${globals.DBblue};
                        }
                      `}
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/dailybruin"
                    title="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="-15 -18 42 42"
                      css={css`
                        &:hover {
                          fill: ${globals.DBblue};
                        }
                      `}
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com/dailybruin" title="Twitter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="-10 -18 42 42"
                      css={css`
                        &:hover {
                          fill: ${globals.DBblue};
                        }
                      `}
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                </div>
                <a href="/advertise">Advertise</a>
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
                      &:focus + input {
                        display: block;
                      }
                      &:focus + input + #Masthead__SearchIconBox {
                        background-color: #000;
                      }
                    `}
                  ></input>
                  <input
                    type="submit"
                    value=""
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
                      background-image: url(${minisearchIcon});
                      background-repeat: no-repeat;
                      background-size: 24px;
                      background-position: 6px;
                      &:hover {
                        display: block;
                      }
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
                  />
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
                    <img
                      id="Masthead__SearchIconBox"
                      css={css`
                        display: inline-block;
                        vertical-align: middle;
                        transition: all 200ms;
                        transition-delay: 100ms;
                        width: 36px;
                        height: 36px;
                      `}
                      src={searchIcon}
                    ></img>
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
            ::-webkit-scrollbar {
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
    );
  }
}
