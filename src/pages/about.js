import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import MarkdownView from 'react-showdown';
import CoverImage from '../components/cover-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';

const aboutPageQuery = graphql`
  query aboutPage {
    strapiAboutpagecontent {
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
    <Layout seo={data.strapiAboutpagecontent.seo}>
      <LayoutSingleColumn>
        <CoverImage title={data.strapiAboutpagecontent.title} />
        <section className="medium-col content-wrapper content-text">
          <div className="markdown-text">
            <MarkdownView
              markdown={data.strapiAboutpagecontent.content}
              options={{ emoji: true, noHeaderId: true, strikethrough: true }}
            />
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default About;
