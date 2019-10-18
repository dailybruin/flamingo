import * as React from 'react'
import { css } from 'emotion'

export default class SectionTab extends React.Component<SectionTabProps> {
  constructor(props: SectionTabProps) {
    super(props)
  }
  public render() {
    return (
      <li
        className={css`
          box-sizing: border-box;
          height: 38px;
          display: inline-block;
          padding: 7px 10px;
          background-color: #000000;
        `}
      >
        <a
          href={this.props.section.url}
          className={css`
            color: #ffffff;
            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
            font-size: 18px;
            text-transform: uppercase;
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          `}
        >
          {this.props.section.name}
        </a>
      </li>
    )
  }
}
