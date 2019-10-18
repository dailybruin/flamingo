import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { css } from 'react-emotion'
import * as MainSiteStyles from '../../globals/mainsiteGlobalStyles'

interface ChoiceProps {
  choice: string
  votes: number
}

class Choice extends React.Component<ChoiceProps> {
  public state = {
    votes: this.props.votes,
  }

  constructor(props) {
    super(props)
  }

  public handleClick = () => {
    this.setState({ votes: this.state.votes + 1 })
    this.props.handler()
  }

  public render() {
    return (
      <div
        className={css`
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
          className={css`
            font-family: ${MainSiteStyles.storyListFont}, serif;
            font-size: 0.775rem;
            font-weight: 700;
            line-height: 1rem;
            margin: 0px 0px 3px;
          `}
        >
          <a onClick={this.handleClick}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className={css`
                margin-right: 10px;
              `}
            />
          </a>
          {this.props.choice}
        </p>
      </div>
    )
  }
}

export default Choice
