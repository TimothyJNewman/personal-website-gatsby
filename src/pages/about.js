import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import MarkdownView from 'react-showdown';
import CoverImage from '../components/cover-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';

const aboutPageQuery = graphql`
  query aboutPage {
    strapiSinglePages(title: {eq: "About"}) {
      title
      content
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
  return (
    <Layout seo={data.strapiSinglePages.seo}>
      <LayoutSingleColumn>
        <section className="max-w-screen-md mx-auto text-left px-2">
          <CoverImage title={data.strapiSinglePages.title} />
          <div className="markdown-text">
            <MarkdownView
              markdown={data.strapiSinglePages.content}
              options={{ emoji: true, strikethrough: true }}
            />
          </div>
        </section>
        <a href="/showcase/ballistic/sim-1">😀</a>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default About;
