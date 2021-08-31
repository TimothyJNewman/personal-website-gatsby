import React from "react";
import { graphql, useStaticQuery } from 'gatsby';
import CoverImage from '../components/cover-image';
import MarkdownView from 'react-showdown';
import Layout from "../components/layout";
import LayoutSingleColumn from "../components/layout-single-column";


const About = () => {

  const data = useStaticQuery(aboutPageQuery);

  return (
    <Layout>
      <LayoutSingleColumn>
        <div className="medium-col">
              {data.strapiAboutpagecontent.coverimage
                ? <CoverImage src={data.strapiAboutpagecontent.coverimage.formats.medium.url} title={data.strapiAboutpagecontent.title} />
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
}

export default About;

const aboutPageQuery = graphql`
  query {
    strapiAboutpagecontent {
      title
      content
    }
  }
  `;