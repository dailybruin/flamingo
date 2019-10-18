import * as React from 'react'
import { css } from 'emotion'

import SectionTab from './SectionTab'

export default class SectionTabs extends React.Component {
  constructor(props) {
    super(props)
  }
  public render() {
    const sections = this.props.sectionList
    const sectionTabList = []
    if (sections != null) {
      for (const i of sections) {
        sectionTabList.push(<SectionTab section={i} />)
      }
    }
    return (
      <ul
        className={css`
          width: 100%;
          margin: 0;
          padding: 0;
          line-height: normal;
          font-size: 18px;
          background: #000000;
          list-style-type: none;
          @media (max-width: 600px) {
            display: none;
          }
        `}
        id="SectionHeaderTabs"
      >
        {sectionTabList}
      </ul>
    )
  }
}
