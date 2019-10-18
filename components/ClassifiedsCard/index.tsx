import * as React from 'react'
import { render } from 'react-dom'

import { css } from 'emotion'

import {
  headlineFont,
  storyListFont,
  cardShadow,
  regularFont,
  bodyFont,
} from '../globals'

interface Link {
  name: string
  url: string
}

interface ClassifiedProps {
  category: Link
  content: Link
}

interface ClassifiedsCardProps {
  header: string
  classifieds: Classified[]
  link: Link
}

function Classified(props) {
  return (
    <div
      className={css`
        font-family: Source Sans Pro;
        font-size: 12px;
        line-height: 15px;
        padding: 6px 0;
        border-bottom: 1px solid #474747;
      `}
    >
      <a
        href={props.category.url}
        className={css`
          font-weight: 700;
          color: #0080c6;
          text-transform: uppercase;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        `}
      >
        {props.category.name}
      </a>
      <br />
      <a
        href={props.content.url}
        className={css`
          color: #000000;
          text-decoration: none;
        `}
      >
        {props.content.name}
      </a>
    </div>
  )
}

export default class ClassifiedsCard extends React.Component<
  ClassifiedsCardProps
> {
  public static defaultProps = {
    header: 'Featured Classifieds',
    link: { name: 'More Classifieds »', url: './#' },
  }
  constructor(props) {
    super(props)
  }

  public render() {
    const renderedClassifieds = []
    if (this.props.classifieds != null) {
      for (const i of this.props.classifieds) {
        renderedClassifieds.push(
          <Classified category={i.category} content={i.content} />
        )
      }
    }

    return (
      <div
        className={css`
          box-shadow: ${cardShadow};
          background-color: #ffffff;
        `}
      >
        <div
          className={css`
            background-color: #000000;
            height: 24px;
            padding: 0 6px;

            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: 900;
            font-size: 18px;
            line-height: 24px;
            text-transform: uppercase;

            color: #ffffff;
          `}
        >
          {this.props.header}
        </div>
        <div
          className={css`
            padding: 0 12px;
          `}
        >
          {renderedClassifieds}
        </div>
        <div style={{ textAlign: 'right', padding: '12px 12px 6px' }}>
          <a
            href={this.props.link.url}
            className={css`
              font-family: Source Sans Pro;
              font-size: 12px;
              line-height: 15px;
              font-weight: bold;
              color: #0080c6;
              text-transform: uppercase;
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            `}
          >
            {this.props.link.name}
          </a>
        </div>
      </div>
    )
  }
}
