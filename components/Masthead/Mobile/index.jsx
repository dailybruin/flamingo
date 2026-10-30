import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";

import {
  MobileMenuButton,
  MobileLogo,
  MobileSearchBar,
  MobileCategoryLinks,
  MobileSocialLinks
} from "./Components";
import {
  mastheadContainerStyles,
  headerRowStyles,
  logoCellStyles,
  searchCellStyles,
  menuDropdownStyles,
  categoriesColumnStyles
} from "./Styles";

export default class Mobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false,
      menuTop: 48
    };
    this.Menu = React.createRef();
    this.SearchBar = React.createRef();

    this.toggleMenu = this.toggleMenu.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
  }

  toggleMenu() {
    if (this.state.menuExpanded) {
      this.setState({ menuExpanded: false });
      return;
    }
    const menu = this.Menu.current;
    if (menu) menu.scrollIntoView();
    // The masthead can't reach the top of a short page, so measure where the
    // menu ended up rather than assuming it sits right below the top of the screen.
    this.setState({
      menuExpanded: true,
      menuTop: menu ? menu.getBoundingClientRect().top : this.state.menuTop
    });
  }

  expandSearch() {
    this.SearchBar.current.focus();
  }

  // Hold the page still behind the open menu. If it scrolls, the masthead moves
  // back down below the banner ad and pushes the bottom of the menu off screen.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.menuExpanded !== this.state.menuExpanded) {
      document.body.style.overflow = this.state.menuExpanded ? "hidden" : "";
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = "";
  }

  render() {
    return (
      <div css={mastheadContainerStyles}>
        <div css={headerRowStyles}>
          <MobileMenuButton
            onClick={this.toggleMenu}
            isExpanded={this.state.menuExpanded}
          />

          <div css={logoCellStyles}>
            <MobileLogo />
          </div>

          <div css={searchCellStyles}>
            <MobileSearchBar
              searchBarRef={this.SearchBar}
              onExpandSearch={this.expandSearch}
            />
          </div>
        </div>

        <div
          ref={this.Menu}
          css={menuDropdownStyles(this.state.menuExpanded, this.state.menuTop)}
        >
          <div css={categoriesColumnStyles}>
            <MobileCategoryLinks categories={this.props.categories} />
          </div>
          <MobileSocialLinks />
        </div>
      </div>
    );
  }
}
