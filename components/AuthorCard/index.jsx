import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import emailImage from "./mail.svg";
import twitterImage from "./twitter.svg";

function SocialCircle(props) {
  return (
    <a href={props.url}>
      <div
        css={css`
          border-radius: 50%;
          height: 36px;
          width: 36px;
          margin: 5px;
          display: inline-block;
          background-color: ${props.color};
        `}
      >
        <img
          css={css`
            width: 36px;
            padding: 8px;
            height: auto;
          `}
          src={props.image}
        />
      </div>
    </a>
  );
}

/** An author card. */
export default class AuthorCard extends React.Component {
  render() {
    return (
      <div
        css={css`
          background-color: white;
          box-shadow: ${globals.cardShadow};
        `}
      >
        <div
          css={css`
            display: block;
            text-align: center;
          `}
        >
          <div
            css={css`
              padding: 20px;
              max-width: 300px;
              margin: auto;
            `}
          >
            <div
              css={css`
                height: 100%;
                width: 100%;
                padding-top: 100%;
                overflow: hidden;
                position: relative;
              `}
            >
              <img
                css={css`
                  height: 100%;
                  width: 100%;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  object-fit: cover;
                  border-radius: 50%;
                `}
                src={this.props.image}
              />
            </div>
          </div>
          <h1
            css={css`
              font-style: "bold";
              font-size: 24px;
              line-height: 1.6rem;
              text-align: center;
              font-family: ${globals.headlineFont};
              color: black;
              padding: 0px 20px 5px 20px;
              margin: 0px;
            `}
          >
            {this.props.name}
          </h1>
          <div
            css={css`
              text-align: center;
              margin-bottom: 5px;
            `}
          >
            {this.props.twitter && (
              <SocialCircle
                url={"https://twitter.com/" + this.props.twitter}
                image={twitterImage}
                color="#00acee"
              />
            )}
            {this.props.email && (
              <SocialCircle
                url={"mailto:" + this.props.email}
                image={emailImage}
                color="#B23121"
              />
            )}
          </div>
        </div>
        <h3
          css={css`
            text-transform: uppercase;
            text-align: center;
            color: white;
            background-color: black;
            padding: 4px 0px;
            line-height: 1.6rem;
            margin: 0px;
            font-family: ${globals.menuFont};
          `}
        >
          {this.props.position}
        </h3>
      </div>
    );
  }
}
