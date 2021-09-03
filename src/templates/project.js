/*
* Individual project post
*/
import React from 'react';
import { Link, graphql } from 'gatsby';
import MarkdownView from 'react-showdown';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';
import { getFormattedDate } from '../util/common-utils';

const ProjectTemplate = ({ data }) => (
  <Layout>
    <LayoutSingleColumn>
      <div className="medium-col">
        {data.strapiProjectpost.coverimage
          ? (
            <CoverImage
              img={data.strapiProjectpost.coverimage.localFile}
              alt={data.strapiProjectpost.coverimage.alternativeText}
              title={data.strapiProjectpost.title}
            />
          )
          : <CoverImage title={data.strapiProjectpost.title} />}
        <div className="content-wrapper content-text">
          <div className="article-date-and-tags">
            <p className="article-date">{getFormattedDate(data.strapiProjectpost.published_at)}</p>
            <div className="card-tag-container-tagpage">
              {data.strapiProjectpost.tags.map((elem) => (
                <Link className="card-tag-link" to={`/tag/${elem.Tag}`} key={elem.Tag}>{elem.Tag}</Link>
              ))}
            </div>
          </div>
          <div className="markdown-text">
            <MarkdownView
              markdown={data.strapiProjectpost.content}
              options={{ emoji: true, noHeaderId: true, strikethrough: true }}
            />
          </div>
        </div>
        <p className="card-readmore">
          <Link to="/project">
            Explore all projects&nbsp;
            <i className="fa fa-arrow-right" />
          </Link>
        </p>
      </div>
    </LayoutSingleColumn>
  </Layout>
);

export default ProjectTemplate;

export const query = graphql`
  query ProjectTemplate ($slug: String!){
    strapiProjectpost( slug: {eq: $slug }) {
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
