import React from 'react';
import { Link } from 'gatsby';
import CoverImage from '../components/cover-image';
import LayoutSingleColumn from '../components/layout-single-column';
import Layout from '../components/layout';
import '../css/markdown.css';

const NotFoundPage = (props) => {
  const { location } = props;
  const { pathname } = location;

  return (
    <Layout>
      <LayoutSingleColumn>
        <CoverImage title="You've reached a dead end!" />
        <h2>404 Error</h2>
        <p className="markdown-text">
          {pathname === '/404'
            ? <>The requested url is not available. </>
            : (
              <>
                The requested url&nbsp;
                <Link to={process.env.GATSBY_ROOT_URL + pathname}>
                  {process.env.GATSBY_ROOT_URL + pathname}
                </Link>
                &nbsp;is not available.
              </>
            )}
          &nbsp;Please&nbsp;
          <Link to="/">click here</Link>
          &nbsp;to return to the home page.
        </p>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default NotFoundPage;
