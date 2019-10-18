import * as React from 'react'
import { css } from 'react-emotion'
import * as MainSiteStyles from '../../globals/mainsiteGlobalStyles'
import Choice from './Choice'
import Question from './Question'
import Graph from './Graph'

/**
 * Poll Properties
 */

interface PollProps {
  /** A list of the choices. */
  poll: ChoiceProps[]
  /** Poll question. */
  question: string
  /** Graph legend. */
  legend: string
}

class Poll extends React.Component<PollProps> {
  public state = {
    hasVoted: false,
  }

  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  public handler() {
    this.setState({
      hasVoted: true,
    })
  }

  public render() {
    const renderedChoices = this.props.poll.map((poll, index) => (
      <Choice
        choice={poll.choice}
        votes={poll.votes}
        key={index}
        handler={this.handler}
      />
    ))

    return (
      <div
        className={css`
          background-color: ${MainSiteStyles.white};
          box-shadow: ${MainSiteStyles.cardShadow};
          justify-content: center;
          margin: auto;
          max-width: 292px;
        `}
      >
        <div
          className={css`
            background-color: ${MainSiteStyles.black};
            padding: 2px 0px 4px 10px;
          `}
        >
          <h2
            className={css`
              color: ${MainSiteStyles.white};
              font-family: ${MainSiteStyles.topBarFont}, sans-serif;
              font-size: 1.125rem;
              font-weight: 900;
              line-height: 1.4375rem;
              margin: 0px;
              overflow-wrap: break-word;
            `}
          >
            {'POLL'}
          </h2>
        </div>
        <Question text={this.props.question} />
        <div
          className={css`
            padding: ${MainSiteStyles.cardInnerPadding};
          `}
        >
          {!this.state.hasVoted && renderedChoices}
          {this.state.hasVoted && (
            <Graph data={this.props.poll} legend={this.props.legend} />
          )}
        </div>
      </div>
    )
  }
}

export default Poll
