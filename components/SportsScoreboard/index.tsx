import * as React from 'react'
import { css } from 'react-emotion'

interface SportsScoreboardProps {
  sport: string
  team1: string
  team1score: number
  team2: string
  team2score: number
}

export default class SportsScoreboard extends React.Component<
  SportsScoreboardProps
> {
  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div
        className={css`
          padding: 0;
          background: #ffffff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          display: inline-block;
        `}
      >
        <div
          className={css`
            left: 0;
            right: 0;

            margin: 0;
            padding: 4px 8px;

            min-height: 36px;
            background-color: #000000;

            color: #ffffff;

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
            className={css`
              font-size: 24px;
              width: 100%;
              text-align: left;
              table-layout: auto;
              border-collapse: collapse;
              border-style: hidden;
              border: none !important;
              color: #000000;
            `}
          >
            <tr
              className={css`
                background-color: #efefef;
                font-weight: bold;
              `}
            >
              <td
                className={css`
                  padding: 0 8px;
                  border-right: 4px solid #ffffff;
                `}
              >
                {this.props.team1}
              </td>
              <td
                className={css`
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
                className={css`
                  padding: 0 8px;
                `}
              >
                {this.props.team2}
              </td>
              <td
                className={css`
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
    )
  }
}
