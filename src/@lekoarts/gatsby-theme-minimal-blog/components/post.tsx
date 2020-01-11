/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout';
import ItemTags from '@lekoarts/gatsby-theme-minimal-blog/src/components/item-tags';
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo';
import useSiteMetadata from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata';

import { Disqus } from 'gatsby-plugin-disqus';

type PostProps = {
  data: {
    post: {
      slug: string;
      title: string;
      date: string;
      tags?: {
        name: string;
        slug: string;
      }[];
      description?: string;
      body: string;
      excerpt: string;
      timeToRead: number;
      banner?: {
        childImageSharp: {
          resize: {
            src: string;
          };
        };
      };
    };
  };
};

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map(v => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const Post = ({ data: { post } }: PostProps) => {
  const { siteUrl, blogPath } = useSiteMetadata();
  let disqusConfig = {
    url: `${siteUrl}${blogPath}${post.slug}`,
    identifier: post.slug,
    title: post.title
  };

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.description ? post.description : post.excerpt}
        image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
      />
      <Styled.h2>{post.title}</Styled.h2>
      <p
        sx={{
          color: `secondary`,
          mt: 3,
          a: { color: `secondary` },
          fontSize: [1, 1, 2]
        }}
      >
        <time>{post.date}</time>
        {post.tags && (
          <React.Fragment>
            {` — `}
            <ItemTags tags={post.tags} />
          </React.Fragment>
        )}
        {` — `}
        <span>{post.timeToRead} min read</span>
      </p>
      <section
        sx={{
          my: 5,
          '.gatsby-resp-image-wrapper': {
            my: [4, 4, 5],
            boxShadow: shadow.join(`, `)
          }
        }}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </section>
      {/* <CommentCount config={disqusConfig} placeholder={'...'} /> */}
      <Disqus config={disqusConfig} />
    </Layout>
  );
};

export default Post;
