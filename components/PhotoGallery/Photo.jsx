import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
          align-items: center;
          @media (max-width: 600px) {
            display: block;
            background-color: red;
            box-shadow: ${globals.cardShadow};
            margin-bottom: 12px;
          }
        `}
      >
        <div
          css={css`
            order: ${this.props.order};
          `}
        >
          <div
            css={css`
              margin: 6px;
              padding: 15px;
              box-shadow: ${globals.cardShadow};
              height: 100%;
              background-color: #fff;
              @media (max-width: 600px) {
                margin: 0;
                box-shadow: none;
              }
            `}
          >
            <img
              src={this.props.image}
              css={css`
                max-width: 100%;
                display: block;
                max-height: 80vh;
                min-height: 200px;
                @media (max-width: 600px) {
                  max-height: initial;
                  min-height: initial;
                }
              `}
            ></img>
          </div>
        </div>
        <div
          css={css`
            flex-shrink: 10000;
            @media (max-width: 600px) {
              width: 100%;
              margin: 0;
              display: block;
            }
          `}
        >
          <div
            css={css`
              min-width: 300px;
              max-width: 400px;
              padding: 20px;
              box-shadow: ${globals.cardShadow};
              margin: 6px;
              background-color: #fff;
              @media (max-width: 600px) {
                max-width: initial;
                min-width: initial;
                margin: 0;
                box-shadow: none;
              }
            `}
          >
            <p
              css={css`
                font-family: ${globals.bodyFont};
                font-weight: bold;
                margin-top: 0;
                font-size: 16px;
                line-height: 1.5;
              `}
              dangerouslySetInnerHTML={{ __html: this.props.caption }}
            />
            <h4
              css={css`
                font-family: ${globals.headlineFont};
                text-align: right;
                padding: 0;
                margin: 0;
                font-size: 14px;
              `}
              dangerouslySetInnerHTML={{ __html: this.props.credit }}
            />
          </div>
        </div>
      </div>
    );
  }
}
