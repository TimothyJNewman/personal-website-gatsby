import { createRequire } from "module";
import remarkGfm from "remark-gfm";
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url)

require('dotenv').config({
  path: '.env',
});

const siteUrl = process.env.GATSBY_ROOT_URL || 'http://localhost:8000';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
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
          allBlogPost: allMdx(
            filter: {internal: {contentFilePath: {regex: "/content\/blog/"}}}
            sort: {frontmatter: {publishedAt: DESC}}
            ) {
            nodes {
              frontmatter {
                updatedAt
                slug
              }
            }
          }
          allProjectPost: allMdx(
            filter: {internal: {contentFilePath: {regex: "/content\/project/"}}}
            sort: {frontmatter: {publishedAt: DESC}}
            ) {
            nodes {
              frontmatter {
                updatedAt
                slug
              }
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
            blogsAndProjects[`/blog/${post.frontmatter.slug}`] = { updatedAt: post.frontmatter.updatedAt };
          });
          allProjectPost.nodes.forEach((post) => {
            blogsAndProjects[`/project/${post.frontmatter.slug}`] = { updatedAt: post.frontmatter.updatedAt };
          });
          return allSitePage.nodes.map((page) => (
            { ...page, ...blogsAndProjects[page.path] }
          ));
        },
        serialize: ({ pathFull, updatedAt }) => (
          {
            url: pathFull,
            lastmod: updatedAt,
            changefreq: 'daily',
            priority: 0.7,
          }
        ),
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'blurred',
        },
      },
    },
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [
          '.mdx',
        ],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            remarkGfm,
          ],
        },
        gatsbyRemarkPlugins: [
          {
            options: {
              maxWidth: 1080,
            },
            resolve: 'gatsby-remark-images',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
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
                      publishedAt
                      tags
                    }
                  }
                }
              }
            `,
            output: 'rss.xml',
            title: 'Timothy Newman Blog Feed',
            description: 'Blog mainly about technology and my university experience',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
};

export default config;
