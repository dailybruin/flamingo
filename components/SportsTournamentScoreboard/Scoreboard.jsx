import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <table
        className={css`
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
          className={css`
            background-color: #c4c4c4;
            font-weight: bold;
          `}
        >
          <td
            className={css`
              text-transform: uppercase;
              font-size: 14px;
              width: 10px;
              overflow: visible;
              white-space: nowrap;
              word-wrap: nowrap;
              transform: rotate(-90deg);
              padding: 0;
              margin: 0;
              border-top: 2px solid #fff;
            `}
            rowspan="2"
          >
            Game {this.props.num}
          </td>
          <td
            className={css`
              padding: 0 8px;
              border-right: 4px solid #fff;
              background-color: #efefef;
            `}
          >
            {this.props.game.team1}
          </td>
          <td
            className={css`
              width: 30px;
              text-align: center;
              padding: 0 5px;
              background-color: #efefef;
            `}
          >
            {this.props.game.team1score}
          </td>
        </tr>
        <tr className={css``}>
          <td
            className={css`
              padding: 0 8px;
            `}
          >
            {this.props.game.team2}
          </td>
          <td
            className={css`
              width: 30px;
              text-align: center;
              padding: 0 5px;
            `}
          >
            {this.props.game.team2score}
          </td>
        </tr>
      </table>
    )
  }
}
