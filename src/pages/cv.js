import React from 'react';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';

const CVPage = () => (
  <Layout>
    <LayoutSingleColumn>
      <CoverImage title="CV" />
    </LayoutSingleColumn>
  </Layout>
);

export default CVPage;

// ReactDOM.render(<CVDocument />, document.getElementById('main'));
