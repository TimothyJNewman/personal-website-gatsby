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
    metaTitle: queryTag,
    isArticle: false,
  };
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <CoverImage
          title={`Tag: ${queryTag}`}
          desc={`
           | Projects: ${data.allStrapiProjectpost ? data.allStrapiProjectpost.edges.length : 0}
           | Blog: ${data.allStrapiBlogpost ? data.allStrapiBlogpost.edges.length : 0}
           `}
        />
        <br />
        {data.allStrapiProjectpost.edges.length > 0
          ? (
            <section className="medium-col content-text">
              <h2 className="blog-postlist-title">Recent Projects</h2>
              <div className="card-container">
                {data.allStrapiProjectpost.edges.map((posts) => (
                  <Card
                    img={posts.node.CoverImage ? posts.node.CoverImage.url : ''}
                    title={posts.node.title}
                    date={getFormattedDate(posts.node.published_at)}
                    link={getFormattedLink('/project/', posts.node.slug)}
                    description={posts.node.summary}
                    tag1={posts.node.tags[0] ? posts.node.tags[0].Tag : false}
                    tag2={posts.node.tags[1] ? posts.node.tags[1].Tag : false}
                    tag3={posts.node.tags[2] ? posts.node.tags[2].Tag : false}
                    key={posts.node.id}
                  />
                ))}
              </div>
              <p className="card-readmore">
                <Link to="/project">
                  Explore all projects&nbsp;
                  <i className="fa fa-arrow-right" />
                </Link>
              </p>
            </section>
          )
          : ''}
        {data.allStrapiBlogpost.edges.length > 0
          ? (
            <section className="medium-col content-text">
              <h2 className="blog-postlist-title">Recent Blog Posts</h2>
              <div className="card-container">
                {data.allStrapiBlogpost.edges.map((posts) => (
                  <Card
                    title={posts.title}
                    date={getFormattedDate(posts.node.published_at)}
                    link={getFormattedLink('/blog/', posts.node.slug)}
                    description={posts.summary}
                    tag1={posts.node.tags[0] ? posts.node.tags[0].Tag : false}
                    tag2={posts.node.tags[1] ? posts.node.tags[1].Tag : false}
                    tag3={posts.node.tags[2] ? posts.node.tags[2].Tag : false}
                    key={posts.node.id}
                  />
                ))}
              </div>
              <p className="card-readmore">
                <Link to="/blog">
                  Read all blog posts&nbsp;
                  <i className="fa fa-arrow-right" />
                </Link>
              </p>
            </section>
          )
          : ''}
        <section className="medium-col content-text">
          <h2 className="blog-postlist-title">All Tags</h2>
          <div className="card-tag-container-tagpage">
            {data.allStrapiTag.edges
              ? data.allStrapiTag.edges.map((elem) => (
                <Link to={`/tag/${elem.node.Tag}`} key={elem.node.Tag} className="card-tag-link">{elem.node.Tag}</Link>
              ))
              : <p className="error-message">No tags found</p>}
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default TagList;

// TODO work on querying images
export const query = graphql`
  query TagList($queryTag: String!) {
    allStrapiBlogpost(
      sort: {fields: published_at, order: DESC}
      filter: {tags: {elemMatch: {Tag: {eq: $queryTag}}}}
    ) {
      edges {
        node {
          id
          slug
          coverimage {
            localFile {
              publicURL
            }
          }
          title
          published_at
          summary
          tags {
            Tag
          }
        }
      }
    }
    allStrapiProjectpost(
      sort: {fields: published_at, order: DESC}
      filter: {tags: {elemMatch: {Tag: {eq: $queryTag}}}}
    ) {
      edges{
        node {
          id
          slug
          coverimage {
            localFile {
              publicURL
            }
          }
          title
          summary
          published_at
          tags {
            Tag
          }
        }
      }
    }
    allStrapiTag {
      edges {
        node {
          Tag
        }
      }
    }
  }
`;
