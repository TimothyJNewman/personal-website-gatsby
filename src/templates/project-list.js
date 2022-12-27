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
  const { currentPage, projectNumPages } = pageContext;
  let prevPage;
  if (currentPage === 2) prevPage = '/project';
  else if (currentPage === 1) prevPage = '/project';
  else prevPage = `/project/page/${currentPage - 1}`;
  let nextPage;
  if (currentPage === projectNumPages && currentPage === 1) nextPage = '/project';
  else if (currentPage === projectNumPages) nextPage = `/project/page/${projectNumPages}`;
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
          <section className="grid-cols-1 md:grid-cols-2 grid gap-4">
            {data.allProjectPost.nodes.length > 0 ? (
              data.allProjectPost.nodes.map((posts) => (
                <Card
                  title={posts.frontmatter.title}
                  img={posts.frontmatter?.coverImage?.childImageSharp?.gatsbyImageData ?? ''}
                  date={getFormattedDate(posts.frontmatter.publishedAt)}
                  link={getFormattedLink('/project/', posts.frontmatter.slug)}
                  description={posts.frontmatter.summary}
                  tag1={posts.frontmatter.tags[0] ?? false}
                  tag2={posts.frontmatter.tags[1] ?? false}
                  tag3={posts.frontmatter.tags[2] ?? false}
                  key={posts.frontmatter.slug}
                />
              ))
            ) : (
              <p className="error-message">No projects</p>
            )}
          </section>
          <nav className="m-4 mb-0 flex max-w-screen-md justify-end text-sm">
            <Link to={prevPage} className="posts-navigation-button">
              <i className="fas fa-arrow-circle-left" />
              &nbsp;Prev
            </Link>
            {(() => {
              const items = [];
              for (let i = 1; i <= projectNumPages; i++) {
                if (i === 1) {
                  items.push(
                    <Link
                      to="/project"
                      className="posts-navigation-button"
                      key={i}
                    >
                      {i}
                    </Link>
                  );
                } else {
                  items.push(
                    <Link
                      to={`/project/page/${i}`}
                      className="posts-navigation-button"
                      key={i}
                    >
                      {i}
                    </Link>
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
  query ProjectList($limit: Int!, $skip: Int!) {
    allProjectPost: allMdx(
      limit: $limit
      skip: $skip
      sort: {frontmatter: {publishedAt: DESC}}
      filter: {internal: {contentFilePath: {regex: "/content\/project/"}}}
    ) {
      nodes {
        frontmatter {
          title
          slug
          coverImage{
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          summary
          publishedAt
          updatedAt
          tags
        }
      }
    }
  }
`;
