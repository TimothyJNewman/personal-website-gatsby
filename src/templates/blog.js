/*
 * Individual blog post
 */
import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import Share from '../components/share';
import CoverImage from '../components/cover-image';
import { getFormattedDate } from '../util/common-utils';

const BlogTemplate = ({ data, children }) => (
  <Layout seo={data.blogPost.frontmatter}>
    <LayoutSingleColumn>
      <section className="mx-auto lg:max-w-[44rem] px-4 lg:px-0 text-left w-full">
        {data.blogPost.frontmatter.coverImage ? (
          <CoverImage
            img={
              data.blogPost.frontmatter.coverImage ?? ''
            }
            title={data.blogPost.frontmatter.title}
          />
        ) : (
          <CoverImage title={data.blogPost.frontmatter.title} />
        )}
        <div className="py-1">
          <div className="flex items-start justify-between py-2">
            <div className="article-date-container m-0 text-sm italic text-dategray">
              <strong>Published:&nbsp;</strong>
              {getFormattedDate(data.blogPost.frontmatter.publishedAt)}
              <strong>Updated:&nbsp;</strong>
              {getFormattedDate(data.blogPost.frontmatter.updatedAt)}
            </div>
            <Share
              label="Share this!"
              text={data.blogPost.frontmatter.summary}
              title={data.blogPost.frontmatter.title}
            />
          </div>
          <div className="flex gap-1">
            {data.blogPost.frontmatter.tags.map((tag) => (
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
        <div className="mt-4 mb-1 flex justify-end">
          <Link to="/blog" className="read-more-link">
            Read all blog posts
          </Link>
        </div>
      </section>
    </LayoutSingleColumn>
  </Layout>
);

export default BlogTemplate;

export const query = graphql`
  query BlogTemplate($slug: String!) {
    blogPost: mdx(
      internal: {
        contentFilePath: {regex: "/content\/blog/"}}, 
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
      body
    }
  }`;
