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
    strapiSmallText(label: {eq: "Welcome Text"}) {
      content {
        data {
          content
        }
      }
    }
    strapiGallery(strapi_id: {eq: 1}) {
      images {
        localFile {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.3)
          }
        }
      }
    }
    allStrapiSocialMedia(sort: {fields: order, order: ASC}) {
      nodes {
        id
        image
        link
        name
      }
    }
    allStrapiProjectPost(
      limit: 4
      sort: {fields: publishedAt, order: DESC}
      filter: {publishedAt: {gt: "1970-01-01T00:00:00Z"}}
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
      sort: {fields: publishedAt, order: DESC}
      filter: {publishedAt: {gt: "1970-01-01T00:00:00Z"}}
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
  }`;

const IndexPage = () => {
  const data = useStaticQuery(query);
  const [currentImage, setCurrentImage] = React.useState(0);
  const imagesSrc = data?.strapiGallery?.images.map((image) => getSrc(image?.localFile));
  const imagesSrcSet = data?.strapiGallery?.images.map((image) => getSrcSet(image?.localFile));
  useEffect(() => {
    setTimeout(() => setCurrentImage((currentImage + 1) % imagesSrc.length), 4000);
  }, [currentImage])

  return (
    <Layout>
      <LayoutSingleColumn>
        <section className="max-w-screen-lg px-2 flex flex-col site-intro-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            <div className="px-2 sm:px-4 rounded bg-white-overlay">
              {data.strapiSmallText
                ? (
                  <MarkdownView
                    className="markdown-text"
                    markdown={data.strapiSmallText.content}
                    options={{ tables: true, emoji: true }}
                  />
                )
                : ''}
              <div className="flex">
                {data.allStrapiSocialMedia.nodes
                  ? data.allStrapiSocialMedia.nodes.map((media) => (
                    <a href={media.link} key={media.id} aria-label={media.name} className="mx-0.5">
                      <img className="w-6 h-6" src={media.image} alt={media.name} />
                    </a>
                  ))
                  : ''}
              </div>
            </div>
            <div className="p-2 sm:p-4 flex justify-center items-center">
              <img
                src={imagesSrc[currentImage]}
                srcSet={imagesSrcSet[currentImage]}
                alt="site intro gallery"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="h-16 flex justify-center items-center">
            <a href="#recentprojectssection" className="border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-std-secondary rounded-full w-8 h-8 flex justify-center items-center">
              <i className="fa fa-arrow-down" />
            </a>
          </div>
        </section>
        <div className="max-w-screen-md">
          <section className="px-2" id="recentprojectssection">
            <div className="flex justify-between items-center">
              <h2 className="my-4">Recent Projects</h2>
              <Share label="Share this!" text="Personal Website with projects, blog and photos" title="Timothy Newman Site" />
            </div>
            <div className="card-container">
              {data.allStrapiProjectPost.nodes
                ? data.allStrapiProjectPost.nodes.map((posts) => (
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
                : <p className="error-message">No projects found</p>}
            </div>
            <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
              <Link to="/project" className="read-more-link">
                Explore all projects&nbsp;
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </section>
          <section className="px-2">
            <h2 className="my-4">Recent Blog Posts</h2>
            <div className="card-container">
              {data.allStrapiBlogPost.nodes
                ? data.allStrapiBlogPost.nodes.map((posts) => (
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
                : <p className="error-message">No blog posts found</p>}
            </div>
            <div className="ml-3 mt-2 mr-1 mb-1 flex justify-end text-primary">
              <Link to="/blog" className="read-more-link">
                Read all blog posts&nbsp;
                <i className="fas fa-arrow-right" />
              </Link>
            </div>
          </section>
          <section className="px-2">
            <h2 className="my-4">All Tags</h2>
            <div className="flex flex-wrap">
              {data.allStrapiTag.nodes
                ? data.allStrapiTag.nodes.map((elem) => (
                  <Link to={`/tag/${elem.Tag}`} key={elem.Tag} className="tag-button">{elem.Tag}</Link>
                ))
                : <p className="error-message">No tags found</p>}
            </div>
          </section>
        </div>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default IndexPage;
