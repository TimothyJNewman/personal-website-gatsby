import React from 'react';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';

const CVPage = () => (
  <Layout>
    <LayoutSingleColumn>
      <CoverImage title="CV" />
      <br />
      <section className="medium-col content-wrapper content-text">
        <embed src="/CV.pdf#view=FitH" type="application/pdf" style={{ width: '100%', height: '100vh', borderRadius: 'var(--std-border-radius)' }} />
        <p className="markdown-text">
          If CV does not appear,&nbsp;
          <a href="/CV.pdf">click here</a>
        </p>
      </section>
    </LayoutSingleColumn>
  </Layout>
);

export default CVPage;

// ReactDOM.render(<CVDocument />, document.getElementById('main'));
