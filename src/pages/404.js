import React from "react";
import { Link } from "gatsby";
import CoverImage from '../components/cover-image';
import LayoutSingleColumn from "../components/layout-single-column";
import Layout from "../components/layout";
import "../css/markdown.css";

const NotFoundPage = () => {
  return (
    <Layout>
      <LayoutSingleColumn>
        <CoverImage title="You've reached a dead end!" />
        <h2>404 Error</h2>
        <p class="markdown-text">
          {window.location.pathname === "/404"
            ? <>The requested url is not available. </>
            : <>The requested url <Link to={window.location.href}>{window.location.href}</Link> is not available. </>
          } Please <Link to="/">click here</Link> to return to the home page.
        </p>
      </LayoutSingleColumn>
    </Layout>
  );
}

export default NotFoundPage;