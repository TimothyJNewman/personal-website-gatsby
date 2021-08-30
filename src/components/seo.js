import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ seo = {} }) => {
  const { strapiGlobal } = useStaticQuery(query);
  const { defaultSeo, siteName } = strapiGlobal;

  // Merge default and page-specific SEO values
  const fullSeo = { ...defaultSeo, ...seo };

  const getMetaTags = () => {
    const tags = [];

    if (fullSeo.metaTitle) {
      tags.push(
        {
          property: "og:title",
          content: fullSeo.metaTitle,
        },
        {
          name: "twitter:title",
          content: fullSeo.metaTitle,
        }
      );
    }
    if (fullSeo.metaDescription) {
      tags.push(
        {
          name: "description",
          content: fullSeo.metaDescription,
        },
        {
          property: "og:description",
          content: fullSeo.metaDescription,
        },
        {
          name: "twitter:description",
          content: fullSeo.metaDescription,
        }
      );
    }
    if (fullSeo.shareImage) {
      const imageUrl =
        (process.env.GATSBY_ROOT_URL || "http://localhost:8000") +
        fullSeo.shareImage.media.localFile.publicURL;
      tags.push(
        {
          name: "image",
          content: imageUrl,
        },
        {
          property: "og:image",
          content: imageUrl,
        },
        {
          name: "twitter:image",
          content: imageUrl,
        }
      );
    }
    if (fullSeo.article) {
      tags.push({
        property: "og:type",
        content: "article",
      });
    }
    tags.push(
      { name: "twitter:card", content: "summary_large_image" },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "msapplication-TileColor", content: "#00a300" },
      { name: "msapplication-config", content: "/images/icons/browserconfig.xml" },
      { name: "description", content: "Timothy Jabez Newman personal website" }
    )

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
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
          integrity: "sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer"
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "../images/icons/apple-touch-icon.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "../images/icons/favicon-32x32.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "../images/icons/favicon-16x16.png"
        },
        {
          rel: "mask-icon",
          href: "../images/icons/safari-pinned-tab.svg",
          color: "#05997e"
        },
        {
          rel: "shortcut icon",
          href: "../images/icons/favicon.ico"
        }
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

const query = graphql`
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
  }
`;