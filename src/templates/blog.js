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
  <Layout>
    <LayoutSingleColumn>
      <div className="medium-col">
        {data.strapiBlogpost.coverimage
          ? (
            <CoverImage
              img={data.strapiBlogpost.coverimage.localFile}
              alt={data.strapiBlogpost.coverimage.alternativeText}
              title={data.strapiBlogpost.title}
            />
          )
          : <CoverImage title={data.strapiBlogpost.title} />}
        <div className="content-wrapper content-text">
          <div className="article-date-and-tags">
            <p className="article-date">{getFormattedDate(data.strapiBlogpost.published_at)}</p>
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
        </div>
        <p className="card-readmore">
          <Link to="/blog">
            Read all blog posts&nbsp;
            <i className="fa fa-arrow-right" />
          </Link>
        </p>
      </div>
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
              gatsbyImageData
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
      }
    }
  `;
