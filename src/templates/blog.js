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
  <Layout seo={data.strapiBlogPost.seo}>
    <LayoutSingleColumn>
      <section className="mx-auto max-w-screen-md px-2 text-left w-full">
        {data.strapiBlogPost.coverimage ? (
          <CoverImage
            img={
              data.strapiBlogPost.coverimage
                ? data.strapiBlogPost.coverimage.localFile
                : ''
            }
            alt={data.strapiBlogPost.coverimage.alternativeText}
            title={data.strapiBlogPost.title}
          />
        ) : (
          <CoverImage title={data.strapiBlogPost.title} />
        )}
        <div className="py-1">
          <div className="flex items-start justify-between py-2">
            <div className="article-date-container m-0 text-sm italic text-dategray">
              <strong>Published:&nbsp;</strong>
              {getFormattedDate(data.strapiBlogPost.publishedAt)}
              <strong>Updated:&nbsp;</strong>
              {getFormattedDate(data.strapiBlogPost.updatedAt)}
            </div>
            <Share
              label="Share this!"
              text={data.strapiBlogPost.summary}
              title={data.strapiBlogPost.title}
            />
          </div>
          <div className="flex">
            {data.strapiBlogPost.tags.map((elem) => (
              <Link
                className="tag-button"
                to={`/tag/${elem.Tag}`}
                key={elem.Tag}
              >
                {elem.Tag}
              </Link>
            ))}
          </div>
        </div>
        <div className="markdown-text">
          <MarkdownView
            markdown={data.strapiBlogPost.content.data.content}
            options={{ emoji: true, strikethrough: true }}
          />
        </div>
        <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
          <Link to="/blog" className="read-more-link">
            Read all blog posts&nbsp;
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </section>
    </LayoutSingleColumn>
  </Layout>
);

export default BlogTemplate;

export const query = graphql`
  query BlogTemplate($slug: String!) {
    strapiBlogPost(slug: { eq: $slug }) {
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
