import * as React from 'react'
import { render } from 'react-dom'

import Vert from './Vert'
import Horz from './Horz'
import Long from './Long'
import Full from './Full'
import Mini from './Mini'

export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let card
    switch (this.props.displayType) {
      case 'vert':
        card = <Vert {...this.props} />
        break
      case 'horz':
        card = <Horz {...this.props} />
        break
      case 'long':
        card = <Long {...this.props} />
        break
      case 'full':
        card = <Full {...this.props} />
        break
      case 'mini':
        card = <Mini {...this.props} />
        break
      default:
        card = <Horz {...this.props} />
    }
    return card;
  }
}
