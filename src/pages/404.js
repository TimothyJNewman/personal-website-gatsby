import React from 'react';
import { Link } from 'gatsby';
import CoverImage from '../components/cover-image';
import LayoutSingleColumn from '../components/layout-single-column';
import Layout from '../components/layout';

const NotFoundPage = ({ location }) => {
  const { pathname } = location;
  const seo = {
    title: '404 Page',
    isArticle: false,
  };
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <CoverImage title="You've reached a dead end!" />
        <section className="max-w-screen-md">
          <h2>404 Error</h2>
          <p className="markdown-text">
            {pathname === '/404' ? (
              <>The requested url is not available. </>
            ) : (
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
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default NotFoundPage;
