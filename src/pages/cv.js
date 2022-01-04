import React from 'react';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';

const CVPage = () => (
  <Layout seo={{
    metaTitle: 'CV',
    metaDescription: 'CV Page',
    isArticle: false,
  }}>
    <LayoutSingleColumn>
      <div className="max-w-screen-md mx-auto px-2">
        <CoverImage title="Curriculum Vitae" />
        <br />
        <embed src="/CV.pdf#view=FitH" type="application/pdf" className="w-full h-screen rounded" />
        <p className="markdown-text">
          If CV does not appear,&nbsp;
          <a href="/CV.pdf">click here</a>
          . This is a modified version of my-latex-cv by Salman Maq
          which was a modified version of my-latex-cv by Primož Godec.
          Source code can be found&nbsp;
          <a href="https://github.com/TimothyJNewman/CV">on my github account</a>
          .
        </p>
      </div>
    </LayoutSingleColumn>
  </Layout >
);

export default CVPage;

// ReactDOM.render(<CVDocument />, document.getElementById('main'));
