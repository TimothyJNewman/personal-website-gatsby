/*
 * Individual project post
 */
import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';
import Share from '../components/share';
import { getFormattedDate } from '../util/common-utils';
import 'katex/dist/katex.min.css';

const ProjectTemplate = ({ children, data }) => (
  <Layout seo={data.projectPost.frontmatter}>
    <LayoutSingleColumn>
      <section className="mx-auto lg:w-[48rem] px-2 lg:px-0 text-left w-full">
        {data.projectPost.frontmatter.coverImage ? (
          <CoverImage
            img={data.projectPost.frontmatter.coverImage ?? ''}
            title={data.projectPost.frontmatter.title}
          />
        ) : (
          <CoverImage title={data.projectPost.frontmatter.title} />
        )}
        <div className="py-1">
          <div className="flex items-start justify-between py-2">
            <div className="article-date-container m-0 text-sm italic text-dategray">
              <strong>Published:&nbsp;</strong>
              {getFormattedDate(data.projectPost.frontmatter.publishedAt)}
              <strong>Updated:&nbsp;</strong>
              {getFormattedDate(data.projectPost.frontmatter.updatedAt)}
            </div>
            <Share
              label="Share this!"
              text={data.projectPost.frontmatter.summary}
              title={data.projectPost.frontmatter.title}
            />
          </div>
          <div className="flex gap-1">
            {data.projectPost.frontmatter.tags.map((tag) => (
              <Link
                className="tag-button"
                to={`/tag/${tag}`}
                key={tag}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
        <div className="markdown-text">
          <MDXProvider>
            {children}
          </MDXProvider>
        </div>
        <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
          <Link to="/project" className="read-more-link">
            Explore all projects&nbsp;
            <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </section>
    </LayoutSingleColumn>
  </Layout >
);

export default ProjectTemplate;

export const query = graphql`
  query ProjectTemplate($slug: String!) {
    projectPost: mdx(
      internal: {
        contentFilePath: {regex: "/content\/project/"}}, 
        frontmatter: {slug: {eq: $slug}}
        ) {
      frontmatter {
        title
        summary
        keywords
        publishedAt
        updatedAt
        tags
        embeddedAssets {
          childrenImageSharp {
            gatsbyImageData
          }
          publicURL
        }
      }
    }
  }`;
