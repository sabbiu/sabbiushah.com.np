import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import get from 'lodash/get'
import moment from 'moment'

import Bio from '../components/bio'
import Layout from '../components/layout'
import Content, { HTMLContent } from '../components/Content'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'

const GITHUB_USERNAME = 'sabbiu'
const GITHUB_REPO_NAME = 'sabbiushah.com.np'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  date,
  title,
  helmet,
  editOnGithub,
  timeToRead,
  footerStuffs,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section>
      {helmet || ''}
      <h1>{title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: 'block',
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {moment(new Date(date)).format('MMMM D, YYYY')}
        {` • ${timeToRead || ''} min read`}
      </p>
      <PostContent content={content} />
      {editOnGithub || ''}
      <div className="content">
        <ul className="taglist-blog">
          <li>
            <strong>Tags:</strong>
          </li>
          {tags.map(tag => (
            <li key={tag}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
      {footerStuffs || ''}
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = props => {
  const post = props.data.markdownRemark
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const { previous, next, slug } = props.pageContext
  const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/content/blog/${slug.replace(
    /\//g,
    ''
  )}.md`

  return (
    <Layout location={props.location} title={siteTitle}>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.spoiler}
            slug={post.fields.slug}
            keywords={post.frontmatter.tags}
          />
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        timeToRead={post.timeToRead}
        editOnGithub={
          <p>
            <a href={editUrl} target="_blank" rel="noopener noreferrer">
              Edit on GitHub
            </a>
          </p>
        }
        footerStuffs={
          <div>
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <h3
              style={{
                fontFamily: 'Montserrat, sans-serif',
                marginTop: rhythm(0.25),
              }}
            >
              <Link
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: '#F47C48',
                }}
                to={'/'}
              >
                {siteTitle}
              </Link>
            </h3>
            <Bio />

            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </div>
        }
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
        tags
      }
      fields {
        slug
      }
    }
  }
`

/*

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next, slug } = this.props.pageContext
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/content/blog/${slug.replace(
      /\//g,
      ''
    )}.md`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
          keywords={post.frontmatter.tags}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
          {` • ${post.timeToRead} min read`}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <p>
          <a href={editUrl} target="_blank" rel="noopener noreferrer">
            Edit on GitHub
          </a>
        </p>
        <div className="content">
          <ul className="taglist-blog">
            <li>
              <strong>Tags:</strong>
            </li>
            {post.frontmatter.tags.map(tag => (
              <li key={tag}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: rhythm(0.25),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: '#F47C48',
            }}
            to={'/'}
          >
            {siteTitle}
          </Link>
        </h3>
        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}
*/
