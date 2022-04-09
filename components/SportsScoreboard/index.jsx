import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default class SportsScoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        css={css`
          padding: 0;
          background: #fff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          display: inline-block;
        `}
      >
        <div
          css={css`
            left: 0;
            right: 0;

            margin: 0;
            padding: 4px 8px;

            min-height: 36px;
            background-color: #000;

            color: #fff;

            font-family: Source Sans Pro;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 36px; /* identical to box height */
          `}
        >
          {this.props.sport}
        </div>
        <div>
          <table
            css={css`
              font-size: 24px;
              width: 100%;
              text-align: left;
              table-layout: auto;
              border-collapse: collapse;
              border-style: hidden;
              border: none !important;
              color: #000;
            `}
          >
            <tr
              css={css`
                background-color: #efefef;
                font-weight: bold;
              `}
            >
              <td
                css={css`
                  padding: 0 8px;
                  border-right: 4px solid #fff;
                `}
              >
                {this.props.team1}
              </td>
              <td
                css={css`
                  width: 30px;
                  text-align: center;
                  padding: 0 5px;
                `}
              >
                {this.props.team1score}
              </td>
            </tr>
            <tr>
              <td
                css={css`
                  padding: 0 8px;
                `}
              >
                {this.props.team2}
              </td>
              <td
                css={css`
                  width: 30px;
                  text-align: center;
                  padding: 0 5px;
                `}
              >
                {this.props.team2score}
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
