import * as React from 'react'
import { css } from 'react-emotion'
import * as MainSiteStyles from '../../globals/mainsiteGlobalStyles'

interface QuestionProps {
  text: string
}

export default function Question(props: QuestionProps) {
  return (
    <div
      className={css`
        padding: ${MainSiteStyles.cardInnerPadding};
        padding-bottom: 0px;
      `}
    >
      <h3
        className={css`
          font-family: ${MainSiteStyles.storyListFont}, serif;
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
