require('dotenv').config({
  path: '.env',
});

const siteUrl = process.env.GATSBY_ROOT_URL || 'http://localhost:8000';

module.exports = {
  siteMetadata: {
    siteUrl,
    title: 'Personal Website',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        'data-theme': 'light',
        lang: 'en',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/showcase/*'],
        query: `
        {
          allSitePage(filter: {path: {regex: "/^(?!/showcase/).*$/"}}) {
            nodes {
              path
            }
          }
          allBlogPost: allMdx(internal: {contentFilePath: {regex: "/content\/blog/"}}) {
            nodes {
              frontmatter {
                updatedAt
                slug
              }
            }
          }
          allProjectPost: allMdx(internal: {contentFilePath: {regex: "/content\/project/"}}) {
            nodes {
              updatedAt
              slug
            }
          }
        }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage,
          allBlogPost,
          allProjectPost,
        }) => {
          const blogsAndProjects = {};
          allBlogPost.nodes.forEach((post) => {
            blogsAndProjects[`/blog/${post.slug}`] = { updatedAt: post.updatedAt };
          });
          allProjectPost.nodes.forEach((post) => {
            blogsAndProjects[`/project/${post.slug}`] = { updatedAt: post.updatedAt };
          });
          return allSitePage.nodes.map((page) => (
            { ...page, ...blogsAndProjects[page.path] }
          ));
        },
        serialize: ({ path, updatedAt }) => (
          {
            url: path,
            lastmod: updatedAt,
            changefreq: 'daily',
            priority: 0.7,
          }
        ),
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'tracedSVG',
          tracedSVGOptions: { color: '#2d6da6', background: '#e0f0fa', turdSize: 10 },
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        skipFileDownloads: true,
        apiURL: process.env.STRAPI_API_URL || 'http://localhost:1337',
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: ['gallery', 'social-media', 'single-page', 'small-text'],
        queryLimit: 200,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Timothy Newman Website',
        short_name: 'Timothy Newman',
        start_url: '/',
        theme_color: '#536f8a',
        background_color: '#536f8a',
        display: 'standalone',
        icon: './static/icons/android-chrome-512x512.png',
      },
    },
    {
      // Code adapted from https://github.com/LekoArts/gatsby-starter-minimal-blog/blob/master/gatsby-config.js
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { allBlogPost } }) => allBlogPost.nodes.map(
              (post) => {
                const url = `${siteUrl}/blog/${post.frontmatter.slug}`;
                const content = `<p>${post.frontmatter.summary}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /><br />`;
                const categoryArray = post.frontmatter.tags.map((tag) => ({ category: tag }));
                return {
                  title: post.frontmatter.title,
                  date: post.frontmatter.publishedAt,
                  description: post.frontmatter.summary,
                  url,
                  custom_elements: [{ 'content:encoded': content }, ...categoryArray],
                };
              },
            ),
            query: `
              {
                allBlogPost: allMdx(
                  sort: {frontmatter: {publishedAt: DESC}}
                  filter: {internal: {contentFilePath: {regex: "/content\/blog/"}}}
                  ) {
                  nodes {
                    frontmatter {
                      title
                      slug
                      summary
                      publishedAt(formatString: "MMMM DD, YYYY")
                      tags
                    }
                  }
                }
              }
            `,
            output: 'rss.xml',
            title: 'Timothy Newman Blog Feed',
            description: 'Blog mainly about technology and university experience',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
};
