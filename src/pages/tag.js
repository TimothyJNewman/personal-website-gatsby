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
        <CoverImage
          title="Tags"
        />
        <br />
        <section className="medium-col content-text">
          <h2 className="blog-postlist-title">All Tags</h2>
          <div className="card-tag-container-tagpage">
            {data.allStrapiTag.edges
              ? data.allStrapiTag.edges.map((elem) => (
                <Link to={`/tag/${elem.node.Tag}`} key={elem.node.Tag} className="card-tag-link">{elem.node.Tag}</Link>
              ))
              : <p className="error-message">No tags found</p>}
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default TagPage;
