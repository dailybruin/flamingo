import * as React from 'react'
import { css } from 'emotion'

/**
 * Heart.
 */
export default function Heart(props: {}) {
  return (
    <span
      className={css`
        &:hover {
          color: red;
          cursor: default;
        }
      `}
    >
      ♥
    </span>
  )
}
