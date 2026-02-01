import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";

import {
  MobileMenuButton,
  MobileLogo,
  MobileSearchBar,
  MobileCategoryLinks,
  MobileSocialLinks
} from "./MobileComponents";
import {
  mastheadContainerStyles,
  headerRowStyles,
  logoCellStyles,
  searchCellStyles,
  menuDropdownStyles,
  categoriesColumnStyles
} from "./MobileStyles";

export default class Mobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false
    };
    this.Menu = React.createRef();
    this.SearchBar = React.createRef();

    this.toggleMenu = this.toggleMenu.bind(this);
    this.expandSearch = this.expandSearch.bind(this);
  }

  toggleMenu() {
    const menu = this.Menu.current;
    if (menu) menu.scrollIntoView();
    this.setState({ menuExpanded: !this.state.menuExpanded });
  }

  expandSearch() {
    this.SearchBar.current.focus();
  }

  render() {
    const menuHeight = this.state.menuExpanded ? "calc(100vh - 48px)" : "0";

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
          css={menuDropdownStyles(menuHeight)}
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
