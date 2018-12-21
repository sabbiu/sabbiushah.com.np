import './footer.css'
import React from 'react'

import { rhythm } from '../utils/typography'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <div className="heart">❤</div>
        </div>
        <a
          href="https://twitter.com/sabbiushah"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/sabbiu"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
        &bull;{' '}
        {/* <a
          href="https://stackoverflow.com/users/6892277/sabbiu-shah"
          target="_blank"
          rel="noopener noreferrer">
          stack overflow
        </a> &bull;{' '} */}
        <a
          href="https://www.linkedin.com/in/sabbiu-shah/"
          target="_blank"
          rel="noopener noreferrer"
        >
          linked in
        </a>
      </footer>
    )
  }
}

export default Footer
