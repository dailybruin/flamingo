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
          height: auto;
          display: flex;
        `}
      >
          <div css={css`
            float: left;
            padding: 5px;
            margin: 15px;
          `}>
          <img css={css`
            border-radius: 50%;
            max-width: 120px;   
              `}src={this.props.image} />
            <div css={css`
              text-align: center;`}>
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
          <h1
            css={css`
              font-weight: "bold";
              font-size: 24px;
              line-height: 1.6rem;
              text-align: left; 
              font-family: ${globals.headlineFont};
              color: black;
              padding: 15px 10px 0px 0px;
              margin: 0px;
            `}
          >
          {this.props.name} {" "}
          |{" "}{" "}{this.props.position}{" "}
          </h1>
          <h2 
            css={css`
              font-weight: normal;
              font-family: ${globals.headlineFont};
              text-align: left;
              font-size: 18px;
              padding: 0px 15px 15px 0px;
              overflow: hidden;
            `}dangerouslySetInnerHTML={{ __html: this.props.description }}/>
        </div>
      </div>
    );
  }
}
