import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import profilePic from '../../content/assets/cropped2.jpg'
import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: 'flex',
              marginBottom: rhythm(2.5),
            }}
          >
            <img
              src={profilePic}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                width: rhythm(2),
                height: rhythm(2),
                borderRadius: '100%',
              }}
            />
            {/* <p style={{maxWidth: 180}}>
              Personal blog by <a href={`https://twitter.com/${social.twitter}`}>
                me
              </a>.{' '}
              AI explained visually
            </p> */}
            <p style={{ maxWidth: 400 }}>
              Blog on AI, Maths, Economics and stuffs I like. Explained with
              code and visuals
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
