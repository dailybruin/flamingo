import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";

import logo from "./dailybruin.svg";
import {
  DateDisplay,
  TopNavLinks,
  SearchBar,
  CategoryLinks
} from "./DesktopComponents";
import {
  expandedHeight,
  collapsedHeight,
  LOGO_EXPANDED_HEIGHT,
  LOGO_COLLAPSED_HEIGHT,
  mastheadContainerStyles,
  headerRowStyles,
  logoContainerStyles,
  logoStyles,
  rightColumnStyles,
  actionsContainerStyles,
  dividerStyles,
  dividerLineStyles,
  categoriesContainerStyles
} from "./DesktopStyles";

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
      logo.style.height = LOGO_EXPANDED_HEIGHT;
      this.setState({ menuExpanded: true });
    }
  }

  collapseMenu() {
    const block = this.MastheadCard.current;
    const logo = this.Logo.current;
    if (this.state.menuExpanded) {
      block.style.height = collapsedHeight;
      logo.style.height = LOGO_COLLAPSED_HEIGHT;
      this.setState({ menuExpanded: false });
    }
  }

  expandSearch() {
    this.SearchBar.current.focus();
  }

  render() {
    return (
      <div
        id="masthead"
        ref={this.MastheadCard}
        css={mastheadContainerStyles(expandedHeight)}
      >
        <div css={headerRowStyles}>
          <DateDisplay />

          <div css={logoContainerStyles}>
            <a
              ref={this.Logo}
              href="/"
              css={logoStyles(LOGO_EXPANDED_HEIGHT)}
            >
              <img
                src={logo}
                css={css`
                  display: inline-block;
                  height: 100%;
                `}
                alt="Daily Bruin"
              />
            </a>
          </div>

          <div css={rightColumnStyles}>
            <div css={actionsContainerStyles}>
              <TopNavLinks />
              <SearchBar
                searchBarRef={this.SearchBar}
                onExpandSearch={this.expandSearch}
              />
            </div>
          </div>
        </div>

        <div css={dividerStyles}>
          <div css={dividerLineStyles}></div>
        </div>

        <div css={categoriesContainerStyles}>
          <CategoryLinks categories={this.props.categories} />
        </div>
      </div>
    );
  }
}
