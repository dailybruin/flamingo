import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export default class SectionTab extends React.Component {
  constructor(props) {
    super(props)
  }
   render() {
    return (
      <li
        css={css`
          box-sizing: border-box;
          height: 38px;
          display: inline-block;
          padding: 7px 10px;
          background-color: #000000;
        `}
      >
        <a
          href={this.props.section.url}
          css={css`
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
