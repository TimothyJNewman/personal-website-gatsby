/*
 * This is a page to display all blogs and projects with a specified tag
 */
import React from 'react';
import { Link, graphql } from 'gatsby';
import CoverImage from '../components/cover-image';
import { getFormattedDate, getFormattedLink } from '../util/common-utils';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import Card from '../components/card';

const TagList = ({ pageContext, data }) => {
  const { queryTag } = pageContext;
  const seo = {
    metaTitle: `Tag: ${queryTag}`,
    isArticle: false,
  };
  const allTag = data.allTag.nodes.reduce(
    (acc, { frontmatter: { tags } }) => [...new Set([...acc, ...tags])], [],
  ).sort();
  console.log(data)
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <div className="max-w-screen-md px-2">
          <CoverImage
            title={`Tag: ${queryTag}
            / projects: ${data.allProjectPost
                ? data.allProjectPost.nodes.length
                : 0
              }
            / blogs: ${data.allBlogPost ? data.allBlogPost.nodes.length : 0
              }
           `}
          />
          {data.allProjectPost.nodes.length > 0 ? (
            <>
              <h2 className="my-4 font-normal font-serif">Recent Projects</h2>
              <div className="grid-cols-1 md:grid-cols-2 grid gap-4">
                {data.allProjectPost.nodes.map((posts) => (
                  <Card
                    img={posts.frontmatter.coverImage ?? ''}
                    title={posts.frontmatter.title}
                    date={getFormattedDate(posts.frontmatter.publishedAt)}
                    link={getFormattedLink('/project/', posts.frontmatter.slug)}
                    description={posts.frontmatter.summary}
                    tag1={posts.frontmatter.tags[0] ?? false}
                    tag2={posts.frontmatter.tags[1] ?? false}
                    tag3={posts.frontmatter.tags[2] ?? false}
                    key={posts.frontmatter.slug}
                  />
                ))}
              </div>
              <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
                <Link to="/project" className="read-more-link">
                  Explore all projects&nbsp;
                  <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </>
          ) : (
            ''
          )}
          {data.allBlogPost.nodes.length > 0 ? (
            <>
              <h2 className="my-4 font-normal font-serif">Recent Blog Posts</h2>
              <div className="grid-cols-1 md:grid-cols-2 grid gap-4">
                {data.allBlogPost.nodes.map((posts) => (
                  <Card
                    img={posts.frontmatter.coverImage ?? ''}
                    title={posts.frontmatter.title}
                    date={getFormattedDate(posts.frontmatter.publishedAt)}
                    link={getFormattedLink('/blog/', posts.frontmatter.slug)}
                    description={posts.frontmatter.summary}
                    tag1={posts.frontmatter.tags[0] ?? false}
                    tag2={posts.frontmatter.tags[1] ?? false}
                    tag3={posts.frontmatter.tags[2] ?? false}
                    key={posts.frontmatter.slug}
                  />
                ))}
              </div>
              <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
                <Link to="/blog" className="read-more-link">
                  Read all blog posts&nbsp;
                  <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </>
          ) : (
            ''
          )}
          <h2 className="my-4 font-normal font-serif">All Tags</h2>
          <div className="flex flex-wrap">
            {allTag ? (
              allTag.map((tag) => (
                <Link
                  to={`/tag/${tag}`}
                  key={tag}
                  className="tag-button"
                >
                  {tag}
                </Link>
              ))
            ) : (
              <p className="error-message">No tags found</p>
            )}
          </div>
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default TagList;

// TODO work on querying images
export const query = graphql`
  query TagList($queryTag: String!) {
    allBlogPost: allMdx(
      filter: {
        internal: {contentFilePath: {regex: "/content\/blog/"}}
        frontmatter: {tags: { in: [$queryTag] }}
      }
      sort: {frontmatter: {publishedAt: DESC}}
    ) {
      nodes {
        frontmatter {
          slug
          coverImage{
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          title
          publishedAt
          summary
          tags
        }
      }
    }
    allProjectPost: allMdx(
      filter: {
        internal: {contentFilePath: {regex: "/content\/project/"}}
        frontmatter: {tags: { in: [$queryTag] }}
      }
      sort: {frontmatter: {publishedAt: DESC}}
    ) {
      nodes {
        frontmatter {
          slug
          coverImage{
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          title
          publishedAt
          summary
          tags
        }
      }
    }
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
`;
