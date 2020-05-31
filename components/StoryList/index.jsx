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
          link={this.props.link || ""}
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
              `}
              href={!!this.props.story[0].link ? this.props.story[0].link : "#"}
            >
              <img
                css={css`
                  width: 100%;
                `}
                src={this.props.image.src}
              />
            </a>
          )}
          {renderedStories}
        </div>
      </div>
    );
  }
}

export default StoryList;
