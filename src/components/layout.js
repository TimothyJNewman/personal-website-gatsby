import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Seo from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"

const Layout = ({ children, seo }) => {
  return (
    <>
      <Seo seo={seo} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout