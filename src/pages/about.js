import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import MarkdownView from 'react-showdown';
import CoverImage from '../components/cover-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';

const aboutPageQuery = graphql`
  query aboutPage {
    strapiSinglePage(title: { eq: "About" }) {
      title
      content {
        data {
          content
        }
      }
      seo {
        metaTitle
        metaDescription
        isArticle
      }
    }
  }
`;

const About = () => {
  const data = useStaticQuery(aboutPageQuery);
  const extractedSEO = {
    title: data.strapiSinglePage.seo.metaTitle,
    summary: data.strapiSinglePage.seo.metaDescription,
    ...data.strapiSinglePage.seo
  };
  return (
    <Layout seo={extractedSEO}>
      <LayoutSingleColumn>
        <section className="mx-auto max-w-screen-md px-2 text-left w-full">
          <CoverImage title={data.strapiSinglePage.title} />
          <div className="markdown-text">
            <MarkdownView
              markdown={data.strapiSinglePage.content.data.content}
              options={{ emoji: true, strikethrough: true }}
            />
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default About;
