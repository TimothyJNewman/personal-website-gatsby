import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import appleTouchIcon from '../images/icons/apple-touch-icon.png';
import icon32x32 from '../images/icons/favicon-32x32.png';
import icon16x16 from '../images/icons/favicon-16x16.png';
import safariPinnedTab from '../images/icons/safari-pinned-tab.svg';
import favicon from '../images/icons/favicon.ico';
import mstile70x70 from '../images/icons/mstile-70x70.png';
import mstile144x144 from '../images/icons/mstile-144x144.png';
import mstile150x150 from '../images/icons/mstile-150x150.png';
import mstile310x150 from '../images/icons/mstile-310x150.png';
import mstile310x310 from '../images/icons/mstile-310x310.png';

const seoQuery = graphql`
  query SEOquery {
    strapiGlobal {
      defaultSeo {
        metaDescription
        metaTitle
        shareImage {
          alt
          id
          keywords
          media {
            localFile {
              publicURL
            }
          }
          preventIndexing
        }
      }
      siteName
    }
  }`;

const SEO = ({ seo = {} }) => {
  const { strapiGlobal } = useStaticQuery(seoQuery);
  const { defaultSeo, siteName } = strapiGlobal;

  // Merge default and page-specific SEO values
  const fullSeo = { ...defaultSeo, ...seo };

  const getMetaTags = () => {
    const tags = [];

    if (fullSeo.metaTitle) {
      tags.push(
        {
          property: 'og:title',
          content: fullSeo.metaTitle,
        },
        {
          name: 'twitter:title',
          content: fullSeo.metaTitle,
        },
      );
    }
    if (fullSeo.metaDescription) {
      tags.push(
        {
          name: 'description',
          content: fullSeo.metaDescription,
        },
        {
          property: 'og:description',
          content: fullSeo.metaDescription,
        },
        {
          name: 'twitter:description',
          content: fullSeo.metaDescription,
        },
      );
    }
    if (fullSeo.shareImage) {
      const imageUrl = (process.env.GATSBY_ROOT_URL || 'http://localhost:8000')
        + fullSeo.shareImage.media.localFile.publicURL;
      tags.push(
        {
          name: 'image',
          content: imageUrl,
        },
        {
          property: 'og:image',
          content: imageUrl,
        },
        {
          name: 'twitter:image',
          content: imageUrl,
        },
      );
    }
    if (fullSeo.article) {
      tags.push({
        property: 'og:type',
        content: 'article',
      });
    }
    tags.push(
      { name: 'twitter:card', content: 'summary_large_image' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#00a300' },
      { name: 'msapplication-square70x70logo', content: mstile70x70 },
      { name: 'msapplication-square144x144logo', content: mstile144x144 },
      { name: 'msapplication-square150x150logo', content: mstile150x150 },
      { name: 'msapplication-wide310x150logo', content: mstile310x150 },
      { name: 'msapplication-square310x310logo', content: mstile310x310 },
      { name: 'description', content: 'Timothy Jabez Newman personal website' },
    );

    return tags;
  };

  const metaTags = getMetaTags();

  return (
    <Helmet
      title={fullSeo.metaTitle}
      defer={false}
      titleTemplate={`%s | ${siteName}`}
      link={[
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
          integrity: 'sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: appleTouchIcon,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: icon32x32,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: icon16x16,
        },
        {
          rel: 'mask-icon',
          href: safariPinnedTab,
          color: '#05997e',
        },
        {
          rel: 'shortcut icon',
          href: favicon,
        },
      ]}
      meta={metaTags}
    />
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
