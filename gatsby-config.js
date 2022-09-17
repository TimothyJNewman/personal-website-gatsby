require('dotenv').config({
  path: '.env',
});

// const siteUrl = process.env.GATSBY_ROOT_URL || 'http://localhost:8000';

module.exports = {
  siteMetadata: {
    siteUrl: process.env.GATSBY_ROOT_URL || 'http://localhost:8000',
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
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {path: {regex: "/^(?!/showcase/).*$/"}}) {
            nodes {
              path
            }
          }
          allStrapiBlogPost {
            nodes {
              updated_at
              slug
            }
          }
          allStrapiProjectPost {
            nodes {
              updated_at
              slug
            }
          }
        }
        `,
        resolveSiteUrl: ({ site: { siteMetadata: { siteUrl } } }) => siteUrl,
        resolvePages: ({
          allSitePage,
          allStrapiBlogPost,
          allStrapiProjectPost,
        }) => {
          const blogsAndProjects = {};
          allStrapiBlogPost.nodes.forEach((post) => {
            blogsAndProjects[`/blog/${post.slug}`] = { updatedAt: post.updated_at };
          });
          allStrapiProjectPost.nodes.forEach((post) => {
            blogsAndProjects[`/project/${post.slug}`] = { updatedAt: post.updated_at };
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
        collectionTypes: [{ singularName: 'project-post', queryParams: { populate: 'deep,10' } }, { singularName: 'blog-post', queryParams: { populate: 'deep,10' } }, 'gallery', 'tag', 'social-media', 'single-page', 'small-text'],
        singleTypes: ['global'],
        queryLimit: 200,
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
        query: `
          {
            site {
              siteMetadata {
                siteUrl
                description
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allStrapiBlogPost } }) => allStrapiBlogPost.nodes.map(
              (post) => {
                const url = `${site.siteMetadata.siteUrl}/blog/${post.slug}`;
                const content = `<p>${post.summary}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /><br />`;
                const categoryArray = post.tags.map((tag) => ({ category: tag.Tag }));
                return {
                  title: post.title,
                  date: post.publishedAt,
                  description: post.summary,
                  url,
                  custom_elements: [{ 'content:encoded': content }, ...categoryArray],
                };
              },
            ),
            query: `
              {
                allStrapiBlogPost(
                  sort: {order: DESC, fields: publishedAt}
                  filter: {publishedAt: {ne: null}}
                ) {
                  nodes {
                    title
                    slug
                    summary
                    publishedAt(formatString: "MMMM DD, YYYY")
                    tags {
                      Tag
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
