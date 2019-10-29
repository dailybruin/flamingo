import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import ExpandingTabs from './ExpandingTabs'

export default class ExpandingMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuExpanded: false,
    }
    this.expandMenu = this.expandMenu.bind(this)
  }
   expandMenu() {
    const header = document.getElementById('SectionHeaderBlock')
    const tabs = document.getElementById('SectionHeaderExpandingTabs')
    const height = tabs.clientHeight + 100
    this.state.menuExpanded
      ? (header.style.height = '100px')
      : (header.style.height = height + 'px')
    this.state.menuExpanded = !this.state.menuExpanded
  }
   render() {
    function expandMenuAux() {
      this.expandMenu()
    }
    return (
      <div
        css={css`
          display: block;
          background-color: #000000;
          width: 100%;
        `}
        id="menu"
      >
        <div
          css={css`
            box-sizing: border-box;
            display: block;
            background-color: #000000;
            height: 38px;
            width: 100%;
            padding: 7px;

            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
            font-size: 18px;

            text-transform: uppercase;
            color: #ffffff;

            cursor: pointer;

            @media (min-width: 600px) {
              color: #000000;
            }
          `}
          onClick={this.expandMenu}
        >
          Sections ▾
        </div>
        <ExpandingTabs sectionList={this.props.sectionList} />
      </div>
    )
  }
}
