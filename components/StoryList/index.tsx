import * as React from 'react'
import { css } from 'emotion'
import * as globals from '../globals'
import Story from './Story'
import TopBar from './TopBar'

/**
 * Story List Properties
 */

interface StoryContent {
  title: string
  text: string
  link: string
}

interface ImageContent {
  src: string
  alt: string
}

enum StoryListType {
  Popular = 'Popular',
  Print = 'Print',
}

interface StoryListProps {
  /** A list of the most popular stories. */
  story: StoryContent[]
  /** An image relating to the most popular story (i.e. the first in the list). */
  image?: ImageContent
  /** Determines the title of the black top-bar (see example below). Defaults to popular stories. */
  // type: StoryListType
  type: string
}

class StoryList extends React.Component<StoryListProps> {
  public static defaultProps = { type: StoryListType.Popular }

  public render() {
    const renderedStories = this.props.story.map((story, index) => (
      <Story
        title={story.title}
        text={story.text}
        link={story.link}
        key={index}
      />
    ))

    return (
      <div
        className={css`
          background-color: ${globals.white};
          box-shadow: ${globals.cardShadow};
          justify-content: center;
          margin: auto;
        `}
      >
        <TopBar
          title={
            /* !!this.props.image
              ? 'IN THE NEWS'
              : this.props.type === StoryListType.Popular
              ? 'POPULAR'
              : 'IN THE PRINT' */
            this.props.type
          }
        />
        {!!this.props.image && (
          <a
            className={css`
              display: block;
              margin: 15px auto 0px;
              text-decoration: none;
              width: 90%;
            `}
            href={!!this.props.story[0].link ? this.props.story[0].link : '#'}
          >
            <img
              className={css`
                object-fit: contain;
                vertical-align: top;
                width: 100%;
                &:hover {
                  opacity: 0.85;
                }
              `}
              src={this.props.image.src}
              alt={this.props.image.alt}
            />
          </a>
        )}
        <div
          className={css`
            padding: ${globals.cardPadding};
          `}
        >
          {renderedStories}
        </div>
      </div>
    )
  }
}

export default StoryList
