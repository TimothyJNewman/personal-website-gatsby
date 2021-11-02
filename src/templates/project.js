/*
* Individual project post
*/
import React from 'react';
import { Link, graphql } from 'gatsby';
import MarkdownView from 'react-showdown';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';
import Share from '../components/share';
import { getFormattedDate } from '../util/common-utils';

const ProjectTemplate = ({ data }) => (
  <Layout seo={data.strapiProjectpost.seo}>
    <LayoutSingleColumn>
      {data.strapiProjectpost.coverimage
        ? (
          <CoverImage
            img={data.strapiProjectpost.coverimage ? data.strapiProjectpost.coverimage.localFile : ''}
            alt={data.strapiProjectpost.coverimage.alternativeText}
            title={data.strapiProjectpost.title}
          />
        )
        : <CoverImage title={data.strapiProjectpost.title} />}
      <section className="medium-col content-wrapper content-text">
        <div className="article-date-and-tags">
          <div className="article-date-share-button">
            <div className="article-date-container">
              <strong>Published:&nbsp;</strong>
              {getFormattedDate(data.strapiProjectpost.published_at)}
              <strong>Updated:&nbsp;</strong>
              {getFormattedDate(data.strapiProjectpost.updated_at)}
            </div>
            <Share label="Share this!" text={data.strapiProjectpost.summary} title={data.strapiProjectpost.title} />
          </div>
          <div className="card-tag-container-tagpage">
            {data.strapiProjectpost.tags.map((elem) => (
              <Link className="card-tag-link" to={`/tag/${elem.Tag}`} key={elem.Tag}>{elem.Tag}</Link>
            ))}
          </div>
        </div>
        <div className="markdown-text">
          <MarkdownView
            markdown={data.strapiProjectpost.content}
            options={{ emoji: true, strikethrough: true }}
          />
        </div>
      </section>
      <div className="read-more-container">
        <Link to="/project" className="read-more-link">
          Explore all projects&nbsp;
          <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </LayoutSingleColumn>
  </Layout>
);

export default ProjectTemplate;

export const query = graphql`
  query ProjectTemplate ($slug: String!){
    strapiProjectpost( 
      slug: {eq: $slug }
      published_at: {gt: "1970-01-01T00:00:00Z"}
      ) {
        id
        coverimage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          alternativeText
        }
        title
        content
        summary
        published_at
        updated_at
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
  `;
