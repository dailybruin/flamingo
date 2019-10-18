import * as React from 'react'
import { css } from 'emotion'
import * as globals from '../globals'
import * as locals from './locals'
import { date2string } from './utilities.js'

interface VertProps {
  displayType: string
  headline: string
  excerpt: string
  url: string
  date: Date
  authors: Link[]
  category: Link
  imageurl: string
}

export default function Vert(props: VertProps) {
  //  collect authors
  const authors = []
  if (props.authors.length === 0) {
    authors[0] = <span>Daily Bruin Staff</span>
  } else {
    for (const author of props.authors) {
      authors.push(
        <a
          href={author.url}
          className={css`
            text-decoration: none;
            color: ${globals.DBblue};

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
        box-shadow: ${globals.cardShadow};
        background-color: #ffffff;
      `}
    >
      <a href={props.url} style={{ textDecoration: 'none' }}>
        <img
          src={props.imageurl}
          className={css`
            width: 100%;
          `}
        />
      </a>
      <h4
        className={css`
          margin: 2px 0;

          font-family: Arimo;
          font-style: normal;
          font-weight: normal;
          font-size: 8px;
          text-align: right;

          color: #000000;
        `}
      >
        {props.photographer}
      </h4>
      <span>
        <a
          href={props.category.url}
          className={css`
            text-decoration: none;
            color: ${globals.DBblue};
            vertical-align: middle;

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
            {props.category.name}
          </h2>
        </a>
        <span
          className={css`
            margin: 0;
            vertical-align: middle;
          `}
        >
          &nbsp;|&nbsp;
        </span>
        <span
          className={css`
            margin: 0;
            font-family: Source Sans Pro, sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 14px;
          `}
        >
          {date2string(props.date)}
        </span>
      </span>
      <a href={props.url} style={{ textDecoration: 'none' }}>
        <h1
          className={css`
            margin: 2px 0 4px;
            ${locals.headline}
          `}
          dangerouslySetInnerHTML={{ __html: props.headline }}
        />
        <p
          className={css`
            margin: 0 0 5px;
            ${locals.excerpt}
          `}
          dangerouslySetInnerHTML={{ __html: props.excerpt }}
        />
      </a>
      <h3
        className={css`
          margin: 0;

          font-family: Arimo;
          font-style: normal;
          font-weight: bold;
          font-size: 11px;

          color: #000000;
        `}
      >
        By {authors}
      </h3>
    </div>
  )
}
