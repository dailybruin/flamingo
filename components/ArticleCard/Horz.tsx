import * as React from 'react'
import { css } from 'emotion'
import * as globals from '../globals'
import * as locals from './locals'
import { date2string } from './utilities.js'

interface HorzProps {
  displayType: string
  headline: string
  excerpt: string
  url: string
  date: Date
  authors: Link[]
  category: Link
  imageurl: string
}

export default function Horz(props: HorzProps) {
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
        display: flex;
        box-shadow: ${globals.cardShadow};
        padding: 0px;
        background-color: #ffffff;
      `}
    >
      <div
        className={css`
          padding: 10px;
          flex-shrink: 0;
          flex-grow: 2;
        `}
      >
        <a href={props.url} style={{textDecoration: "none"}}>
        <div
          className={css`
            height: calc(100% - 8px);
            min-height: 200px;
            background: url(${props.imageurl});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          `}
        />
      </a>
        <h4
          className={css`
            display: block;
            margin: 2px 0 0;

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
      </div>
      <div
        className={css`
          padding: 10px;
          width: 40%;
        `}
      >
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
              vertical-align: middle;
            `}
          >
            {date2string(props.date)}
          </span>
        </span>
        <a href={props.url} style={{textDecoration: "none"}}>
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
    </div>
  )
}
