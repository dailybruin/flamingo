import * as React from 'react';
import { css } from 'emotion'
import * as MainSiteStyles from '../globals'

interface FooterLinkProps {
  url: string,
  text: string
}

export default function FooterLink (props: FooterLinkProps) {
  return(
    <a
      className={css`
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
