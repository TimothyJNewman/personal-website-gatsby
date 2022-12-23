/*
 * Exports a layout function with Seo, Header, Main and Footer
 */
import React from 'react';
import PropTypes from 'prop-types';
import Seo from './seo';
import Header from './header';
import Footer from './footer';
import '../css/index.css';

const Layout = ({ children, seo }) => (
  <>
    <Seo seo={seo} />
    <Header />
    <main id="main" className="flex justify-center bg-white text-primary">
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
