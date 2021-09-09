/*
* Blogs list
* Adapted from https://nickymeuleman.netlify.app/blog/gatsby-pagination
*/
import React from 'react';
import { Link, graphql } from 'gatsby';
import CoverImage from '../components/cover-image';
import { getFormattedDate, getFormattedLink } from '../util/common-utils';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import Card from '../components/card';

const BlogList = ({ pageContext, data }) => {
  // variables for page navigation
  const { currentPage, numPages } = pageContext;
  let prevPage;
  if (currentPage === 2) prevPage = '/blog';
  else if (currentPage === 1) prevPage = '/blog';
  else prevPage = `/blog/page/${currentPage - 1}`;
  let nextPage;
  if (currentPage === numPages && currentPage === 1) nextPage = '/blog';
  else if (currentPage === numPages) nextPage = `/blog/page/${numPages}`;
  else nextPage = `/blog/page/${currentPage + 1}`;

  const seo = {
    metaTitle: 'Blog Page',
    isArticle: false,
  };

  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <div className="medium-col">
          <CoverImage title="Recent Blog Posts" />
          <br />
          <div className="card-container content-text">
            {data.allStrapiBlogpost.edges.length > 0
              ? data.allStrapiBlogpost.edges.map((posts) => (
                <Card
                  title={posts.node.title}
                  date={getFormattedDate(posts.node.published_at)}
                  link={getFormattedLink('/blog/', posts.node.slug)}
                  description={posts.node.summary}
                  tag1={posts.node.tags[0] ? posts.node.tags[0].Tag : false}
                  tag2={posts.node.tags[1] ? posts.node.tags[1].Tag : false}
                  tag3={posts.node.tags[2] ? posts.node.tags[2].Tag : false}
                  key={posts.node.id}
                />
              ))
              : <p className="error-message">No blog posts found</p>}
          </div>
          <div className="posts-navigation-container">
            <Link to={prevPage} className="posts-navigation-button">
              <i className="fa fa-arrow-circle-left" />
              &nbsp;Prev
            </Link>
            {(() => {
              const items = [];
              for (let i = 1; i <= numPages; i++) {
                if (i === 1) {
                  items.push(
                    <Link to="/blog/" className="posts-navigation-button" key={i}>
                      {i}
                    </Link>,
                  );
                } else {
                  items.push(
                    <Link to={`/blog/page/${i}`} className="posts-navigation-button" key={i}>
                      {i}
                    </Link>,
                  );
                }
              }
              return items;
            })()}
            <Link to={nextPage} className="posts-navigation-button">
              Next&nbsp;
              <i className="fa fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default BlogList;

export const query = graphql`
  query BlogList($limit: Int!, $skip: Int!){
    allStrapiBlogpost(
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
            isArticle
            metaDescription
            metaTitle
            keywords
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
  }
`;
