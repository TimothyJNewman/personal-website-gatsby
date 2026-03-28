/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

/**
 * Extract EXIF data from photography images and create PhotographyPhoto nodes.
 */
exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  // Only process image files inside src/content/photography/
  if (
    node.internal.type !== 'File' ||
    !/\.(jpg|jpeg|png|tiff?)$/i.test(node.ext || '') ||
    !node.relativeDirectory?.startsWith('photography/')
  ) {
    return;
  }

  // relativeDirectory is relative to the content source root (src/content/)
  // e.g. "photography/london-2022" → albumSlug = "london-2022"
  const parts = node.relativeDirectory.split('/');
  const albumSlug = parts[1];
  if (!albumSlug) return;

  let exifData = {};
  try {
    const { default: exifr } = await import('exifr');
    exifData =
      (await exifr.parse(node.absolutePath, {
        pick: [
          'Make',
          'Model',
          'LensModel',
          'FNumber',
          'ExposureTime',
          'ISO',
          'ISOSpeedRatings',
          'FocalLength',
          'DateTimeOriginal',
          'GPSLatitude',
          'GPSLongitude',
        ],
      })) || {};
  } catch (_) {
    // Image has no EXIF data or EXIF parsing failed — continue with empty object
  }

  const camera =
    [exifData.Make, exifData.Model].filter(Boolean).join(' ').trim() || null;
  const iso = exifData.ISO ?? exifData.ISOSpeedRatings ?? null;

  const photoNode = {
    id: createNodeId(`PhotographyPhoto-${node.id}`),
    parent: node.id,
    children: [],
    albumSlug,
    filename: node.name,
    camera,
    lens: exifData.LensModel || null,
    aperture: exifData.FNumber ?? null,
    shutterSpeed: exifData.ExposureTime ?? null,
    iso: iso != null ? Number(iso) : null,
    focalLength: exifData.FocalLength ?? null,
    dateTaken: exifData.DateTimeOriginal?.toISOString?.() ?? null,
    latitude: exifData.GPSLatitude ?? null,
    longitude: exifData.GPSLongitude ?? null,
    internal: {
      type: 'PhotographyPhoto',
      contentDigest: createContentDigest({
        albumSlug,
        filename: node.name,
        exifData,
      }),
    },
  };

  createNode(photoNode);
  createParentChildLink({ parent: node, child: photoNode });
};

// Implement the Gatsby API "createPages". This is called once the
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

  // ── Photography ──────────────────────────────────────────────────────────────

  const photographyQuery = await graphql(`
    query {
      allPhotographyAlbum: allMdx(
        filter: { internal: { contentFilePath: { regex: "/content/photography/" } } }
        sort: { frontmatter: { publishedAt: DESC } }
      ) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      allPhotographyPhoto {
        nodes {
          albumSlug
          filename
        }
      }
    }
  `);

  if (photographyQuery.errors) {
    reporter.panicOnBuild('Error loading photography data', photographyQuery.errors);
  }

  const albumTemplate = path.resolve('src/templates/photography-album.js');
  photographyQuery.data.allPhotographyAlbum.nodes.forEach((node) => {
    createPage({
      path: `/photography/${node.frontmatter.slug}`,
      component: albumTemplate,
      context: { slug: node.frontmatter.slug },
    });
  });

  // Group photos by album for prev/next navigation context
  const photosByAlbum = {};
  photographyQuery.data.allPhotographyPhoto.nodes.forEach((photo) => {
    if (!photosByAlbum[photo.albumSlug]) photosByAlbum[photo.albumSlug] = [];
    photosByAlbum[photo.albumSlug].push(photo);
  });

  const photoTemplate = path.resolve('src/templates/photography-photo.js');
  Object.entries(photosByAlbum).forEach(([albumSlug, albumPhotos]) => {
    albumPhotos.forEach((photo, index) => {
      createPage({
        path: `/photography/${albumSlug}/${photo.filename}`,
        component: photoTemplate,
        context: {
          albumSlug,
          filename: photo.filename,
          prevPhoto: index > 0 ? albumPhotos[index - 1].filename : null,
          nextPhoto:
            index < albumPhotos.length - 1 ? albumPhotos[index + 1].filename : null,
        },
      });
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
      publishedAt: Date @dateformat
      updatedAt: Date @dateformat
      tags: [String]
      isArticle: Boolean
      preventIndexing: Boolean
      embeddedAssets: [File] @fileByRelativePath
      location: String
    }
    type PhotographyPhoto implements Node {
      albumSlug: String!
      filename: String!
      camera: String
      lens: String
      aperture: Float
      shutterSpeed: Float
      iso: Int
      focalLength: Float
      dateTaken: Date @dateformat
      latitude: Float
      longitude: Float
    }
  `)
}
