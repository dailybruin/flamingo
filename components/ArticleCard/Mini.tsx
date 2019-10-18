import * as React from 'react'
import { css } from 'emotion'
import * as globals from '../globals'
import * as locals from './locals'
import { date2string } from './utilities.js'

interface MiniProps {
  displayType: string
  headline: string
  excerpt: string
  url: string
  date: Date
  authors: Link[]
  category: Link
  imageurl: string
}

export default function Mini(props: MiniProps) {
  return (
    <div
      className={css`
        display: flex;
        box-shadow: ${globals.cardShadow};
        padding: 0px;
        background-color: #ffffff;
      `}
    >
      <a href={props.url} style={{ textDecoration: 'none' }}>
        <div
          className={css`
            min-width: 90px;

            background: url(${props.imageurl});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          `}
        />
      </a>
      <div
        className={css`
          padding: 10px;
          display: block;
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
        <a href={props.url} style={{ textDecoration: 'none' }}>
          <h1
            className={css`
              display: block;
              margin: 2px 0;
              ${locals.headline}
              font-size: 16px;
            `}
            dangerouslySetInnerHTML={{ __html: props.headline }}
          />
        </a>
      </div>
    </div>
  )
}
