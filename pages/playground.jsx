import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import Link from 'next/link'

import InTheNews from '../components/InTheNews'

let news = [
  //<a href="https://dailybruin.com/2019/10/29/investigation-suggests-getty-fire-started-by-tree-branch-falling-on-power-lines/">Getty Fire</a>, 
  //<a href="https://dailybruin.com/2019/10/31/ucla-mens-soccer-to-face-three-games-it-must-win-to-qualify-for-the-ncaa/">Men's Soccer Championship</a>
  {
    name: "Getty Fire",
    href: "https://dailybruin.com/2019/10/29/investigation-suggests-getty-fire-started-by-tree-branch-falling-on-power-lines/"
  },
  {
    name: "Soccer",
    href: "https://dailybruin.com/2019/10/31/ucla-mens-soccer-to-face-three-games-it-must-win-to-qualify-for-the-ncaa/"
  }
]

export default class Playground extends Component {
  render() {
    return (
      <div style={{margin: "auto", maxWidth: "1236px"}}>
        <InTheNews stories={news}></InTheNews>
      </div>
    )
  }
}
