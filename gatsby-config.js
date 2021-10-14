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
    /* {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        // TODO add more pages to exclude
        excludes: ['/404/'],
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
            { ...page }
          ));
        },
        serialize: ({ path }) => (
          {
            url: path,
          }
        ),
      },
    }, */
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-207541314-1',
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
        // TODO add more pages to exclude
        excludes: ['/404/'],
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
          tracedSVGOptions: { color: '#653815', background: '#fbf3ed', turdSize: 10 },
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
        theme_color: '#653815',
        background_color: '#653815',
        display: 'standalone',
        icon: './src/images/icons/android-chrome-512x512.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
