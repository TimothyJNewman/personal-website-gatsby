/*
* Articles with tags
*/
import React from 'react'
import { Link, graphql } from 'gatsby'
import CoverImage from '../components/cover-image'
import { getFormattedDate, getFormattedLink } from '../util/CommonUtils'
import Layout from '../components/layout'
import LayoutSingleColumn from '../components/layout-single-column'
import Card from '../components/card'

const TagList = ({  pageContext, data }) => {

  return (
    <Layout>
      <LayoutSingleColumn>
        <CoverImage title={"Tag: " + pageContext.queryTag} desc={` | Projects: ${data.allStrapiProjectpost ? data.allStrapiProjectpost.nodes.length : 0} | Blog: ${data.allStrapiBlogpost ? data.allStrapiBlogpost.nodes.length : 0}`} />
        <div className="medium-col content-text">
          <h2 className="blog-postlist-title">Recent Projects</h2>
          {data.allStrapiProjectpost.nodes.length > 0
            ? <div className="card-container">
              {data.allStrapiProjectpost.nodes.map(posts => (
                <Link to={getFormattedLink("/projects/", posts.slug)} key={posts.id}>
                  <Card
                    img={posts.CoverImage ? posts.CoverImage.url : ""}
                    title={posts.title}
                    date={getFormattedDate(posts.published_at)}
                    description={posts.summary}
                    tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                    tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                    tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                  />
                </Link>
              ))}
            </div>
            : <p className="error-message">No projects found</p>
          }
          <p className="card-readmore">
            <Link to="/project">Explore all projects <i className="fa fa-arrow-right"></i></Link>
          </p>
        </div>
        <div className="medium-col content-text">
          <h2 className="blog-postlist-title">Recent Blog Posts</h2>
          {data.allStrapiBlogpost.nodes.length > 0
            ? <div className="card-container">
              {data.allStrapiBlogpost.nodes.map(posts => (
                <Link to={getFormattedLink("/blog/", posts.slug)} key={posts.id}>
                  <Card
                    title={posts.title}
                    date={getFormattedDate(posts.published_at)}
                    description={posts.summary}
                    tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                    tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                    tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                  />
                </Link>
              ))}
            </div>
            : <p className="error-message">No blog posts found</p>
          }
          <p className="card-readmore">
            <Link to="/blog">Read all blog posts <i className="fa fa-arrow-right"></i></Link>
          </p>
        </div>
        <div className="medium-col content-text">
          <h2 className="blog-postlist-title">All Tags</h2>
          <div className="card-tag-container-tagpage">
            {data.allStrapiTag.nodes
              ? data.allStrapiTag.nodes.map(elem => (
                <Link to={"/tag/" + elem.Tag} key={elem.Tag} className="card-tag-link">{elem.Tag}</Link>
              ))
              : <p className="error-message">No tags found</p>
            }
          </div>
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
}

export default TagList;

  // TODO work on querying images
export const query = graphql`
  query tagListQuery($queryTag: String!) {
    allStrapiBlogpost(
      sort: {fields: published_at, order: DESC}
      filter: {tags: {elemMatch: {Tag: {eq: $queryTag}}}}
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
      filter: {tags: {elemMatch: {Tag: {eq: $queryTag}}}}
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