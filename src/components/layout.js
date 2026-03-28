/*
 * Exports a layout function with Header, Main and Footer
 */
import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import '../css/index.css';

const Layout = ({ children }) => (
  <>
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
