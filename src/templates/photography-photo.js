import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import ExifDisplay from '../components/exif-display';

const PhotographyPhoto = ({ data, pageContext }) => {
  const { albumSlug, prevPhoto, nextPhoto } = pageContext;
  const { photo, album } = data;

  const image = getImage(photo?.parent?.childImageSharp?.full);
  const albumTitle = album?.frontmatter?.title || albumSlug;

  return (
    <Layout
      seo={{
        title: photo?.filename
          ? `${photo.filename} — ${albumTitle}`
          : albumTitle,
        isArticle: false,
      }}
    >
      <LayoutSingleColumn>
        <div className="lg:w-[54rem] w-full px-2 lg:px-0">
          {/* Top nav bar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <Link
              to={`/photography/${albumSlug}`}
              className="text-sm text-dategray hover:text-primary"
            >
              <i className="fas fa-arrow-left mr-1" />
              {albumTitle}
            </Link>
            <div className="flex gap-2">
              {prevPhoto ? (
                <Link
                  to={`/photography/${albumSlug}/${prevPhoto}`}
                  className="std-button text-sm"
                >
                  <i className="fas fa-chevron-left mr-1" />
                  Prev
                </Link>
              ) : (
                <span className="std-button text-sm opacity-40 cursor-not-allowed select-none">
                  <i className="fas fa-chevron-left mr-1" />
                  Prev
                </span>
              )}
              {nextPhoto ? (
                <Link
                  to={`/photography/${albumSlug}/${nextPhoto}`}
                  className="std-button text-sm"
                >
                  Next
                  <i className="fas fa-chevron-right ml-1" />
                </Link>
              ) : (
                <span className="std-button text-sm opacity-40 cursor-not-allowed select-none">
                  Next
                  <i className="fas fa-chevron-right ml-1" />
                </span>
              )}
            </div>
          </div>

          {/* Photo */}
          <div className="photo-detail-image-wrapper">
            {image ? (
              <GatsbyImage
                image={image}
                alt={photo?.filename || ''}
                className="rounded"
              />
            ) : (
              <div className="photo-detail-placeholder">
                <i className="fas fa-image text-5xl text-dategray" />
              </div>
            )}
          </div>

          {/* Metadata below photo */}
          {photo?.dateTaken && (
            <p className="text-sm text-dategray italic mt-2">
              <i className="fas fa-calendar mr-1" />
              {photo.dateTaken}
            </p>
          )}

          {/* EXIF panel */}
          <div className="mt-4 mb-6">
            <ExifDisplay
              camera={photo?.camera}
              lens={photo?.lens}
              aperture={photo?.aperture}
              shutterSpeed={photo?.shutterSpeed}
              iso={photo?.iso}
              focalLength={photo?.focalLength}
              dateTaken={photo?.dateTaken}
              latitude={photo?.latitude}
              longitude={photo?.longitude}
            />
          </div>
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default PhotographyPhoto;

export const query = graphql`
  query PhotoTemplate($albumSlug: String!, $filename: String!) {
    photo: photographyPhoto(
      albumSlug: { eq: $albumSlug }
      filename: { eq: $filename }
    ) {
      filename
      camera
      lens
      aperture
      shutterSpeed
      iso
      focalLength
      dateTaken(formatString: "MMMM DD, YYYY")
      latitude
      longitude
      parent {
        ... on File {
          childImageSharp {
            full: gatsbyImageData(
              layout: CONSTRAINED
              width: 1080
              placeholder: BLURRED
            )
          }
        }
      }
    }
    album: mdx(
      frontmatter: { slug: { eq: $albumSlug } }
      internal: { contentFilePath: { regex: "/content/photography/" } }
    ) {
      frontmatter {
        title
      }
    }
  }
`;
