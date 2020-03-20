import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Link from "next/link";

import * as globals from "../globals";

import logo from "./dailybruin.svg";
import menuIcon from "./menu.svg";
import searchIcon from "./search.svg";

export default class Mobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false,
      searchExpanded: false
    };
    this.Menu = React.createRef();
    this.SearchBar = React.createRef();

    this.toggleMenu = this.toggleMenu.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
  }

  toggleMenu() {
    const menu = this.Menu.current;
    menu.scrollIntoView();
    this.state.menuExpanded
      ? (menu.style.height = "0")
      : (menu.style.height = "calc(100vh - 50px)");
    this.state.menuExpanded = !this.state.menuExpanded;
  }

  expandSearch() {
    this.SearchBar.current.focus();
  }

  render() {
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
                display: block;
                text-align: left;
                padding: 8px 4px;
                font-family: ${globals.menuFont};
                font-size: 18px;
                font-weight: bold;
                text-decoration: none;
                text-transform: uppercase;
                color: #ffffff;
                &:hover {
                  text-decoration: underline;
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
        css={css`
          background: #ffffff;
          box-shadow: ${globals.cardShadow};
          transition: height 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
          position: sticky;
          top: 0;
          z-index: 10;
          margin: 6px -6px;
        `}
      >
        <div
          css={css`
            display: table;
            width: 100%;
            text-align: center;
            padding: 6px 12px;
          `}
        >
          <button
            css={css`
              display: table-cell;
              vertical-align: middle;
              border: none;
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
                height: 36px;
                background-color: white;
              `}
            ></img>
          </button>
          <Link href="/">
            <a
              href="/"
              css={css`
                display: table-cell;
                vertical-align: middle;
              `}
            >
              <img
                css={css`
                  height: 36px;
                `}
                src={logo}
              ></img>
            </a>
          </Link>
          <div
            css={css`
              display: table-cell;
              vertical-align: middle;
              height: 36px;
            `}
          >
            <div
              ref={this.SearchBarBlock}
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
                  transition: none;
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
          ref={this.Menu}
          css={css`
            position: absolute;
            margin: 0px;
            background-color: #000;
            padding: 0 6px;
            height: 0;
            overflow-y: scroll;
            width: 100%;

            transition: height 500ms;
          `}
        >
          <div
            css={css`
              vertical-align: top;
              display: inline-block;
              width: 60%;
              padding: 6px;
            `}
          >
            {renderedCategories}
          </div>
          <div
            css={css`
              vertical-align: top;
              display: inline-block;
              width: 40%;
              padding: 6px;
              text-align: center;
              font-family: ${globals.menuFont};
              font-size: 14px;
              font-weight: bold;
              text-decoration: none;
              text-transform: uppercase;
              color: #ffffff;
              &:hover {
                text-decoration: underline;
              }
            `}
          >
            <Link href="/about">
              <a
                href="/about"
                css={css`
                  display: block;
                  padding: 8px 4px;
                `}
              >
                About
              </a>
            </Link>
            <Link href="/contact">
              <a
                href="/contact"
                css={css`
                  display: block;
                  padding: 8px 4px;
                `}
              >
                Contact
              </a>
            </Link>
            <Link href="/advertise">
              <a
                href="/advertise"
                css={css`
                  display: block;
                  padding: 8px 4px;
                `}
              >
                Advertise
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
