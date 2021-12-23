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
        <section className="max-w-3xl mx-auto text-left px-2">
          <CoverImage
            title={`Tag: ${queryTag}`}
            desc={`
           | Projects: ${data.allStrapiProjectpost ? data.allStrapiProjectpost.nodes.length : 0}
           | Blog: ${data.allStrapiBlogpost ? data.allStrapiBlogpost.nodes.length : 0}
           `}
          />
        </section>
        {data.allStrapiProjectpost.nodes.length > 0
          ? (
            <section className="max-w-3xl px-2">
              <h2 className="my-4">Recent Projects</h2>
              <div className="card-container">
                {data.allStrapiProjectpost.nodes.map((posts) => (
                  <Card
                    img={posts.CoverImage ? posts.CoverImage.url : ''}
                    title={posts.title}
                    date={getFormattedDate(posts.published_at)}
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
            </section>
          )
          : ''}
        {data.allStrapiBlogpost.nodes.length > 0
          ? (
            <section className="max-w-3xl px-2">
              <h2 className="my-4">Recent Blog Posts</h2>
              <div className="card-container">
                {data.allStrapiBlogpost.nodes.map((posts) => (
                  <Card
                    title={posts.title}
                    date={getFormattedDate(posts.published_at)}
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
            </section>
          )
          : ''}
        <section className="max-w-3xl px-2">
          <h2 className="my-4">All Tags</h2>
          <div className="flex flex-wrap">
            {data.allStrapiTag.nodes
              ? data.allStrapiTag.nodes.map((elem) => (
                <Link to={`/tag/${elem.Tag}`} key={elem.Tag} className="text-sm m-0.5 p-1 hover:bg-transparent focus:bg-transparent border-2 border-transparent hover:border-primary-dark focus:border-primary-dark text-std-secondary bg-primary-dark rounded">{elem.Tag}</Link>
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
      filter: {tags: {elemMatch: {Tag: {eq: $queryTag}}}, published_at: {ne: null}}
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
        published_at
        summary
        tags {
          Tag
        }
      } 
    }
    allStrapiProjectpost(
      sort: {fields: published_at, order: DESC}
      filter: {tags: {elemMatch: {Tag: {eq: $queryTag}}}, published_at: {ne: null}}
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
        published_at
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
