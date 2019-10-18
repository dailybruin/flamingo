import * as React from 'react'
import { css } from 'emotion'
import * as globals from '../globals'

interface TopBarProps {
  title: string
}

export default function TopBar(props: TopBarProps) {
  return (
    <div
      className={css`
        background-color: ${globals.black};
        padding: 2px 0px 4px 10px;
      `}
    >
      <h2
        className={css`
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
