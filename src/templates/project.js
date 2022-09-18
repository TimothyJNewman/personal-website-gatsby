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
  <Layout seo={data.strapiProjectPost.seo}>
    <LayoutSingleColumn>
      <section className="max-w-screen-md mx-auto text-left px-2">
        {data.strapiProjectPost.coverimage
          ? (
            <CoverImage
              img={data.strapiProjectPost.coverimage ? data.strapiProjectPost.coverimage.localFile : ''}
              alt={data.strapiProjectPost.coverimage.alternativeText}
              title={data.strapiProjectPost.title}
            />
          )
          : <CoverImage title={data.strapiProjectPost.title} />}
        <div className="py-1">
          <div className="py-2 flex justify-between items-start">
            <div className="m-0 text-sm italic text-dategray article-date-container">
              <strong>Published:&nbsp;</strong>
              {getFormattedDate(data.strapiProjectPost.publishedAt)}
              <strong>Updated:&nbsp;</strong>
              {getFormattedDate(data.strapiProjectPost.updatedAt)}
            </div>
            <Share label="Share this!" text={data.strapiProjectPost.summary} title={data.strapiProjectPost.title} />
          </div>
          <div className="flex">
            {data.strapiProjectPost.tags.map((elem) => (
              <Link className="tag-button" to={`/tag/${elem.Tag}`} key={elem.Tag}>{elem.Tag}</Link>
            ))}
          </div>
        </div>
        <div className="markdown-text">
          <MarkdownView
            markdown={data.strapiProjectPost.content.data.content}
            options={{ emoji: true, strikethrough: true }}
          />
        </div>
        <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
          <Link to="/project" className="read-more-link">
            Explore all projects&nbsp;
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </section>
    </LayoutSingleColumn>
  </Layout>
);

export default ProjectTemplate;

export const query = graphql`
  query ProjectTemplate ($slug: String!){
    strapiProjectPost( 
      slug: {eq: $slug }
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
        content {
          data {
            content
          }
        }
        summary
        publishedAt
        updatedAt
        tags {
          Tag
        }
        seo {
          metaTitle
          metaDescription
          isArticle
          preventIndexing
          shareImage {
            localFile {
              publicURL
            }
          }
        }
      }
    }
  `;
