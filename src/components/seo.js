import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const seoQuery = graphql`
  query SEOquery {
    defaultSeo: mdx(
      internal: { contentFilePath: { regex: "/content\/global/" } }
    ) {
      frontmatter {
        siteName
        title
        summary
        keywords
        isArticle
        preventIndexing
        coverImage {
          publicURL
        }
      }
    }
  }
`;

const Seo = ({ seo = {} }) => {
  const { frontmatter: { siteName, ...defaultSeo } } = useStaticQuery(seoQuery).defaultSeo;
  const fullSeo = { ...defaultSeo, ...seo };
  const pageTitle = fullSeo.title ? `${fullSeo.title} | ${siteName}` : siteName;

  return (
    <>
      <title>{pageTitle}</title>
      {fullSeo.title && <meta property="og:title" content={fullSeo.title} />}
      {fullSeo.title && <meta name="twitter:title" content={fullSeo.title} />}
      {fullSeo.summary && <meta name="description" content={fullSeo.summary} />}
      {fullSeo.summary && <meta property="og:description" content={fullSeo.summary} />}
      {fullSeo.summary && <meta name="twitter:description" content={fullSeo.summary} />}
      {fullSeo.keywords && <meta name="keywords" content={fullSeo.keywords} />}
      {fullSeo.coverImage?.publicURL && (
        <>
          <meta name="image" content={`${process.env.GATSBY_ROOT_URL || ''}${fullSeo.coverImage.publicURL}`} />
          <meta property="og:image" content={`${process.env.GATSBY_ROOT_URL || ''}${fullSeo.coverImage.publicURL}`} />
          <meta name="twitter:image" content={`${process.env.GATSBY_ROOT_URL || ''}${fullSeo.coverImage.publicURL}`} />
        </>
      )}
      {fullSeo.isArticle && <meta property="og:type" content="article" />}
      {fullSeo.preventIndexing && <meta name="robots" content="noindex" />}
      {fullSeo.preventIndexing && <meta name="googlebot" content="noindex" />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="google-site-verification" content="uATk-Uc5iaxxDP1Q__bcemrMdePQPYhuO3g0FSYIBjg" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-square70x70logo" content="/icons/mstile-70x70.png" />
      <meta name="msapplication-square144x144logo" content="/icons/mstile-144x144.png" />
      <meta name="msapplication-square150x150logo" content="/icons/mstile-150x150.png" />
      <meta name="msapplication-wide310x150logo" content="/icons/mstile-310x150.png" />
      <meta name="msapplication-square310x310logo" content="/icons/mstile-310x310.png" />
      <link rel="stylesheet" href="https://use.typekit.net/gis6sfu.css" />
      <link rel="stylesheet" href="/fontawesome/css/all.min.css" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
      <script
        data-goatcounter="https://timothy-newman.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      />
    </>
  );
};

export default Seo;

Seo.propTypes = {
  seo: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.string,
    keywords: PropTypes.string,
    isArticle: PropTypes.bool,
    preventIndexing: PropTypes.bool,
    coverImage: PropTypes.shape({
      publicURL: PropTypes.string,
    }),
  }),
};

Seo.defaultProps = {
  seo: {},
};
