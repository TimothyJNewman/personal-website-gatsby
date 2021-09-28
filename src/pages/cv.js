import React from 'react';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';

const CVPage = () => (
  <Layout>
    <LayoutSingleColumn>
      <div className="medium-col">
        <CoverImage title="CV" />
      </div>
      <br />
      <div className="content-wrapper content-text">
        <embed src="/CV.pdf#view=Fit" type="application/pdf" style={{ width: '100%', height: '100vh' }} />
        <p className="markdown-text">
          If CV does not appear,&nbsp;
          <a href="/CV.pdf">click here</a>
        </p>
      </div>
    </LayoutSingleColumn>
  </Layout>
);

export default CVPage;

// ReactDOM.render(<CVDocument />, document.getElementById('main'));
