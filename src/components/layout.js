import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Seo from "../components/seo"

const Layout = ({ children, seo }) => (
    <StaticQuery
        render={(data) => (
            <>
                <Seo seo={seo} />
                <main>{children}</main>
            </>
        )}
    />
)

export default Layout