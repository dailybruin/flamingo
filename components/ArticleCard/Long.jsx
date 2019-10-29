import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as globals from '../globals'
import * as locals from './locals'
import * as utilities from "./utilities";

export default function Long(props) {
  //  collect authors
  const authors = []
  if (props.authors.length === 0) {
    authors[0] = <span>Daily Bruin Staff</span>
  } else {
    for (const author of props.authors) {
      authors.push(
        <a
          href={author.url}
          css={css`
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
      css={css`
        display: flex;
        box-shadow: ${globals.cardShadow};
        height: 100%;
        padding: 0px;
        background-color: #ffffff;
      `}
    >
      <div
        css={css`
          padding: 10px;
          flex: 3;
        `}
      >
        <span>
          <a
            href={props.category.url}
            css={css`
              text-decoration: none;
              color: ${globals.DBblue};
              vertical-align: middle;

              &:hover {
                text-decoration: underline;
              }
            `}
          >
            <h2
              css={css`
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
            css={css`
              margin: 0;
              vertical-align: middle;
            `}
          >
            &nbsp;|&nbsp;
          </span>
          <span
            css={css`
              margin: 0;
              font-family: Source Sans Pro, sans-serif;
              font-style: normal;
              font-weight: 400;
              font-size: 11px;
              vertical-align: middle;
            `}
          >
            {utilities.date2string(props.date)}
          </span>
        </span>
        <a href={props.url} style={{ textDecoration: 'none' }}>
          <h1
            css={css`
              margin: 2px 0;
              ${locals.headline}
            `}
            dangerouslySetInnerHTML={{ __html: props.headline }}
          />
        </a>
        <h3
          css={css`
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
      <div
        css={css`
          padding: 20px 30px 20px 10px;
          flex: 4;
        `}
      >
        <a href={props.url} style={{ textDecoration: 'none' }}>
          <p
            css={css`
              ${locals.excerpt}
            `}
            dangerouslySetInnerHTML={{ __html: props.excerpt }}
          />
        </a>
      </div>
      <div
        css={css`
          flex: 4;
        `}
      >
        <a href={props.url} style={{ textDecoration: 'none' }}>
          <div
            css={css`
              height: 100%;
              min-width: 200px;
              background: url(${props.imageurl});
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover;
            `}
          />
        </a>
      </div>
    </div>
  )
}
