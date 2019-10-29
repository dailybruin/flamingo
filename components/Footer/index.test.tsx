import * as React from 'react'
import { render, cleanup } from 'react-testing-library'
import Footer from '.'

describe('Footer', () => {
  afterEach(cleanup)

  it('Matches its snapshot', () => {
    const { container } = render(
      <Footer
        githubName="lux"
        developers={['Nathan Smith']}
        copyrightYear={2018}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
