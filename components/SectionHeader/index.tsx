import * as React from 'react'
import { css } from 'emotion'

import SectionTabs from './SectionTabs'
import ExpandingMenu from './ExpandingMenu'

interface Link {
  name: string
  link: string
}

interface SectionHeaderProps {
  name: string
  sectionList: Link[]
}

interface ExpandingTabsProps {
  sectionList: Link[]
}

interface SectionTabProps {
  section: SectionLink
}

export default class SectionHeader extends React.Component<SectionHeaderProps> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div
        className={css`
          height: 100px;

          padding: 0;

          background: #ffffff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

          text-align: center;
          line-height: 37px;

          overflow: hidden;
          transition: height 500ms cubic-bezier(0.25, 0.8, 0.25, 1);
        `}
        id="SectionHeaderBlock"
      >
        <div
          className={css`
            box-sizing: content-box;
            left: 0;
            right: 0;

            margin: 0;
            padding: 7px 0 0;

            line-height: 62px;
            height: 55px;

            font-family: Archivo Black, sans-serif;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
            font-size: 48px;
            text-transform: uppercase;

            color: #000000;
          `}
        >
          {this.props.name}
        </div>
        <SectionTabs sectionList={this.props.sectionList} />
        <ExpandingMenu sectionList={this.props.sectionList} />
      </div>
    )
  }
}
