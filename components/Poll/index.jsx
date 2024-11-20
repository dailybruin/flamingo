import * as React from 'react'
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/core'
import * as MainSiteStyles from '../globals'
import Choice from './Choice'
import Question from './Question'
import Graph from './Graph'

class Poll extends React.Component {
   state = {
    hasVoted: false,
  }

  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

   handler() {
    this.setState({
      hasVoted: true,
    })
  }

   render() {
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
        css={css`
          background-color: ${MainSiteStyles.white};
          box-shadow: ${MainSiteStyles.cardShadow};
          justify-content: center;
          margin: auto;
          max-width: 292px;
        `}
      >
        <div
          css={css`
            background-color: ${MainSiteStyles.black};
            padding: 2px 0px 4px 10px;
          `}
        >
          <h2
            css={css`
              color: ${MainSiteStyles.white};
              font-family: ${MainSiteStyles.menuFont}, sans-serif;
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
          css={css`
            padding: ${MainSiteStyles.cardPadding};
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
