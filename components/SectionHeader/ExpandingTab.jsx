import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

export default class ExpandingTab extends React.Component {
  constructor(props) {
    super(props)
  }

   render() {
    return (
      <li
        css={css`
          text-decoration: none;
          height: 38px;
          margin: 0;
          padding: 7px 20px;
          width: 100%;
          box-sizing: border-box;
          display: block;
          vertical-align: middle;
          position: relative;
          line-height: normal;
        `}
      >
        <a
          href={this.props.section.url}
          css={css`
            display: block;
            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: 900;
            font-size: 18px;
            text-transform: uppercase;
            text-align: left;
            color: #ffffff;
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
