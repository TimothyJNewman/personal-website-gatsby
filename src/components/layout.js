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
  <div className="border-8 border-primary-dark">
    <Seo seo={seo} />
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
