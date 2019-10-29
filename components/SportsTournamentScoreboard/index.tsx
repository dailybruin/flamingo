import * as React from 'react'
import { css } from 'react-emotion'

import Scoreboard from './Scoreboard'

interface Game {
  team1: string
  team1score: number
  team2: string
  team2score: number
}

interface ScoreboardProps {
  game: Game
}

interface SportsTournamentScoreboardProps {
  sport: string
  gametype: string
  games: Game[]
}

export default class SportsTournamentScoreboard extends React.Component<
  SportsTournamentScoreboardProps
> {
  public static defaultProps = { gametype: 'GAME' }
  constructor(props) {
    super(props)
  }

  public render() {
    const scoreboards = []
    let i = 0
    for (const game of this.props.games) {
      i++
      scoreboards.push(<Scoreboard game={game} num={i} />)
    }
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
        <div>{scoreboards}</div>
      </div>
    )
  }
}
