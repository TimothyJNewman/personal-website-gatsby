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
import ArticleCard from '../components/article-card';

const BlogList = ({ pageContext, data }) => {
  // variables for page navigation
  const { currentPage, blogNumPages } = pageContext;
  let prevPage;
  if (currentPage === 2) prevPage = '/blog';
  else if (currentPage === 1) prevPage = '/blog';
  else prevPage = `/blog/page/${currentPage - 1}`;
  let nextPage;
  if (currentPage === blogNumPages && currentPage === 1) nextPage = '/blog';
  else if (currentPage === blogNumPages) nextPage = `/blog/page/${blogNumPages}`;
  else nextPage = `/blog/page/${currentPage + 1}`;

  const seo = {
    title: 'Blog Page',
    isArticle: false,
  };

  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <div className="lg:w-[54rem] px-2 lg:px-0">
          <CoverImage title="Recent Blog Posts" />
          <br />
          <section className="grid-cols-1 md:grid-cols-1 grid gap-4">
            {data.allBlogPost.nodes.length > 0 ? (
              data.allBlogPost.nodes
                .sort((a, b) => (b.frontmatter.publishedAt - a.frontmatter.publishedAt))
                .map((posts) => (
                  <ArticleCard
                    title={posts.frontmatter.title}
                    img={posts.frontmatter?.coverImage?.childImageSharp?.gatsbyImageData ?? ''}
                    date={getFormattedDate(posts.frontmatter.publishedAt)}
                    link={getFormattedLink('/blog/', posts.frontmatter.slug)}
                    description={posts.frontmatter.summary}
                    tags={posts.frontmatter.tags}
                    key={posts.frontmatter.slug}
                  />
                ))
            ) : (
              <p className="error-message">No blog posts found</p>
            )}
          </section>
          <nav className="m-4 mb-0 flex max-w-screen-md justify-end text-sm">
            <Link to={prevPage} className="posts-navigation-button">
              <i className="fas fa-arrow-circle-left" />
              &nbsp;Prev
            </Link>
            {(() => {
              const items = [];
              for (let i = 1; i <= blogNumPages; i++) {
                if (i === 1) {
                  items.push(
                    <Link
                      to="/blog"
                      className="posts-navigation-button"
                      key={i}
                    >
                      {i}
                    </Link>
                  );
                } else {
                  items.push(
                    <Link
                      to={`/blog/page/${i}`}
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

export default BlogList;

export const query = graphql`
  query BlogList($limit: Int!, $skip: Int!) {
    allBlogPost: allMdx(
      limit: $limit
      skip: $skip
      sort: {frontmatter: {publishedAt: DESC}}
      filter: {internal: {contentFilePath: {regex: "/content\/blog/"}}}
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
