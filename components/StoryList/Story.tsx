import * as React from 'react'
import { css } from 'emotion'
import * as globals from '../globals'

interface StoryProps {
  title: string
  text: string
  link: string
}

function Link(props: any) {
  return (
    <a
      href={props.link}
      className={css`
        color: ${globals.black};
        text-decoration: none;
        &:hover {
          opacity: 0.8;
        }
      `}
    >
      {props.children}
    </a>
  )
}

export default function Story(props: StoryProps) {
  return (
    <div
      className={css`
        border-bottom: solid #ababab 0.1rem;
        padding: 7px 0px 7px;
        &:first-child {
          padding-top: 0px;
        }
        &:last-child {
          border-bottom: none;
          padding-bottom: 0px;
        }
      `}
    >
      <a href={props.link} style={{ textDecoration: 'none' }}>
        <h3
          className={css`
            font-family: ${globals.headlineFont};
            font-size: 0.875rem;
            font-weight: 700;
            line-height: 1.125rem;
            margin: 0px 0px 3px;
            overflow-wrap: break-word;
            text-align: left;
            color: #000000;

            &:hover {
              color: ${globals.DBblue};
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h3>
        <p
          className={css`
            color: ${globals.black};
            font-family: 'PT Serif', serif;
            font-size: 0.78rem;
            line-height: 1.1rem;
            margin: 0px;
            overflow-wrap: break-word;

            p {
              margin: 0;
            }
          `}
          dangerouslySetInnerHTML={{ __html: props.text }}
        ></p>
      </a>
    </div>
  )
}
