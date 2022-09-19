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
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <div className="max-w-screen-md px-2">
          <CoverImage
            title={`Tag: ${queryTag}
            / projects: ${
              data.allStrapiProjectPost
                ? data.allStrapiProjectPost.nodes.length
                : 0
            }
            / blogs: ${
              data.allStrapiBlogPost ? data.allStrapiBlogPost.nodes.length : 0
            }
           `}
          />
          {data.allStrapiProjectPost.nodes.length > 0 ? (
            <>
              <h2 className="my-4">Recent Projects</h2>
              <div className="card-container">
                {data.allStrapiProjectPost.nodes.map((posts) => (
                  <Card
                    img={posts.CoverImage ? posts.CoverImage.url : ''}
                    title={posts.title}
                    date={getFormattedDate(posts.publishedAt)}
                    link={getFormattedLink('/project/', posts.slug)}
                    description={posts.summary}
                    tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                    tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                    tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                    key={posts.id}
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
          {data.allStrapiBlogPost.nodes.length > 0 ? (
            <>
              <h2 className="my-4">Recent Blog Posts</h2>
              <div className="card-container">
                {data.allStrapiBlogPost.nodes.map((posts) => (
                  <Card
                    title={posts.title}
                    date={getFormattedDate(posts.publishedAt)}
                    link={getFormattedLink('/blog/', posts.slug)}
                    description={posts.summary}
                    tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                    tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                    tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                    key={posts.id}
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
          <h2 className="my-4">All Tags</h2>
          <div className="flex flex-wrap">
            {data.allStrapiTag.nodes ? (
              data.allStrapiTag.nodes.map((elem) => (
                <Link
                  to={`/tag/${elem.Tag}`}
                  key={elem.Tag}
                  className="tag-button"
                >
                  {elem.Tag}
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
    allStrapiBlogPost(
      sort: { fields: publishedAt, order: DESC }
      filter: {
        tags: { elemMatch: { Tag: { eq: $queryTag } } }
        publishedAt: { ne: null }
      }
    ) {
      nodes {
        id
        slug
        coverimage {
          localFile {
            publicURL
          }
        }
        title
        publishedAt
        summary
        tags {
          Tag
        }
      }
    }
    allStrapiProjectPost(
      sort: { fields: publishedAt, order: DESC }
      filter: {
        tags: { elemMatch: { Tag: { eq: $queryTag } } }
        publishedAt: { ne: null }
      }
    ) {
      nodes {
        id
        slug
        coverimage {
          localFile {
            publicURL
          }
        }
        title
        summary
        publishedAt
        tags {
          Tag
        }
      }
    }
    allStrapiTag {
      nodes {
        Tag
      }
    }
  }
`;
