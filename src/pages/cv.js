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
      <div className="mx-auto max-w-screen-md px-2">
        <CoverImage title="Curriculum Vitae" />
        <br />
        <embed
          src="/CV.pdf#view=FitH"
          type="application/pdf"
          className="h-screen w-full rounded"
        />
        <p>
            At the moment I am looking for a graduate role when I graduate in 2024.
            </p>
      </div>
    </LayoutSingleColumn>
  </Layout>
);

export default CVPage;

// ReactDOM.render(<CVDocument />, document.getElementById('main'));
