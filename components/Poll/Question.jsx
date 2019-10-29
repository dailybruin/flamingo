import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as MainSiteStyles from '../globals'

export default function Question(props) {
  return (
    <div
      css={css`
        padding: ${MainSiteStyles.cardPadding};
        padding-bottom: 0px;
      `}
    >
      <h3
        css={css`
          font-family: ${MainSiteStyles.headlineFont}, serif;
          font-size: 0.875rem;
          font-weight: 700;
          line-height: 1.125rem;
          margin: 0px 0px 3px;
        `}
      >
        {props.text}
      </h3>
    </div>
  )
}
