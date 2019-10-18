import * as React from 'react'
import { css } from 'emotion'

import Media from './Media'

interface Media {
  title: string
  preview: string
  link: string
}

interface MultimediaScrollerProps {
  media: Media[]
}

export default class MultimediaScroller extends React.Component<
  MultimediaScrollerProps
> {
  constructor(props) {
    super(props)
  }

  public render() {
    const medialinks = []
    for (const media of this.props.media) {
      medialinks.push(
        <Media title={media.title} preview={media.preview} link={media.link} />
      )
    }
    return (
      <div
        className={css`
          width: 100%;
          padding: 0 20px;
          border-top: 10px solid black;
          background: #474747;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          color: #ffffff;
          box-sizing: border-box;
        `}
      >
        <h3
          className={css`
            margin: 10px 0 0;
            font-size: 14px;
            font-family: 'Arimo', sans-serif;
            font-weight: 700;
          `}
        >
          MULTIMEDIA
        </h3>
        <div
          className={css`
            padding-bottom: 15px;
            width: auto;
            white-space: nowrap;
            overflow: scroll;
          `}
        >
          {medialinks}
        </div>
      </div>
    )
  }
}
