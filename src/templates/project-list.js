/*
* Projectss list
*/
import React from 'react'
import { Link, graphql } from 'gatsby'
import CoverImage from '../components/cover-image'
import { getFormattedDate, getFormattedLink } from '../util/common-utils'
import Layout from '../components/layout'
import LayoutSingleColumn from '../components/layout-single-column'
import Card from '../components/card'

const ProjectList = ({ pageContext, data }) => {

  const { currentPage, numPages } = pageContext
  const prevPage =
    currentPage === 2
      ? "/project/"
      : currentPage === 1
        ? "/project/"
        : "/project/page/" + (currentPage - 1).toString()
  const nextPage =
    currentPage === numPages
      ? "/project/page/" + numPages.toString()
      : "/project/page/" + (currentPage + 1).toString()


  return (
    <Layout>
      <LayoutSingleColumn>
        <div className="medium-col">
          <CoverImage title="Recent Projects" />
          <br />
          <div className="card-container content-text">
            {data.allStrapiProjectpost.edges.length > 0
              ? data.allStrapiProjectpost.edges.map(posts => (
                <Link to={getFormattedLink("/project/", posts.node.slug)} key={posts.node.id}>
                  <Card
                    title={posts.node.title}
                    date={getFormattedDate(posts.node.published_at)}
                    description={posts.node.summary}
                    tag1={posts.node.tags[0] ? posts.node.tags[0].Tag : false}
                    tag2={posts.node.tags[1] ? posts.node.tags[1].Tag : false}
                    tag3={posts.node.tags[2] ? posts.node.tags[2].Tag : false}
                  />
                </Link>
              ))
              : <p className="error-message">No projects</p>
            }
          </div>
          <div className="posts-navigation-container">
            <Link to={prevPage} className="posts-navigation-button">
                <i className="fa fa-arrow-circle-left"></i> Prev
            </Link>
            {(() => {
              const items = [];
              for (var i = 1; i <= numPages; i++) {
                if (i === 1) {
                  items.push(
                    <Link to={"/project/"} className="posts-navigation-button" key={i}>
                      {i}
                    </Link>
                  )
                } else {
                  items.push(
                    <Link to={"/project/page/" + i} className="posts-navigation-button" key={i}>
                        {i}
                    </Link>
                  )
                }
              }
              return items;
            })()}
            <Link to={nextPage} className="posts-navigation-button">
                Next <i className="fa fa-arrow-circle-right"></i>
            </Link>
          </div>
        </div>
      </LayoutSingleColumn>
    </Layout>
  )
}

export default ProjectList;

export const query = graphql`
  query ProjectList($limit: Int!, $skip: Int!){
    allStrapiProjectpost(
      limit: $limit
      skip: $skip
      sort: {fields: published_at, order: DESC}
    ) {
      edges {
        node {
          id
          title
          slug
          coverimage {
            url
          }
          content
          summary
          published_at
          tags {
            Tag
          }
        }
      }
    }
  }
`;