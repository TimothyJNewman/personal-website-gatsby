import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';
import { getFormattedDate } from '../util/common-utils';

const PhotographyAlbum = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const { frontmatter } = data.album;
  const photos = data.allPhotographyPhoto.nodes;

  return (
    <Layout
      seo={{
        title: frontmatter.title,
        description: frontmatter.summary,
        isArticle: false,
      }}
    >
      <LayoutSingleColumn>
        <div className="lg:w-[54rem] w-full px-2 lg:px-0">
          <Link
            to="/photography"
            className="text-sm text-dategray hover:text-primary mb-2 inline-block"
          >
            <i className="fas fa-arrow-left mr-1" />
            All Albums
          </Link>
          <CoverImage title={frontmatter.title} />
          <div className="flex flex-wrap gap-3 text-sm text-dategray mt-1 mb-2">
            {frontmatter.location && (
              <span>
                <i className="fas fa-map-marker-alt mr-1" />
                {frontmatter.location}
              </span>
            )}
            {frontmatter.publishedAt && (
              <span className="italic">{getFormattedDate(frontmatter.publishedAt)}</span>
            )}
            <span>
              <i className="fas fa-images mr-1" />
              {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>
          {frontmatter.summary && <p className="mb-4">{frontmatter.summary}</p>}

          {photos.length === 0 ? (
            <p className="error-message">No photos in this album yet.</p>
          ) : (
            <div className="photo-grid">
              {photos.map((photo) => {
                const thumb = getImage(photo.parent?.childImageSharp?.thumb);
                return (
                  <Link
                    key={photo.filename}
                    to={`/photography/${slug}/${photo.filename}`}
                    className="photo-thumb-wrapper"
                  >
                    {thumb ? (
                      <GatsbyImage
                        image={thumb}
                        alt={photo.filename}
                        className="w-full h-full"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="fas fa-image text-2xl text-dategray" />
                      </div>
                    )}
                    <div className="photo-thumb-overlay">
                      {photo.dateTaken && <span>{photo.dateTaken}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default PhotographyAlbum;

export const query = graphql`
  query AlbumTemplate($slug: String!) {
    album: mdx(
      frontmatter: { slug: { eq: $slug } }
      internal: { contentFilePath: { regex: "/content/photography/" } }
    ) {
      frontmatter {
        title
        summary
        publishedAt
        location
      }
    }
    allPhotographyPhoto(
      filter: { albumSlug: { eq: $slug } }
      sort: { filename: ASC }
    ) {
      nodes {
        filename
        albumSlug
        dateTaken(formatString: "MMM YYYY")
        camera
        aperture
        parent {
          ... on File {
            childImageSharp {
              thumb: gatsbyImageData(
                width: 400
                height: 400
                transformOptions: { cropFocus: CENTER }
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`;
