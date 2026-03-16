import React from 'react';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';

const CVPage = () => (
  <Layout
    seo={{
      title: 'CV',
      summary: 'CV Page',
      isArticle: false,
    }}
  >
    <LayoutSingleColumn>
      <div className="lg:max-w-[44rem] w-full px-2 lg:px-0">
        <CoverImage title="Curriculum Vitae" />
        <br />
        <object
          data="/CV.pdf#view=FitH"
          type="application/pdf"
          className="h-screen w-full"
        >
          <iframe
            src="/CV.pdf#view=FitH"
            title="Curriculum Vitae"
            className="h-screen w-full"
          />
        </object>
        <p className="markdown-text mt-2">
          PDF not displaying?
          {' '}
          <a href="/CV.pdf">Download CV</a>
          .
        </p>
        <p className="markdown-text">
          At the moment, I am not looking for work but I am happy to connect with people
          interested in analog and digital circuit design, data science and digital signal
          processing. Thanks!
        </p>
      </div>
    </LayoutSingleColumn>
  </Layout>
);

export default CVPage;
