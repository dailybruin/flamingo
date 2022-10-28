import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Heart from './Heart'
import toSentence from '../../utils/toSentence'

/** A footer to go at the bottom of every page. */
class Footer extends React.Component {
  defaultProps = {
    license: License.Copyright,
  }

  render() {
    return (
      <footer
        css={css`
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          justify-content: center;
          margin: 1rem 0;
          padding: 0 0.4rem;
          text-align: center;

          @media (max-width: 600px) {
            font-size: 0.8rem;
          }
          ${this.props.style};
        `}
      >
        <div>
          <span>
            Content copyright © {this.props.copyrightYear} Daily Bruin.
          </span>{' '}
          {!!this.props.githubName && (
            <span
              css={css`
                @media (max-width: 600px) {
                  display: none;
                }
              `}
            >
              Site code available on{' '}
              <a
                href={`https://github.com/dailybruin/${this.props.githubName}`}
              >
                GitHub
              </a>
              {this.props.license === License.Copyright
                ? '.'
                : ` and available under the ${this.props.license}.`}
            </span>
          )}
        </div>
        <div>
          Built with Joyce's <Heart /> in Kerckhoff 118 by{' '}
          {typeof this.props.developers === 'string'
            ? this.props.developers
            : toSentence(this.props.developers)}
          .
        </div>
      </footer>
    )
  }
}

export default Footer
