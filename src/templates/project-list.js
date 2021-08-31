/*
* Projectss list
*/
import React from 'react'
import { Link, graphql } from 'gatsby'
import CoverImage from '../components/cover-image'
import { getFormattedDate, getFormattedLink } from '../util/CommonUtils'
import Layout from '../components/layout'
import LayoutSingleColumn from '../components/layout-single-column'
import Card from '../components/card'

const ProjectList = ({ pageContext, data }) => {

  const { currentPage, numPages, limit } = pageContext
  const prevPage = currentPage - 1 === 1 ? "/project/" : "/project/page/"+(currentPage - 1).toString()
  const nextPage = "/project/page/"+(currentPage + 1).toString()

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
            <button className="posts-navigation-button"><Link to={prevPage}><i className="fa fa-arrow-circle-left"></i> Prev</Link></button>
            {() => {
              const items = [];
              for (var i = 1; i <= Math.ceil(numPages / limit); i++) {
                items.push(
                  <button className="posts-navigation-button" key={i}>
                    <Link to={"/project/page/"+i}>{i}</Link>
                  </button>
                )
              }
            }}
            <button className="posts-navigation-button"><Link to={nextPage}>Next <i className="fa fa-arrow-circle-right"></i></Link></button>
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