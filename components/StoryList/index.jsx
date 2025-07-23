import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Story from "./Story";
import TopBar from "./TopBar";
import * as moment from "moment";


class StoryList extends React.Component {
  render() {
    const renderedStories = this.props.story.map((story, index) => (
      <Story
        title={story.title}
        text={story.text}
        link={story.link}
        key={index}
        column={story.column}
        db_display_options={story.db_display_options}
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
        <div
          css={css`
            padding: ${globals.cardPadding};
          `}
        >
          {!!this.props.image && (
            <>
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
            <span>
          <a
            href={this.props.category.as}
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
                margin: 0 4px 0 0;
                font-family: Source Sans Pro;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                text-transform: uppercase;
                display: inline;
              `}
              dangerouslySetInnerHTML={{ __html: this.props.category.name }}
            />
          </a>
          <span
            css={css`
              border-left: 1px solid #000;
              margin: 0;
              padding-left: 4px;
              font-family: ${globals.bodyFont};
              font-style: normal;
              font-weight: 300;
              font-size: 11px;
              line-height: 14px;
            `}
          >
            {moment(this.props.date).format("MMM D, YYYY h:mm a")}
          </span>
        </span>
        </>
          )}
          {renderedStories}
        </div>
      </div>
    );
  }
}

export default StoryList;
