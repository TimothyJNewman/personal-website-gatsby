import React, { useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import MarkdownView from 'react-showdown';
import { getSrc, getSrcSet } from 'gatsby-plugin-image';
import { getFormattedDate, getFormattedLink } from '../util/common-utils';
import Card from '../components/card';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import Share from '../components/share';

const query = graphql`
  query HomeQuery {
    strapiSmallText(label: { eq: "Welcome Text" }) {
      content {
        data {
          content
        }
      }
    }
    strapiGallery(strapi_id: { eq: 1 }) {
      images {
        localFile {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.3)
          }
        }
      }
    }
    allStrapiSocialMedia(sort: { fields: order, order: ASC }) {
      nodes {
        id
        image
        link
        name
      }
    }
    allStrapiProjectPost(
      limit: 4
      sort: { fields: publishedAt, order: DESC }
      filter: { publishedAt: { gt: "1970-01-01T00:00:00Z" } }
    ) {
      nodes {
        id
        title
        coverimage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          alternativeText
        }
        publishedAt
        slug
        summary
        tags {
          Tag
        }
      }
    }
    allStrapiBlogPost(
      limit: 4
      sort: { fields: publishedAt, order: DESC }
      filter: { publishedAt: { gt: "1970-01-01T00:00:00Z" } }
    ) {
      nodes {
        id
        title
        publishedAt
        slug
        summary
        tags {
          Tag
        }
      }
    }
    allStrapiTag {
      nodes {
        Tag
      }
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(query);
  const [currentImage, setCurrentImage] = React.useState(0);
  const imagesSrc = data?.strapiGallery?.images.map((image) =>
    getSrc(image?.localFile)
  );
  const imagesSrcSet = data?.strapiGallery?.images.map((image) =>
    getSrcSet(image?.localFile)
  );
  useEffect(() => {
    setTimeout(
      () => setCurrentImage((currentImage + 1) % imagesSrc.length),
      4000
    );
  }, [currentImage]);

  return (
    <Layout>
      <LayoutSingleColumn>
        <section className="site-intro-section flex lg:w-[64rem] flex-col mx-2">
          <div className="grid animate-fade-in grid-cols-1 gap-4 md:grid-cols-12">
            <div className="rounded bg-white-overlay md:col-span-7">
              <h1 className='font-serif text-4xl'>Timothy Newman</h1>
              <span className='italic mb-2'>welcomes you to his website</span>
              <ul className='text-md mt-4'>
                <li className='mb-2'><span className='inline-flex justify-center items-center pb-0.5 h-7 w-7 rounded-full bg-primary-lighter'>🏫</span> 3rd year MEng Electrical and Electronic Engineering at Imperial College London</li>
                <li className='mb-2'><span className='inline-flex justify-center items-center pb-0.5 h-7 w-7 rounded-full bg-primary-lighter'>🛰️</span> Interested in Analog and Digital IC Design, Digital Signal Processing, Machine Learning and Software Engineering</li>
                <li className='mb-2'><span className='inline-flex justify-center items-center pb-0.5 h-7 w-7 rounded-full bg-primary-lighter'>🔭</span> Hobbies include programming, astronomy, photography and exploring the countryside</li>
                <li className='mb-2'><span className='inline-flex justify-center items-center pb-0.5 h-7 w-7 rounded-full bg-primary-lighter'>📇</span> Contact me on any of the platforms below or through the email in my CV</li>
              </ul>
              <div className='flex my-4'>
                {data.allStrapiSocialMedia.nodes
                  ? data.allStrapiSocialMedia.nodes.map((media) => (
                    <a
                      rel="me"
                      href={media.link}
                      key={media.id}
                      aria-label={media.name}
                      className="mx-0.5"
                    >
                      <img
                        className="h-6 w-6"
                        src={media.image}
                        alt={media.name}
                      />
                    </a>
                  ))
                  : ''}
                <Share
                  label="Share link!"
                  text="Personal Website with projects, blog and photos"
                  title="Timothy Newman Site"
                />
              </div>
            </div>
            <div className="flex items-center justify-center md:col-span-5">
              <img
                src={imagesSrc[currentImage]}
                srcSet={imagesSrcSet[currentImage]}
                alt="site intro gallery"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex h-16 items-center justify-center">
            <a
              href="#recentprojectssection"
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-std-secondary"
            >
              <i className="fa fa-arrow-down" />
            </a>
          </div>
        </section>
        <div className="max-w-screen-md">
          <section className="px-2" id="recentprojectssection">
            <div className="flex items-center justify-between">
              <h2 className="my-4 font-normal font-serif">Recent Projects</h2>
            </div>
            <div className="grid-cols-2 grid gap-4">
              {data.allStrapiProjectPost.nodes ? (
                data.allStrapiProjectPost.nodes.map((posts) => (
                  <Card
                    alt={posts.coverimage.alternativeText}
                    title={posts.title}
                    date={getFormattedDate(posts.publishedAt)}
                    link={getFormattedLink('/project/', posts.slug)}
                    description={posts.summary}
                    tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                    tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                    tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                    key={posts.id}
                  />
                ))
              ) : (
                <p className="error-message">No projects found</p>
              )}
            </div>
            <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
              <Link to="/project" className="read-more-link">
                Explore all projects&nbsp;
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </section>
          <section className="px-2">
            <h2 className="my-4 font-normal font-serif">Recent Blog Posts</h2>
            <div className="grid-cols-2 grid gap-4">
              {data.allStrapiBlogPost.nodes ? (
                data.allStrapiBlogPost.nodes.map((posts) => (
                  <Card
                    title={posts.title}
                    date={getFormattedDate(posts.publishedAt)}
                    link={getFormattedLink('/blog/', posts.slug)}
                    description={posts.summary}
                    tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                    tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                    tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                    key={posts.id}
                  />
                ))
              ) : (
                <p className="error-message">No blog posts found</p>
              )}
            </div>
            <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
              <Link to="/blog" className="read-more-link">
                Read all blog posts&nbsp;
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </section>
          <section className="px-2">
            <h2 className="my-4 font-normal font-serif">All Tags</h2>
            <div className="flex flex-wrap">
              {data.allStrapiTag.nodes ? (
                data.allStrapiTag.nodes.map((elem) => (
                  <Link
                    to={`/tag/${elem.Tag}`}
                    key={elem.Tag}
                    className="tag-button"
                  >
                    {elem.Tag}
                  </Link>
                ))
              ) : (
                <p className="error-message">No tags found</p>
              )}
            </div>
          </section>
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default IndexPage;
