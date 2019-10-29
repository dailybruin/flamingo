import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as globals from '../globals'

export default function TopBar(props) {
  return (
    <div
      css={css`
        background-color: ${globals.black};
        padding: 2px 0px 4px 10px;
      `}
    >
      <h2
        css={css`
          color: ${globals.white};
          font-family: ${globals.menuFont}, sans-serif;
          font-size: 1.125rem;
          font-weight: 900;
          line-height: 1.4375rem;
          margin: 0px;
          overflow-wrap: break-word;
        `}
      >
        {props.title}
      </h2>
    </div>
  )
}
