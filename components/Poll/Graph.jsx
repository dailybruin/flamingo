import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as MainSiteStyles from '../globals'
import * as d3 from 'd3'
import Choice from './Choice'

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = { h: 200 }
    this.wrap = this.wrap.bind(this)
  }

   wrap(text, width) {
    let maxLines = 1
    text.each(function() {
      const t = d3.select(this)
      const words = t
        .text()
        .split(/\s+/)
        .reverse()
      let word
      let line = []
      let lineNumber = 1
      const y = t.attr('y')
      const dy = 10
      let tspan = t
        .text(null)
        .append('tspan')
        .attr('x', 0)
        .attr('y', y)
      word = words.pop()
      while (word) {
        line.push(word)
        tspan.text(line.join(' '))
        if (tspan.node().getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(' '))
          line = [word]
          tspan = t
            .append('tspan')
            .attr('x', 0)
            .attr('dy', dy + 'px')
            .text(word)
          lineNumber++
        }
        if (lineNumber > maxLines) {
          maxLines = lineNumber
        }
        word = words.pop()
      }
    })
    const newHeightValue = (maxLines - 2) * 35
    if (this.state.h !== 200 + newHeightValue) {
      this.setState({ h: this.state.h + newHeightValue })
    }
  }

   componentDidMount() {
    this.draw()
  }

   componentDidUpdate() {
    this.draw()
  }

   draw = () => {
    const data = [...this.props.data]
    data.sort((a, b) => a.votes - b.votes)

    const svg = d3.select(this.svg)
    const margin = { top: 15, right: 120, bottom: 0, left: 20 }
    const width = 225
    const height = this.state.h

    svg.selectAll('g').remove()

    const g = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.votes)])
      .rangeRound([0, width])

    const y = d3
      .scaleBand()
      .rangeRound([height, 0])
      .padding(1)
      .domain(data.map(d => d.choice))

    g.append('g')
      .call(d3.axisRight(y).tickSize(0))
      .attr('font-family', 'PT Serif')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('transform', 'translate(0, -15)')
      .selectAll('path')
      .attr('stroke', 'transparent')

    g.append('g')
      .call(d3.axisTop(x).tickSize(0))
      .attr('font-family', 'PT Serif')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('transform', 'translate(0, ' + (this.state.h - 200) / 10 + ')')
      .selectAll('path')

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('transform', 'translate(0, -25)')
      .attr('class', 'bar')
      .attr('y', d => y(d.choice))
      .attr('height', '3px')
      .style('fill', '#D14F83')
      .transition()
      .delay(250)
      .attr('width', d => x(d.votes))

    g.selectAll('.tick text').call(this.wrap, width)
  }

   render() {
    return (
      <div>
        <p
          css={css`
            font-family: ${MainSiteStyles.headlineFont}, serif;
            font-size: 10px;
            margin: -20px 0px 10px 155px;
          `}
        >
          *{this.props.legend}
        </p>
        <svg
          css={css`
            display: inline-block;
            height: ${this.state.h}px;
          `}
          ref={e => (this.svg = e)}
        />
      </div>
    )
  }
}

export default Graph
