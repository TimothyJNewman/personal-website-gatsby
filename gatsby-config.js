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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: false,
        // Setting this parameter is also optional
        respectDNT: false,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        // pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        // defer: false,
        // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
        // defaults to false
        // enableWebVitalsTracking: true,
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
          allSitePage {
            nodes {
              path
            }
          }
          allStrapiBlogpost {
            nodes {
              updated_at
              slug
            }
          }
          allStrapiProjectpost {
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
          allStrapiBlogpost,
          allStrapiProjectpost,
        }) => {
          const blogsAndProjects = {};
          allStrapiBlogpost.nodes.forEach((post) => {
            blogsAndProjects[`/blog/${post.slug}`] = { updatedAt: post.updated_at };
          });
          allStrapiProjectpost.nodes.forEach((post) => {
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
        apiURL: process.env.GATSBY_API_URL || 'http://localhost:1337',
        collectionTypes: ['projectpost', 'blogpost', 'gallery', 'tag', 'socialMedia', 'single-pages', 'small-text'],
        singleTypes: ['global'],
        queryLimit: 200,
        loginData: {
          identifier: process.env.API_USERNAME,
          password: process.env.API_PWD,
        },
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
            serialize: ({ query: { site, allStrapiBlogpost } }) => allStrapiBlogpost.nodes.map(
              (post) => {
                const url = `${site.siteMetadata.siteUrl}/blog/${post.slug}`;
                const content = `<p>${post.summary}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /><br />`;
                const categoryArray = post.tags.map((tag) => ({ category: tag.Tag }));
                return {
                  title: post.title,
                  date: post.published_at,
                  description: post.summary,
                  url,
                  custom_elements: [{ 'content:encoded': content }, ...categoryArray],
                };
              },
            ),
            query: `
              {
                allStrapiBlogpost(sort: {order: DESC, fields: published_at}) {
                  nodes {
                    title
                    slug
                    summary
                    published_at(formatString: "MMMM DD, YYYY")
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
