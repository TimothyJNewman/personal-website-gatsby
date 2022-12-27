/*
 * Articles tags
 */
import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import CoverImage from '../components/cover-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';

const query = graphql`
  query Tag {
    allTag: allMdx(
      filter: {internal: {contentFilePath: {regex: "/content/"}}, frontmatter: {tags: {ne: null}}}
    ) {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`;

const TagPage = () => {
  const data = useStaticQuery(query);
  const seo = {
    title: 'Tag Page',
    isArticle: false,
  };
  const allTag = data.allTag.nodes.reduce(
    (acc, { frontmatter: {tags} }) => [...new Set([...acc,...tags])], [],
  ).sort();
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <br />
        <section className="max-w-screen-md px-2">
          <CoverImage title="Tags" />
          <h2 className="my-4 font-normal font-serif">All Tags</h2>
          <div className="flex flex-wrap">
            {allTag ? (
              allTag.map((tag) => (
                <Link
                  to={`/tag/${tag}`}
                  key={tag}
                  className="tag-button"
                >
                  {tag}
                </Link>
              ))
            ) : (
              <p className="error-message">No tags found</p>
            )}
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default TagPage;
