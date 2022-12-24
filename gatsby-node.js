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
      allBlogPost: allMdx(
        filter: {internal: {contentFilePath: {regex: "/content\/blog/"}}}
        ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
    `)
    .then((result) => {
      // Create pages for each article.
      result.data.allBlogPost.nodes.forEach((node) => {
        createPage({
          path: `/blog/${node.frontmatter.slug}`,
          component: path.resolve('src/templates/blog.js'),
          context: {
            slug: node.frontmatter.slug,
          },
        });
      });
      // Create blog-list pages
      const posts = result.data.allBlogPost.nodes;
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
      allProjectPost: allMdx(
        filter: {internal: {contentFilePath: {regex: "/content\/project/"}}}
        ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
    `)
    .then((result) => {
      // Create pages for each article.
      result.data.allProjectPost.nodes.forEach((node) => {
        createPage({
          path: `/project/${node.frontmatter.slug}`,
          component: path.resolve('src/templates/project.js'),
          context: {
            slug: node.frontmatter.slug,
          },
        });
      });
      // Create project-list pages
      const posts = result.data.allProjectPost.nodes;
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
      allTag: allMdx(
        filter: {internal: {contentFilePath: {regex: "/content/"}}, frontmatter: {tags: {ne: null}}}
      ) {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
    `)
    .then((result) => {
      const allTag = result.data.allTag.nodes.reduce(
        (acc, { frontmatter: {tags} }) => [...acc,...tags], [],
      );
      return allTag;
    }).then((result) => {
      // Create pages for each article.
      result.forEach((tag) => {
        createPage({
          path: `/tag/${tag}`,
          component: path.resolve('src/templates/tag-list.js'),
          context: {
            queryTag: tag,
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
