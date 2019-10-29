import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Story from "./Story";
import TopBar from "./TopBar";

class StoryList extends React.Component {
  render() {
    const renderedStories = this.props.story.map((story, index) => (
      <Story
        title={story.title}
        text={story.text}
        link={story.link}
        key={index}
      />
    ));

    return (
      <div
        css={css`
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
        <div
          css={css`
            padding: ${globals.cardPadding};
          `}
        >
          {!!this.props.image && (
            <a
              css={css`
                display: block;
                text-decoration: none;
                margin-bottom: 10px;
              `}
              href={!!this.props.story[0].link ? this.props.story[0].link : "#"}
            >
            <div
              css={css`
                padding-top: 66.66%;
                width: 100%;
                overflow: hidden;
                position: relative;
              `}
            >
              <img
                css={css`
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                `}
                src={this.props.image.src}
              />
            </div>
            </a>
          )}
          {renderedStories}
        </div>
      </div>
    );
  }
}

export default StoryList;
