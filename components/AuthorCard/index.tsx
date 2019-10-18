import * as React from 'react'
import { css } from 'emotion'
import * as MainSiteStyles from '../globals'
import emailImage from './email.png'
import twitterImage from './twitter.png'

/**
 * Author Card properties.
 */
interface AuthorCardProps {
  /** Link to image of author. */
  image: string
  /** Author's full name. */
  name: string
  /** Author's position/title. */
  position: string
  /** Author's twitter handle e.g. "uclachancellor" */
  twitter?: string
  /** Author's email address e.g. "chancellor@ucla.edu". */
  email?: string
}

interface SocialCircleProps {
  url: string
  image: string
}

const SocialCircle: React.SFC<SocialCircleProps> = props => {
  return (
    <a href={props.url}>
      <div
        className={css`
          background-color: ${MainSiteStyles.lightGray};
          border-style: solid;
          border-width: 0.5px;
          border-radius: 50%;
          border-color: ${MainSiteStyles.gray};
          height: 35px;
          width: 35px;
          margin: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img
          className={css`
            width: 70%;
            height: auto;
          `}
          src={props.image}
        />
      </div>
    </a>
  )
}

/** An author card. */
export default class AuthorCard extends React.Component<AuthorCardProps> {
  public render() {
    return (
      <div
        className={css`
          background-color: white;
          box-shadow: ${MainSiteStyles.cardShadow};
        `}
      >
        <div
          className={css`
            height: 100%;
            display: block;
          `}
        >
          <div
            className={css`
              width: 80%;
              display: block;
              margin: auto;
            `}
          >
            <img
              className={css`
                border-radius: 50%;
                margin: auto;
                padding-top: 20px;
                width: 100%;
                height: auto;
              `}
              src={this.props.image}
            />
          </div>
          <h1
            className={css`
              font-style: 'bold';
              font-size: 24px;
              line-height: 1.6rem;
              text-align: center;
              font-family: ${MainSiteStyles.headlineFont};
              color: black;
              padding: 0px 20px 5px 20px;
              margin: 0px;
            `}
          >
            {this.props.name}
          </h1>
          <div
            className={css`
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            {this.props.twitter && (
              <SocialCircle
                url={'https://twitter.com/' + this.props.twitter}
                image={twitterImage}
              />
            )}
            {this.props.email && (
              <SocialCircle
                url={'mailto:' + this.props.email}
                image={emailImage}
              />
            )}
          </div>
        </div>
        <h3
          className={css`
            text-transform: uppercase;
            text-align: center;
            color: white;
            background-color: black;
            padding: 4px 0px;
            line-height: 1.6rem;
            margin: 0px;
            font-family: ${MainSiteStyles.menuFont};
          `}
        >
          {this.props.position}
        </h3>
      </div>
    )
  }
}
