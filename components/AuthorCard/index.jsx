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
          @media (max-width: 600px) {
            width: 24px;
            height: 24px;
            margin: 3px;
          }
        `}
      >
        <img
          css={css`
            width: 36px;
            padding: 8px;
            height: auto;
            @media (max-width: 600px) {
              width: 24px;
              height: 24px;
              padding: 6px;
            }
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
          height: auto;
          border-top: 7px solid #000;
          padding: ${globals.cardPadding};
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={css`
              margin: 5px 15px;
            `}
          >
            <img
              css={css`
                border-radius: 50%;
                max-width: 120px;
                @media (max-width: 600px) {
                  max-width: 60px;
                }
              `}
              src={this.props.image}
            />
            <div
              css={css`
                text-align: center;
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
          <div>
            <div
              css={css`
                font-weight: "bold";
                font-size: 24px;
                text-align: left;
                font-family: ${globals.headlineFont};
                color: black;
                margin: 0px;
              `}
            >
              <a
                css={css`
                  color: #000;
                `}
                href={this.props.link}
              >
                {this.props.name}
              </a>
              <span
                css={css`
                  @media (max-width: 600px) {
                    display: none;
                  }
                `}
              >
                {this.props.position == undefined || this.props.position == ""
                  ? ""
                  : " | "}
              </span>
              <span
                css={css`
                  font-family: ${globals.bodyFont};
                  font-size: 16px;

                  @media (max-width: 600px) {
                    display: block;
                  }
                `}
              >
                {this.props.position}
              </span>
            </div>
            <div
              css={css`
                font-family: ${globals.bodyFont};
                font-weight: 300;
                text-align: left;
                padding: 15px 15px 5px 0px;
                font-size: 12px;
                @media (max-width: 600px) {
                  display: none;
                }
              `}
              dangerouslySetInnerHTML={{ __html: this.props.description }}
            />
          </div>
        </div>
        <div
          css={css`
            font-family: ${globals.bodyFont};
            font-weight: 300;
            text-align: left;
            padding: 0px 15px 5px 0px;
            font-size: 12px;
            display: none;
            @media (max-width: 600px) {
              display: block;
            }
          `}
          dangerouslySetInnerHTML={{ __html: this.props.description }}
        />
      </div>
    );
  }
}
