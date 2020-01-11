require(`dotenv`).config({
  path: `.env`
});

module.exports = {
  siteMetadata: {
    siteTitle: 'Sabbiu Shah',
    siteTitleAlt: `Sabbiu Shah`,
    siteHeadline: `Sabbiu Shah`,
    siteUrl: `https://sabbiushah.com.np`,
    // Used for SEO
    siteDescription: `Blog on AI, Maths, Economics and stuffs I like. Explained with code and visuals`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Twitter Handle
    author: `@sabbiushah`,
    navigation: [
      {
        title: `Blog`,
        slug: `/blog`
      }
    ],
    externalLinks: [
      {
        name: 'envelope',
        url: 'mailto:ssabbiu@gmail.com'
      },
      {
        name: 'github',
        url: 'https://github.com/sabbiu'
      },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/sabbiu-shah/'
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/SabbiuShah'
      },
      {
        name: 'stack-overflow',
        url: 'https://stackexchange.com/users/9281111/sabbiu-shah'
      }
    ],
    tagsPath: '/tags',
    basePath: '/',
    blogPath: '/blog',
    showLineNumbers: true
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        mdx: false
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sabbiu Shah`,
        short_name: `sabbiu`,
        description: `Sabbiu Shah Blog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-katex`
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-katex`
        ]
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `sabbiu-blog`
      }
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        googleAdClientId: process.env.GOOGLE_ADSENSE_TRACKING_ID,
        head: false // Optional
      }
    }
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ]
};
