/*
* Projects list
* Adapted from https://nickymeuleman.netlify.app/blog/gatsby-pagination
*/
import React from 'react';
import { Link, graphql } from 'gatsby';
import CoverImage from '../components/cover-image';
import { getFormattedDate, getFormattedLink } from '../util/common-utils';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import Card from '../components/card';

const ProjectList = ({ pageContext, data }) => {
  // variables for page navigation
  const { currentPage, numPages } = pageContext;
  let prevPage;
  if (currentPage === 2) prevPage = '/project';
  else if (currentPage === 1) prevPage = '/project';
  else prevPage = `/project/page/${currentPage - 1}`;
  let nextPage;
  if (currentPage === numPages && currentPage === 1) nextPage = '/project';
  else if (currentPage === numPages) nextPage = `/project/page/${numPages}`;
  else nextPage = `/project/page/${currentPage + 1}`;

  const seo = {
    metaTitle: 'Project Page',
    isArticle: false,
  };

  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <div className="max-w-screen-md px-2">
          <CoverImage title="Recent Projects" />
          <br />
          <section className="card-container">
            {data.allStrapiProjectpost.nodes.length > 0
              ? data.allStrapiProjectpost.nodes.map((posts) => (
                <Card
                  title={posts.title}
                  img={posts.coverimage ? posts.coverimage.localFile : ''}
                  alt={posts.coverimage.alternativeText}
                  date={getFormattedDate(posts.published_at)}
                  link={getFormattedLink('/project/', posts.slug)}
                  description={posts.summary}
                  tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                  tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                  tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                  key={posts.id}
                />
              ))
              : <p className="error-message">No projects</p>}
          </section>
          <nav className="text-sm max-w-screen-md flex justify-end m-4 mb-0">
            <Link to={prevPage} className="posts-navigation-button">
              <i className="fas fa-arrow-circle-left" />
              &nbsp;Prev
            </Link>
            {(() => {
              const items = [];
              for (let i = 1; i <= numPages; i++) {
                if (i === 1) {
                  items.push(
                    <Link to="/project" className="posts-navigation-button" key={i}>
                      {i}
                    </Link>,
                  );
                } else {
                  items.push(
                    <Link to={`/project/page/${i}`} className="posts-navigation-button" key={i}>
                      {i}
                    </Link>,
                  );
                }
              }
              return items;
            })()}
            <Link to={nextPage} className="posts-navigation-button">
              Next&nbsp;
              <i className="fas fa-arrow-circle-right" />
            </Link>
          </nav>
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default ProjectList;

export const query = graphql`
  query ProjectList($limit: Int!, $skip: Int!){
    allStrapiProjectpost(
      limit: $limit
      skip: $skip
      sort: {fields: published_at, order: DESC}
      filter: {published_at: {ne: null}}
    ) {
      nodes {
        id
        title
        slug
        coverimage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          alternativeText
        }
        content
        summary
        published_at
        tags {
          Tag
        }
        seo {
          metaTitle
          metaDescription
          isArticle
          shareImage {
            preventIndexing
            media {
              localFile {
                publicURL
              }
            }
          }
        }
      }
    }
  }
`;
