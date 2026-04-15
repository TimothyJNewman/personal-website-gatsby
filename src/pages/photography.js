import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import CoverImage from '../components/cover-image';
import Seo from '../components/seo';

const PhotographyPage = ({ data }) => {
  const albums = data.allMdx.nodes;

  const photoCounts = {};
  data.allPhotographyPhoto.group.forEach(({ fieldValue, totalCount }) => {
    photoCounts[fieldValue] = totalCount;
  });

  return (
    <Layout>
      <LayoutSingleColumn>
        <div className="lg:w-[54rem] w-full px-2 lg:px-0">
          <CoverImage title="Photography" />
          <p className="mt-4 mb-2">
            Also on
            {' '}
            <a
              href="https://unsplash.com/@newmanphotog"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Unsplash
            </a>
            {' · '}
            <a
              href="https://www.google.com/search?q=%22Timothy+Newman%22+unsplash+OR+%22newmanphotog%22"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              See where my photos have been used
            </a>
          </p>
          {albums.length === 0 ? (
            <p className="error-message">No albums found.</p>
          ) : (
            <div className="photography-albums-grid">
              {albums.map(({ frontmatter: fm }) => {
                const image = getImage(fm.coverImage);
                return (
                  <Link
                    key={fm.slug}
                    to={`/photography/${fm.slug}`}
                    className="album-card"
                  >
                    <div className="album-card-image-wrapper">
                      {image ? (
                        <GatsbyImage
                          image={image}
                          alt={fm.title}
                          className="album-card-image"
                        />
                      ) : (
                        <div className="album-card-placeholder">
                          <i className="fas fa-images text-3xl" />
                        </div>
                      )}
                    </div>
                    <div className="album-card-info">
                      <h3 className="font-semibold">{fm.title}</h3>
                      {fm.location && (
                        <p className="text-sm text-dategray">
                          <i className="fas fa-map-marker-alt mr-1" />
                          {fm.location}
                        </p>
                      )}
                      {fm.publishedAt && (
                        <p className="text-sm italic text-dategray">{fm.publishedAt}</p>
                      )}
                      {photoCounts[fm.slug] != null && (
                        <p className="text-sm mt-1">
                          <i className="fas fa-images mr-1" />
                          {photoCounts[fm.slug]}
                          {' '}
                          {photoCounts[fm.slug] === 1 ? 'photo' : 'photos'}
                        </p>
                      )}
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

export default PhotographyPage;

export const query = graphql`
  query {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/content/photography/" } } }
      sort: { frontmatter: { publishedAt: DESC } }
    ) {
      nodes {
        frontmatter {
          slug
          title
          summary
          publishedAt(formatString: "MMMM YYYY")
          location
          coverImage {
            childImageSharp {
              gatsbyImageData(
                width: 600
                height: 400
                transformOptions: { cropFocus: CENTER }
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
    allPhotographyPhoto {
      group(field: { albumSlug: SELECT }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export const Head = () => <Seo seo={{ title: 'Photography', isArticle: false }} />;
