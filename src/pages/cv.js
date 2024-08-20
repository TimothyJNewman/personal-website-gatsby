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
      <div className="lg:w-[54rem] px-2 lg:px-0 ">
        <CoverImage title="Curriculum Vitae" />
        <br />
        <embed
          src="/CV.pdf#view=FitH"
          type="application/pdf"
          className="h-screen w-full rounded"
        />
        <p>
            At the moment, I am not looking for work but I am happy to connect with people interested in analog and digital circuit design, data science and digital signal processing. Thanks!
            </p>
      </div>
    </LayoutSingleColumn>
  </Layout>
);

export default CVPage;

// ReactDOM.render(<CVDocument />, document.getElementById('main'));
