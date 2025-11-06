import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Image from "next/image";

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
          @media (max-width: 800px) {
            display: block;
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
              height: 100%;
              @media (max-width: 800px) {
                margin: 0;
              }
            `}
          >
            <Image
              src={this.props.image}
              alt={this.props.caption || "Gallery photo"}
              width={1200}
              height={800}
              layout="intrinsic"
              sizes="(max-width: 800px) 100vw, 80vw"
              loading="lazy"
              style={{ maxWidth: "100%", display: "block", maxHeight: "80vh", minHeight: "200px", height: "auto" }}
            />
          </div>
        </div>
        <div
          css={css`
            flex-shrink: 10000;
            @media (max-width: 800px) {
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
              margin: 6px;
              background-color: #fff;
              @media (max-width: 800px) {
                max-width: initial;
                min-width: initial;
                margin: 0;
                box-shadow: none;
                padding: 10px;
              }
            `}
          >
            <p
              css={css`
                font-family: ${globals.bodyFont};
                font-weight: 400;
                margin-top: 0;
                font-size: 16px;
                line-height: 1.5;
              `}
              dangerouslySetInnerHTML={{ __html: this.props.caption }}
            />
            <h4
              css={css`
                font-family: ${globals.bodyFont};
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
