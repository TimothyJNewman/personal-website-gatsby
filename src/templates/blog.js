/*
* Individual blog post
*/
import React from 'react';
import { Link, graphql } from 'gatsby';
import MarkdownView from 'react-showdown';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import Share from '../components/share';
import CoverImage from '../components/cover-image';
import { getFormattedDate } from '../util/common-utils';

const BlogTemplate = ({ data }) => (
  <Layout seo={data.strapiBlogpost.seo}>
    <LayoutSingleColumn>
      <section className="max-w-3xl mx-auto text-left px-2">
        {data.strapiBlogpost.coverimage
          ? (
            <CoverImage
              img={data.strapiBlogpost.coverimage ? data.strapiBlogpost.coverimage.localFile : ''}
              alt={data.strapiBlogpost.coverimage.alternativeText}
              title={data.strapiBlogpost.title}
            />
          )
          : <CoverImage title={data.strapiBlogpost.title} />}
        <div className="py-1">
          <div className="py-2 flex justify-between items-start">
            <div className="m-0 text-sm italic text-dategray article-date-container">
              <strong>Published:&nbsp;</strong>
              {getFormattedDate(data.strapiBlogpost.published_at)}
              <strong>Updated:&nbsp;</strong>
              {getFormattedDate(data.strapiBlogpost.updated_at)}
            </div>
            <Share label="Share this!" text={data.strapiBlogpost.summary} title={data.strapiBlogpost.title} />
          </div>
          <div className="">
            {data.strapiBlogpost.tags.map((elem) => (
              <Link className="text-sm mr-1 p-1 hover:bg-transparent focus:bg-transparent border-2 border-transparent hover:border-primary-dark focus:border-primary-dark text-std-secondary bg-primary-dark rounded" to={`/tag/${elem.Tag}`} key={elem.Tag}>{elem.Tag}</Link>
            ))}
          </div>
        </div>
        <div className="markdown-text">
          <MarkdownView
            markdown={data.strapiBlogpost.content}
            options={{ emoji: true, strikethrough: true }}
          />
        </div>
      </section>
      <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
        <Link to="/blog" className="read-more-link">
          Read all blog posts&nbsp;
          <i className="fas fa-arrow-right" />
        </Link>
      </div>
    </LayoutSingleColumn>
  </Layout>
);

export default BlogTemplate;

export const query = graphql`
  query BlogTemplate ($slug: String!){
    strapiBlogpost( 
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
