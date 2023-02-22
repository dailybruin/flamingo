import * as React from "react";
/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import Head from "next/head";

import * as globals from "../globals";

import moment from "moment";

import logo from "./dailybruin.svg";
import menuIcon from "./menu.svg";
import searchIcon from "./search.svg";
import minisearchIcon from "./minisearch.svg";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";

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
      : (menu.style.height = "calc(100vh - 48px)");
    this.setState({ menuExpanded: !this.state.menuExpanded });
  }

  expandSearch() {
    this.SearchBar.current.focus();
  }

  render() {
    let date = moment();
    let renderedCategories = [];
    if (this.props.categories != null) {
      for (let i = 0; i < this.props.categories.length; i++) {
        renderedCategories.push(
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
              color: ${this.props.darkmode ? "#ddd" : "#000"};
              &:hover {
                text-decoration: underline;
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
        css={css`
          background: ${this.props.darkmode ? "#222" : "#fff"};
          color: ${this.props.darkmode ? "#ddd" : "#000"};
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
              padding: 4px;
              cursor: pointer;
              background-color: transparent;
              outline: none;
              height: 36px;
              width: 36px;
              transition: transform 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
            `}
            style={{
              transform: this.state.menuExpanded
                ? "rotate(90deg)"
                : "rotate(0deg)"
            }}
            onClick={this.toggleMenu}
          >
            <img
              src={menuIcon}
              css={css`
                height: 100%;
                background-color: transparent;
                ${this.props.darkmode ? "filter: invert(1);" : ""};
              `}
            ></img>
          </button>
          <div
            css={css`
              display: table-cell;
              text-align: center;
              width: 100%;
              white-space: nowrap;
            `}
          >
            <a
              href="/"
              css={css`
                display: inline-block;
                vertical-align: middle;
                height: 32px;
                padding: 4px 0;
              `}
            >
              <img
                src={
                  date.date() == 1 && date.month() == 3
                    ? require("./prankd.svg")
                    : logo
                }
                css={css`
                  display: inline-block;
                  height: 100%;
                `}
              ></img>
              {date.date() == 1 && date.month() == 3 && (
                <>
                  <Head>
                    <link
                      href="https://wp.dailybruin.com/wp-content/themes/caeruleum/css/dbcomic.ttf"
                      rel="stylesheet"
                    />
                  </Head>
                  <Global
                    styles={css`
                      * {
                        font-family: "Comic Sans MS", sans-serif !important;
                      }
                    `}
                  ></Global>
                </>
              )}
            </a>
          </div>
          <div
            css={css`
              display: table-cell;
              vertical-align: middle;
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
                      width: calc(100vw - 64px);
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
                    padding: 4px;
                    height: 36px;
                    width: 36px;
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
                      height: 100%;
                      ${this. props.darkmode ? "filter: invert(1);" : ""};
                    `}
                    src={searchIcon}
                  ></img>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          ref={this.Menu}
          css={css`
            position: absolute;
            margin: 0px;
            background-color: ${this.props.darkmode ? "#222" : "#fff"};
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
              flex: 1;
              width: 40%;
              padding: 6px;
              text-align: center;
              align-items: center;
              justify-content: center;
              font-family: ${globals.menuFont};
              font-size: 14px;
              font-weight: bold;
              text-decoration: none;
              text-transform: uppercase;
              color: #000;
              a:hover {
                text-decoration: underline;
              }
              #darkmode{
                display: 'flexbox';
                align-items: 'center';
                margin-top: 20px;
                margin-right: 2.3vw;


              }
              #darkmode .checkbox {
                opacity: 0;
                position: relative;
                width: 0;
              }
              #darkmode .label {
                width: 48px;
                height: 14px;
                background-color: ${globals.DBblue};
                display: inline;
                border-radius:50px;
                padding: 8px 10px 5px 6px;
                position: relative;
                cursor: pointer;
              }
              #darkmode .moon {
                margin-left: 0px;
              }
              #darkmode .sun {
                margin-left: 10px;
              }
              #darkmode .ball {
                width: 24px;
                height: 24px;
                background-color: white;
                position: absolute;
                top: 3.5px;
                left: 3px;
                border-radius: 50%;
                transition: transform 0.2s linear;
              }
              #darkmode .checkbox:checked + .label .ball{
                transform: translateX(24px);
                background-color: #111;
              }
              #darkmode .checkbox:checked + .label{
                background-color: #ddd;
              }
            `}
          >
            <a
              href="https://www.facebook.com/dailybruin"
              target="_blank"
              rel="noopener"
              css={css`
                display: block;
                padding: 8px 4px;
              `}
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/dailybruin"
              target="_blank"
              rel="noopener"
              css={css`
                display: block;
                padding: 8px 4px;
              `}
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/dailybruin"
              target="_blank"
              rel="noopener"
              css={css`
                display: block;
                padding: 8px 4px;
              `}
            >
              Instagram
            </a>
            <a
              href="http://eepurl.com/cFEiZX"
              target="_blank"
              rel="noopener"
              css={css`
                display: block;
                padding: 8px 4px;
              `}
            >
              Newsletter
            </a>
            <a
              href="/advertise"
              css={css`
                display: block;
                padding: 8px 4px;
              `}
            >
              Advertise
            </a>
            <a
              href="https://giving.ucla.edu/campaign/?&amount=100&OrgType=C&OrgNum=11300&fund=31601O&_ga=2.101555268.497205227.1521136411-359345519.1518723170"
              target="_blank"
              rel="noopener"
              css={css`
                display: block;
                padding: 8px 4px;
              `}
            >
              Donate
            </a>
            <a
              href="/submit"
              target="_blank"
              rel="noopener"
              css={css`
                display: block;
                padding: 8px 4px;
              `}
            >
              Submit
            </a>
            {/* Darkmode toggle button */}
            <div id="darkmode">
              <input type="checkbox" className="checkbox" id="checkbox"
               checked={this.props.darkmode}
               onChange={(e)=>this.props.onToggle(e)}
              />
              <label htmlFor="checkbox" className="label">
                <BsMoonStarsFill color="black" className="moon"/>
                <BsFillSunFill color="white" className="sun"/>
                <div className="ball"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
