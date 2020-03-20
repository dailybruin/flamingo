import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Link from "next/link";
import * as moment from "moment";

import * as globals from "../globals";

import logo from "./dailybruin.svg";
import menuIcon from "./menu.svg";
import searchIcon from "./search.svg";

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
      for (let i = 0; i < this.props.categories.length; i++) {
        renderedCategories.push(
          <Link
            href={this.props.categories[i].href}
            as={this.props.categories[i].as}
          >
            <a
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
          </Link>
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
          <Link href="/">
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
          </Link>
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
              <Link href="/about">
                <a href="/about">About</a>
              </Link>
              <Link href="/contact">
                <a href="/contact">Contact</a>
              </Link>
              <Link href="/advertise">
                <a href="/advertise">Advertise</a>
              </Link>
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
              <input
                ref={this.SearchBar}
                type="text"
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
                    background-color: #000;
                  }
                  &:focus + button > #Masthead__SearchIconBox {
                    width: 24px;
                    height: 24px;
                    margin: 6px;
                  }
                  &:focus
                    + button
                    #Masthead__SearchIconBox
                    #Masthead__SearchIcon {
                    fill: #fff;
                  }
                `}
              ></input>
              <button
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
                <svg
                  id="Masthead__SearchIconBox"
                  css={css`
                    display: inline-block;
                    vertical-align: middle;
                    transition: all 200ms;
                    transition-delay: 100ms;
                    width: 36px;
                    height: 36px;
                  `}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Masthead__SearchIcon"
                    css={css`
                      transition: all 200ms;
                      transition-delay: 100ms;
                    `}
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>
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
