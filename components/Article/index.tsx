import * as React from 'react'
import { css } from 'emotion'
import {
  headlineFont,
  storyListFont,
  cardShadow,
  regularFont,
  bodyFont,
} from '../globals'
import { date2string } from './utilities.js'

interface ArticleProps {
  displayType: string
  headline: string
  excerpt: string
  url: string
  date: Date
  authors: Link[]
  category: Link
  featureimg: string
  authorimg: string
  content: string
}

export default class Article extends React.Component<ArticleProps> {
  constructor(props) {
    super(props)
  }

  public render() {
    //  collect authors
    const authors = []
    if (this.props.authors.length === 0) {
      authors[0] = <span>Daily Bruin Staff</span>
    } else {
      for (const author of this.props.authors) {
        authors.push(
          <a
            href={author.url}
            className={css`
              text-decoration: none;
              color: #0080c6;
              background-color: #ffffff;

              &:hover {
                text-decoration: underline;
              }
            `}
          >
            {author.name}
          </a>
        )
      }
    }
    return (
      <div
        className={css`
          display: block;
          padding: 10px;
          box-shadow: ${cardShadow};
          background-color: #ffffff;
        `}
      >
        <span>
          <a
            href={this.props.category.url}
            className={css`
              text-decoration: none;
              color: #0080c6;

              &:hover {
                text-decoration: underline;
              }
            `}
          >
            <h2
              className={css`
                margin: 0;
                font-family: Source Sans Pro;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                display: inline;
              `}
            >
              {this.props.category.name}
            </h2>
          </a>
        </span>
        <h1
          className={css`
            margin: 2px 0;

            font-family: Arimo;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 1.15;

            color: #000000;
          `}
          dangerouslySetInnerHTML={{ __html: this.props.headline }}
        />
        <img
          src={this.props.featureimg}
          className={css`
            width: calc(100% + 20px);
            margin: 10px -10px;
          `}
        />
        <div style={{padding: "40px"}}>
          <div>
            <img
              src={this.props.authorimg}
              className={css`
                height: 48px;
                width: 48px;
                border-radius: 50%;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
              `}
            />
            <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <h3
                className={css`
                  margin: 0;
                  display: inline-block;

                  font-family: Arimo;
                  font-style: normal;
                  font-weight: bold;
                  font-size: 18px;
                  line-height: 21px;

                  color: #000000;
                `}
              >
                By {authors}
              </h3>
              <h4
                className={css`
                  margin: 0;
                  font-family: Source Sans Pro, sans-serif;
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 15px;
                `}
              >
                {date2string(this.props.date)}
              </h4>
            </div>
          </div>
          <p
            className={css`
              font-family: PT Serif;
              font-style: normal;
              font-weight: normal;
              font-size: 18px;
              line-height: 23px;

              color: #000000;
              max-width: 640px;
              margin: auto;
              display: block;
            `}
            dangerouslySetInnerHTML={{ __html: this.props.content }}
          />
        </div>
      </div>
    )
  }
}
