import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
/*import appleTouchIcon from '../images/icons/apple-touch-icon.png';
import icon32x32 from '../images/icons/favicon-32x32.png';
import icon16x16 from '../images/icons/favicon-16x16.png';
import safariPinnedTab from '../images/icons/safari-pinned-tab.svg';
import favicon from '../images/icons/favicon.ico';
import mstile70x70 from '../images/icons/mstile-70x70.png';
import mstile144x144 from '../images/icons/mstile-144x144.png';
import mstile150x150 from '../images/icons/mstile-150x150.png';
import mstile310x150 from '../images/icons/mstile-310x150.png';
import mstile310x310 from '../images/icons/mstile-310x310.png';*/

const seoQuery = graphql`
  query SEOquery {
    defaultSeo: mdx(
      internal: {
        contentFilePath: {regex: "/content\/global/"}}, 
        ) {
      frontmatter {
        siteName
        title
        coverImage{
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        summary
        keywords
        isArticle
        preventIndexing
      }
    }
  }
`;

const SEO = ({ seo = {} }) => {
  const defaultSeoQuery = useStaticQuery(seoQuery);
  const { frontmatter: { siteName, ...defaultSeo } } = defaultSeoQuery.defaultSeo;

  // Merge default and page-specific SEO values
  const fullSeo = { ...defaultSeo, ...seo };

  const getMetaTags = () => {
    const tags = [];

    if (fullSeo.title) {
      tags.push(
        {
          property: 'og:title',
          content: fullSeo.title,
        },
        {
          name: 'twitter:title',
          content: fullSeo.title,
        }
      );
    }
    if (fullSeo.summary) {
      tags.push(
        {
          name: 'description',
          content: fullSeo.summary,
        },
        {
          property: 'og:description',
          content: fullSeo.summary,
        },
        {
          name: 'twitter:description',
          content: fullSeo.summary,
        }
      );
    }
    if (fullSeo.keywords) {
      tags.push({
        name: 'keywords',
        content: fullSeo.keywords,
      });
    }
    if (fullSeo.shareImage) {
      const imageUrl =
        (process.env.GATSBY_ROOT_URL || 'http://localhost:8000') +
        fullSeo.coverImage.publicURL;
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
        }
      );
    }
    if (!fullSeo.isArticle === false) {
      tags.push({
        property: 'og:type',
        content: 'article',
      });
    }
    if (fullSeo.preventIndexing) {
      tags.push(
        {
          property: 'robots',
          content: 'noindex',
        },
        {
          property: 'googlebot',
          content: 'noindex',
        }
      );
    }
    tags.push(
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      {
        name: 'msapplication-square70x70logo',
        content: '/icons/mstile-70x70.png',
      },
      {
        name: 'msapplication-square144x144logo',
        content: '/icons/mstile-144x144.png',
      },
      {
        name: 'msapplication-square150x150logo',
        content: '/icons/mstile-150x150.png',
      },
      {
        name: 'msapplication-wide310x150logo',
        content: '/icons/mstile-310x150.png',
      },
      {
        name: 'msapplication-square310x310logo',
        content: '/icons/mstile-310x310.png',
      }
    );

    return tags;
  };

  const metaTags = getMetaTags();

  return (
    <Helmet
      title={fullSeo.title}
      defer={false}
      titleTemplate={`%s | ${siteName}`}
      link={[
        /* {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
          integrity: 'sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+
          8dLJgyAHIhR35VZc2oM/gI1w==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
        }, */
        {
          rel: 'stylesheet',
          href: 'https://use.typekit.net/gis6sfu.css'
        },
        {
          rel: 'stylesheet',
          href: '/fontawesome/css/all.min.css',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/icons/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/icons/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/icons/favicon-16x16.png',
        },
        {
          rel: 'mask-icon',
          href: '/icons/safari-pinned-tab.svg',
          color: '#5bbad5',
        },
        {
          rel: 'shortcut icon',
          href: '/icons/favicon.ico',
        },
      ]}
      meta={metaTags}
      script={[
        {
          'data-goatcounter': 'https://timothy-newman.goatcounter.com/count',
          async: true,
          src: '//gc.zgo.at/count.js',
        },
      ]}
    />
  );
};

export default SEO;

/* eslint-disable react/no-unused-prop-types, react/forbid-prop-types */
SEO.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  coverImage: PropTypes.object,
  keywords: PropTypes.string,
  isArticle: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  summary: null,
  coverImage: null,
  keywords: null,
  isArticle: false,
};
