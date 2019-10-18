import * as React from 'react'
import { css } from 'emotion'

export default function Media(props) {
  return (
    <a
      href={props.link}
      className={css`
        text-decoration: none;
        color: white;
        display: inline-block;
        width: 256px;
        white-space: normal;

        &:hover {
          text-decoration: underline;
        }
      `}
    >
      <div
        className={css`
          margin: 10px;
        `}
      >
        <div
          className={css`
            height: 144px;
            background: url(${props.preview});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          `}
        />
        <h1
          className={css`
            margin: 10px 0;
            padding: 0;
            font-size: 24px;
            line-height: 1.15;
            font-family: 'Arimo', sans-serif;
            font-weight: 700;
          `}
        >
          {props.title}
        </h1>
      </div>
    </a>
  )
}
