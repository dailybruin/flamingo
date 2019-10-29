import * as React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as MainSiteStyles from '../globals'

interface FooterLinkProps {
  url: string,
  text: string
}

export default function FooterLink (props: FooterLinkProps) {
  return(
    <a
      css={css`
        margin-right: 15px;
        text-decoration: none;
        color: inherit;

        ${MainSiteStyles.mediaMobileBreakpoint} {
          margin: auto;
        }
      `}
      href={props.url}>{props.text}</a>
  )
}
