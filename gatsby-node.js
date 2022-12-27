/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogQuery = await graphql(`
    query {
      allBlogPost: allMdx(
        filter: {internal: {contentFilePath: {regex: "/content\/blog/"}}}
        sort: {frontmatter: {publishedAt: DESC}}
        ) {
        nodes {
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
    `)

  if (blogQuery.errors) {
    reporter.panicOnBuild('Error loading MDX result', blogQuery.errors)
  }

  const blogPosts = blogQuery.data.allBlogPost.nodes;

  const blogTemplate = path.resolve('src/templates/blog.js');

  // Create pages for each article.
  blogPosts.forEach((node) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: `${blogTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
  // Create blog-list pages
  const blogPostsPerPage = 4;
  const blogNumPages = Math.ceil(blogPosts.length / blogPostsPerPage);
  Array.from({ length: blogNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/blog' : `/blog/page/${i + 1}`,
      component: path.resolve('./src/templates/blog-list.js'),
      context: {
        limit: blogPostsPerPage,
        skip: i * blogPostsPerPage,
        blogNumPages,
        currentPage: i + 1,
      },
    });
  });

  const projectQuery = await graphql(`
    query {
      allProjectPost: allMdx(
        filter: {internal: {contentFilePath: {regex: "/content\/project/"}}}
        sort: {frontmatter: {publishedAt: DESC}}
        ) {
        nodes {
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
    `)

  if (projectQuery.errors) {
    reporter.panicOnBuild('Error loading MDX result', projectQuery.errors)
  }

  const projectPosts = projectQuery.data.allProjectPost.nodes;

  const projectTemplate = path.resolve('src/templates/project.js');

  // Create pages for each article.
  projectPosts.forEach((node) => {
    createPage({
      path: `/project/${node.frontmatter.slug}`,
      component: `${projectTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
  // Create project-list pages
  const projectPostsPerPage = 4;
  const projectNumPages = Math.ceil(projectPosts.length / projectPostsPerPage);
  Array.from({ length: projectNumPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/project' : `/project/page/${i + 1}`,
      component: path.resolve('./src/templates/project-list.js'),
      context: {
        limit: projectPostsPerPage,
        skip: i * projectPostsPerPage,
        projectNumPages,
        currentPage: i + 1,
      },
    });
  });

  // // Create about page
  // createPage({
  //   path: '/about',
  //   component: path.resolve('./src/templates/project-list.js'),
  // });

  const tagQuery = await graphql(`
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

  if (tagQuery.errors) {
    reporter.panicOnBuild('Error loading MDX result', tagQuery.errors)
  }

  const allTag = tagQuery.data.allTag.nodes.reduce(
    (acc, { frontmatter: { tags } }) => [...new Set([...acc, ...tags])], [],
  ).sort();

  // Create pages for each article.
  allTag.forEach((tag) => {
    createPage({
      path: `/tag/${tag}`,
      component: path.resolve('src/templates/tag-list.js'),
      context: {
        queryTag: tag,
      },
    });
  });

  // Query for articles nodes to use in creating pages.
  return [blogPosts, projectPosts, allTag];
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      slug: String
      title: String
      coverImage: File @fileByRelativePath
      summary: String
      keywords: String
      publishedAt:  Date
      updatedAt: Date
      tags: [String]
      isArticle: Boolean
      preventIndexing: Boolean
      embeddedAssets: [File] @fileByRelativePath
    }
  `)
}
