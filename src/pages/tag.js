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
    allStrapiTag {
      edges {
        node {
          Tag
        }
      }
    }
  }
`;

const TagPage = () => {
  const data = useStaticQuery(query);
  const seo = {
    metaTitle: 'Tag Page',
    isArticle: false,
  };
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <br />
        <section className="max-w-screen-md px-2">
          <CoverImage
            title="Tags"
          />
          <h2 className="my-4">All Tags</h2>
          <div className="flex flex-wrap">
            {data.allStrapiTag.edges
              ? data.allStrapiTag.edges.map((elem) => (
                <Link to={`/tag/${elem.node.Tag}`} key={elem.node.Tag} className="tag-button">{elem.node.Tag}</Link>
              ))
              : <p className="error-message">No tags found</p>}
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default TagPage;
