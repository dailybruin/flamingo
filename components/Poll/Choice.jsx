// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as MainSiteStyles from '../globals'

class Choice extends React.Component {
   state = {
    votes: this.props.votes,
  }

  constructor(props) {
    super(props)
  }

   handleClick = () => {
    this.setState({ votes: this.state.votes + 1 })
    this.props.handler()
  }

   render() {
    return (
      <div
        css={css`
          padding: 5px 0px 5px;
          &:first-child {
            padding-top: 0px;
          }
          &:last-child {
            border-bottom: none;
            padding-bottom: 0px;
          }
        `}
      >
        <p
          css={css`
            font-family: ${MainSiteStyles.headlineFont}, serif;
            font-size: 0.775rem;
            font-weight: 700;
            line-height: 1rem;
            margin: 0px 0px 3px;
          `}
        >
          <a onClick={this.handleClick}>
          </a>
          {this.props.choice}
        </p>
      </div>
    )
  }
}

export default Choice
