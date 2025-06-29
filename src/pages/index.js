import React, { useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { getSrc, getSrcSet } from 'gatsby-plugin-image';
import { getFormattedDate, getFormattedLink } from '../util/common-utils';
import ArticleCard from '../components/article-card';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import SocialMedias from '../components/social-media';

const query = graphql`
  query HomeQuery {
    imageGallery: allFile(filter: {absolutePath: {regex: "/images/home-slider/"}}) {
      nodes {
        childImageSharp {
          gatsbyImageData(aspectRatio: 1.3)
        }
      }
    }
    allProjectPost: allMdx(
      limit: 8
      sort: {frontmatter: {publishedAt: DESC}}
      filter: {internal: {contentFilePath: {regex: "/content\/project/"}}}
    ) {
      nodes {
        frontmatter {
          title
          publishedAt
          slug
          summary
          tags
          coverImage{
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
    allBlogPost: allMdx(
      limit: 8
      sort: {frontmatter: {publishedAt: DESC}}
      filter: {internal: {contentFilePath: {regex: "/content\/blog/"}}}
      ) {
      nodes {
        frontmatter {
          title
          publishedAt
          slug
          summary
          tags
          coverImage{
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
    allTag: allMdx(
      filter: {internal: {contentFilePath: {regex: "/content/"}}, frontmatter: {tags: {ne: null}}}
    ) {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(query);
  const [currentImage, setCurrentImage] = React.useState(0);
  const imagesSrc = data?.imageGallery?.nodes.map((image) =>
    getSrc(image)
  );
  const imagesSrcSet = data?.imageGallery?.nodes.map((image) =>
    getSrcSet(image)
  );
  const allTag = data.allTag.nodes.reduce(
    (acc, { frontmatter: { tags } }) => [...new Set([...acc, ...tags])], [],
  ).sort();
  useEffect(() => {
    setTimeout(
      () => setCurrentImage((currentImage + 1) % imagesSrc.length),
      4000
    );
  }, [currentImage]);

  return (
    <Layout>
      <LayoutSingleColumn>
        <section className="site-intro-section flex lg:w-[54rem] flex-col mx-2">
          <div className="grid animate-fade-in grid-cols-1 gap-4 md:grid-cols-12">
            <div className="rounded bg-white-overlay md:col-span-7 flex flex-col justify-between">
              <div><h1 className='hidden font-serif text-4xl'>Timothy Newman</h1>
                <span className='hidden italic mb-2'>welcomes you to his website</span>
                <div className='text-dategray' id="summary">
                  Greetings! I created this website in my first year of university to learn web software engineering but now I hope this is a place to showcase my work and an independent platform to publish blog posts. I work in the semiconductor industry with an interest in RF communication. Outside of my work, I enjoy programming, astronomy, photography (see slideshow), embarking on adventures in the countryside and tinkering with my Linux PC.
                </div>
              </div>
              <SocialMedias />
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
        <div className="lg:w-[54rem]">
          <section className="px-2 md:px-0" id="recentprojectssection">
            <div className="flex items-center justify-between">
              <h2 className="my-4 font-normal font-serif">Recent Projects</h2>
            </div>
            <div className="grid-cols-1 md:grid-cols-1 grid gap-4">
              {data.allProjectPost.nodes ? (
                data.allProjectPost.nodes
                  .sort((a, b) => (b.frontmatter.publishedAt - a.frontmatter.publishedAt))
                  .map((posts) => (
                    <ArticleCard
                      title={posts.frontmatter.title}
                      img={posts.frontmatter?.coverImage?.childImageSharp?.gatsbyImageData}
                      date={getFormattedDate(posts.frontmatter.publishedAt)}
                      link={getFormattedLink('/project/', posts.frontmatter.slug)}
                      description={posts.frontmatter.summary}
                      tags={posts.frontmatter.tags}
                      key={posts.frontmatter.slug}
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
          <section className="px-2 md:px-0">
            <h2 className="my-4 font-normal font-serif">Recent Blog Posts</h2>
            <div className="grid-cols-1 md:grid-cols-1 grid gap-4">
              {data.allBlogPost.nodes ? (
                data.allBlogPost.nodes
                  .sort((a, b) => (b.frontmatter.publishedAt - a.frontmatter.publishedAt))
                  .map((posts) => (
                    <ArticleCard
                      title={posts.frontmatter.title}
                      img={posts.frontmatter?.coverImage?.childImageSharp?.gatsbyImageData}
                      date={getFormattedDate(posts.frontmatter.publishedAt)}
                      link={getFormattedLink('/blog/', posts.frontmatter.slug)}
                      description={posts.frontmatter.summary}
                      tags={posts.frontmatter.tags}
                      key={posts.frontmatter.slug}
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
          <section className="px-2 md:px-0">
            <h2 className="my-4 font-normal font-serif">All Tags</h2>
            <div className="flex flex-wrap gap-1">
              {allTag ? (
                allTag.map((tag) => (
                  <Link
                    to={`/tag/${tag}`}
                    key={tag}
                    className="tag-button"
                  >
                    {tag}
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
