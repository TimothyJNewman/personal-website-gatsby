/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then((result) => {
      if (result.errors) {
        reject(result.errors);
      }
      return result;
    }),
  );
});

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getBlogsAndBlogsList = makeRequest(graphql, `
    {
      allStrapiBlogpost {
        edges {
          node {
            slug
          }
        }
      }
    }
    `)
    .then((result) => {
      // Create pages for each article.
      result.data.allStrapiBlogpost.edges.forEach(({ node }) => {
        createPage({
          path: `/blog/${node.slug}`,
          component: path.resolve('src/templates/blog.js'),
          context: {
            slug: node.slug,
          },
        });
      });
      // Create blog-list pages
      const posts = result.data.allStrapiBlogpost.edges;
      const postsPerPage = 4;
      const numPages = Math.ceil(posts.length / postsPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? '/blog' : `/blog/page/${i + 1}`,
          component: path.resolve('./src/templates/blog-list.js'),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        });
      });
    });

  const getProjectsAndProjectsList = makeRequest(graphql, `
    {
      allStrapiProjectpost {
        edges {
          node {
            slug
          }
        }
      }
    }
    `)
    .then((result) => {
      // Create pages for each article.
      result.data.allStrapiProjectpost.edges.forEach(({ node }) => {
        createPage({
          path: `/project/${node.slug}`,
          component: path.resolve('src/templates/project.js'),
          context: {
            slug: node.slug,
          },
        });
      });
      // Create blog-list pages
      const posts = result.data.allStrapiProjectpost.edges;
      const postsPerPage = 4;
      const numPages = Math.ceil(posts.length / postsPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? '/project' : `/project/page/${i + 1}`,
          component: path.resolve('./src/templates/project-list.js'),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        });
      });
    });

  const getTags = makeRequest(graphql, `
    {
      allStrapiTag {
        edges {
          node {
            Tag
          }
        }
      }
    }
    `)
    .then((result) => {
      // Create pages for each article.
      result.data.allStrapiTag.edges.forEach(({ node }) => {
        createPage({
          path: `/tag/${node.Tag}`,
          component: path.resolve('src/templates/tag-list.js'),
          context: {
            queryTag: node.Tag,
          },
        });
      });
    });

  // Query for articles nodes to use in creating pages.
  return Promise.all([
    getBlogsAndBlogsList,
    getProjectsAndProjectsList,
    getTags,
  ]);
};
