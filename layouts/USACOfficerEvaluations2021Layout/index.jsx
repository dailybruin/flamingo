import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../../components/globals";
import style from "../style.module.css";

export default class USACOfficerEvaluations2021Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderedPosts = [];
    for (let i in this.props.posts) {
      renderedPosts.push(
        <a
          key={i}
          css={css`
            ${globals.cardStyles};
            color: black;
            display: table;
            min-height: 100px;
            position: relative;
            margin: 10px 0;
            display: inline-block;
            padding: 0;

            &:hover {
              text-decoration: none;
            }
          `}
          href={"/post/" + this.props.posts[i].slug}
        >
          <div
            src={
              this.props.posts[i]._embedded["wp:featuredmedia"] != undefined
                ? this.props.posts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : null
            }
            css={css`
              width: 100px;
              height: 100px;
              display: table-cell;
              background-image: url(${this.props.posts[i]._embedded[
                "wp:featuredmedia"
              ] != undefined
                ? this.props.posts[i]._embedded["wp:featuredmedia"][0]
                    .source_url
                : ""});
              background-size: cover;
              background-position: center;
            `}
          />
          <div
            css={css`
              display: table-cell;
              vertical-align: middle;
              text-align: left;
              padding-left: 10px;
              font-family: ${globals.bodyFont};
            `}
          >
            <div
              css={css`
                font-weight: 700;
                font-size: 16px;
              `}
              dangerouslySetInnerHTML={{
                __html: this.props.posts[i].title.rendered
                  .replace("USAC Officer Evaluation: ", "")
                  .replace(/,.*$/, "")
              }}
            />
            <div
              css={css`
                font-weight: 400;
                font-size: 14px;
              `}
              dangerouslySetInnerHTML={{
                __html: this.props.posts[i].title.rendered
                  .replace("USAC Officer Evaluation: ", "")
                  .replace(/([^,]+),/, "")
              }}
            />
          </div>
        </a>
      );
    }
    return (
      <div className={style.card}>
        <div
          css={css`
            ${globals.cardStyles}
          `}
        >
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              ${globals.phone} {
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                flex-grow: 1;
                font-family: ${globals.headlineFont};
                padding: 20px;
                line-height: 1;

                h1,
                h6 {
                  margin: 0;
                }
              `}
            >
              <h6>DAILY BRUIN</h6>
              <h1
                css={css`
                  font-family: ${globals.headlineFont};
                  font-size: 60px;
                  font-weight: 400;
                  ${globals.phone} {
                    font-size: 50px;
                  }
                `}
              >
                USAC Officer Evaluations
              </h1>
              <h6
                css={css`
                  font-family: ${globals.menuFont};
                  font-weight: 400;
                  font-size: 20px;
                `}
              >
                2020 - 2022
              </h6>
            </div>
            <div
              css={css`
                flex-grow: 1;
                font-family: ${globals.bodyFont};
                padding: 20px;
                border-left: 1px solid #000;
                line-height: 1.5;
                font-size: 14px;
                ${globals.phone} {
                  border: none;
                  padding: 10px;
                }
              `}
            >
              <p
                css={css`
                  font-style: italic;
                `}
              >
                hi
              </p>
              
              
            </div>
          </div>
          <div
            css={css`
              column-count: 2;
              column-gap: 40px;
              max-width: 1000px;
              margin: auto;
              padding: 20px 20px 0;

              ${globals.phone} {
                column-count: 1;
              }
            `}
          >
            {renderedPosts}
          </div>
        </div>
      </div>
    );
  }
}
