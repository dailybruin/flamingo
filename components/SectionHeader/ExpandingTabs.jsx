import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import ExpandingTab from './ExpandingTab'

export default class ExpandingTabs extends React.Component {
  constructor(props) {
    super(props)
  }
   render() {
    const sections = this.props.sectionList
    const sectionTabList = []
    if (sections != null) {
      for (const i of sections) {
        sectionTabList.push(<ExpandingTab section={i} />)
      }
    }
    return (
      <ul
        css={css`
          width: 100%;
          height: auto;
          margin: 0;
          padding: 0;
          background: #000000;
          list-style-type: none;
          @media (min-width: 600px) {
            display: none;
          }
        `}
        id="SectionHeaderExpandingTabs"
      >
        {sectionTabList}
      </ul>
    )
  }
}
