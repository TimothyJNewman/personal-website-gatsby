/*
* Individual blog post
*/
import React from 'react';
import { Link, graphql } from 'gatsby';
import MarkdownView from 'react-showdown';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
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
            <p className="article-date">
              Published:&nbsp;
              {getFormattedDate(data.strapiBlogpost.published_at)}
            </p>
            {/* TODO Add share button here */}
            <div className="article-share-button" />
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
            options={{ emoji: true, noHeaderId: true, strikethrough: true }}
          />
        </div>
      </section>
      <p className="card-readmore">
        <Link to="/blog">
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
        published_at
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
