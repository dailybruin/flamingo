import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as MainSiteStyles from "../globals";
import emailImage from "./email.png";
import twitterImage from "./twitter.png";

function SocialCircle(props) {
  return (
    <a href={props.url}>
      <div
        css={css`
          background-color: ${MainSiteStyles.lightGray};
          border-style: solid;
          border-width: 0.5px;
          border-radius: 50%;
          border-color: ${MainSiteStyles.gray};
          height: 35px;
          width: 35px;
          margin: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img
          css={css`
            width: 70%;
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
          box-shadow: ${MainSiteStyles.cardShadow};
        `}
      >
        <div
          css={css`
            height: 100%;
            display: block;
          `}
        >
          <div css={css`
              padding: 20px;`}>
          <div
            css={css`
              padding-top: 100%;
              width: 100%;
              overflow: hidden;
              position: relative;
              border-radius: 50%;
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
              font-family: ${MainSiteStyles.headlineFont};
              color: black;
              padding: 0px 20px 5px 20px;
              margin: 0px;
            `}
          >
            {this.props.name}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            {this.props.twitter && (
              <SocialCircle
                url={"https://twitter.com/" + this.props.twitter}
                image={twitterImage}
              />
            )}
            {this.props.email && (
              <SocialCircle
                url={"mailto:" + this.props.email}
                image={emailImage}
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
            font-family: ${MainSiteStyles.menuFont};
          `}
        >
          {this.props.position}
        </h3>
      </div>
    );
  }
}
