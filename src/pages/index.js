import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import MarkdownView from 'react-showdown';
import { getFormattedDate, getFormattedLink } from '../util/common-utils';
import Card from '../components/card';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import Share from '../components/share';

const query = graphql`  
  query HomeQuery {
    strapiSmallText(label: {eq: "Welcome Text"}) {
      content
    }
    allStrapiSocialmedia(sort: {fields: order, order: ASC}) {
      nodes {
        id
        image
        link
        name
      }
    }
    allStrapiProjectpost(
      limit: 4
      sort: {fields: published_at, order: DESC}
      filter: {published_at: {gt: "1970-01-01T00:00:00Z"}}
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
        published_at
        slug
        summary
        tags {
          Tag
        }
      }
    }
    allStrapiBlogpost(
      limit: 4
      sort: {fields: published_at, order: DESC}
      filter: {published_at: {gt: "1970-01-01T00:00:00Z"}}
      ) {
      nodes {
        id
        title
        published_at
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
  return (
    <Layout>
      <LayoutSingleColumn>
        <section className="max-w-3xl py-0 px-2 site-intro-section">
          <div className="site-intro">
            <div className="p-4 m-4 site-intro-container">
              <div className="site-intro-welcome">
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
                  {data.allStrapiSocialmedia.nodes
                    ? data.allStrapiSocialmedia.nodes.map((media) => (
                      <a href={media.link} key={media.id} aria-label={media.name}>
                        <img className="w-6 h-6 mx-0.5" src={media.image} alt={media.name} />
                      </a>
                    ))
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-3xl py-0 px-2">
          <div className="flex justify-between items-center">
            <h2 className="my-4">Recent Projects</h2>
            <Share label="Share this!" text="Personal Website with projects, blog and photos" title="Timothy Newman Site" />
          </div>
          <div className="card-container">
            {data.allStrapiProjectpost.nodes
              ? data.allStrapiProjectpost.nodes.map((posts) => (
                <Card
                  alt={posts.coverimage.alternativeText}
                  title={posts.title}
                  date={getFormattedDate(posts.published_at)}
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
        <section className="max-w-3xl py-0 px-2">
          <h2 className="my-4">Recent Blog Posts</h2>
          <div className="card-container">
            {data.allStrapiBlogpost.nodes
              ? data.allStrapiBlogpost.nodes.map((posts) => (
                <Card
                  title={posts.title}
                  date={getFormattedDate(posts.published_at)}
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
        <section className="max-w-3xl py-0 px-2">
          <h2 className="my-4">All Tags</h2>
          <div className="flex flex-wrap">
            {data.allStrapiTag.nodes
              ? data.allStrapiTag.nodes.map((elem) => (
                <Link to={`/tag/${elem.Tag}`} key={elem.Tag} className="text-sm m-0.5 p-1 hover:bg-transparent focus:bg-transparent border-2 border-transparent hover:border-primary-dark focus:border-primary-dark text-std-secondary bg-primary-dark rounded">{elem.Tag}</Link>
              ))
              : <p className="error-message">No tags found</p>}
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default IndexPage;
