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

export default class Desktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: true,
      searchExpanded: false
    };
    this.MastheadCard = React.createRef();
    this.SearchBar = React.createRef();

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

  toggleMenu() {
    const block = this.MastheadCard.current;
    this.state.menuExpanded
      ? (block.style.height = "72px")
      : (block.style.height = "110px");
    this.state.menuExpanded = !this.state.menuExpanded;
  }

  expandMenu() {
    const block = this.MastheadCard.current;
    if (!this.state.menuExpanded) {
      block.style.height = "110px";
      this.state.menuExpanded = true;
    }
  }

  collapseMenu() {
    const block = this.MastheadCard.current;
    if (this.state.menuExpanded) {
      block.style.height = "72px";
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
              font-size: 18px;
              font-weight: bold;
              text-decoration: none;
              text-transform: uppercase;
              color: #ffffff;
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
          height: 110px;
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
          `}
        >
          <button
            css={css`
              display: none;
              border: none;
              margin-right: 8px;
              padding: 0;
              cursor: pointer;
              background-color: transparent;
              outline: none;

              &:active {
                transform: rotate(90);
              }
            `}
            onClick={this.toggleMenu}
          >
            <img
              src={menuIcon}
              css={css`
                display: inline-block;
                vertical-align: middle;
                height: 36px;
                background-color: white;
              `}
            ></img>
          </button>
          <a
            href="/"
            css={css`
              display: inline-block;
              vertical-align: middle;
            `}
          >
            <img
              src={logo}
              css={css`
                display: inline-block;
                vertical-align: middle;
                height: 60px;

                @media (max-width: 600px) {
                  height: 24px;
                }
              `}
            ></img>
          </a>
          <h2
            css={css`
              display: inline-block;
              vertical-align: bottom;
              padding-bottom: 6px;
              margin: 0;
              font-family: ${globals.headlineFont};
              font-style: normal;
              font-weight: normal;
              font-size: 16px;
              line-height: 21px;

              @media (max-width: 900px) {
                display: none;
              }
            `}
          >
            {today.toString()}
          </h2>
          <div
            css={css`
              display: inline-block;

              margin: 12px 0 6px 0;
              float: right;
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
                }

                & a:hover {
                  text-decoration: underline;
                }

                @media (max-width: 650px) {
                  display: none;
                }
              `}
            >
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
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
        <div
          css={css`
            background-color: #000;
            overflow-x: scroll;
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
