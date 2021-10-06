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
      {data.strapiBlogpost.coverimage
        ? (
          <CoverImage
            img={data.strapiBlogpost.coverimage.localFile}
            alt={data.strapiBlogpost.coverimage.alternativeText}
            title={data.strapiBlogpost.title}
          />
        )
        : <CoverImage title={data.strapiBlogpost.title} />}
      <section className="medium-col content-wrapper content-text">
        <div className="article-date-and-tags">
          <div className="article-date-share-button">
            <div className="article-date-container">
              <time className="article-date" dateTime={data.strapiBlogpost.published_at}>
                <strong>Published:&nbsp;</strong>
                {getFormattedDate(data.strapiBlogpost.published_at)}
              </time>
              <time className="article-date" dateTime={data.strapiBlogpost.updated_at}>
                <strong>Updated:&nbsp;</strong>
                {getFormattedDate(data.strapiBlogpost.updated_at)}
              </time>
            </div>
            <Share label="Share this!" text={data.strapiBlogpost.summary} title={data.strapiBlogpost.title} />
          </div>
          <div className="card-tag-container-tagpage">
            {data.strapiBlogpost.tags.map((elem) => (
              <Link className="card-tag-link" to={`/tag/${elem.Tag}`} key={elem.Tag}>{elem.Tag}</Link>
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
      <p className="card-readmore">
        <Link to="/blog" className="read-more-link">
          Read all blog posts&nbsp;
          <i className="fa fa-arrow-right" />
        </Link>
      </p>
    </LayoutSingleColumn>
  </Layout>
);

export default BlogTemplate;

export const query = graphql`
  query BlogTemplate ($slug: String!){
    strapiBlogpost( slug: {eq: $slug }) {
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
