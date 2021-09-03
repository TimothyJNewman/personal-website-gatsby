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
  // eslint-disable-next-line prefer-destructuring
  const seo = data.strapiAboutpagecontent.seo;
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <div className="medium-col">
          {data.strapiAboutpagecontent.coverimage
            ? (
              <CoverImage
                src={data.strapiAboutpagecontent.coverimage.formats.medium.url}
                title={data.strapiAboutpagecontent.title}
              />
            )
            : <CoverImage title={data.strapiAboutpagecontent.title} />}
          <div className="content-wrapper content-text">
            <div className="markdown-text">
              <MarkdownView
                markdown={data.strapiAboutpagecontent.content}
                options={{ emoji: true, noHeaderId: true, strikethrough: true }}
              />
            </div>
          </div>
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default About;
