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
    allStrapiProjectpost(limit: 4, sort: {fields: published_at, order: DESC}) {
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
    allStrapiBlogpost(limit: 4, sort: {fields: published_at, order: DESC}) {
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
        <section className="medium-col content-text site-intro-section">
          <div className="site-intro">
            <div className="site-intro-container">
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
                <div className="social-media-icon-container">
                  {data.allStrapiSocialmedia.nodes
                    ? data.allStrapiSocialmedia.nodes.map((media) => (
                      <a href={media.link} key={media.id}>
                        <img src={media.image} alt={media.name} />
                      </a>
                    ))
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="medium-col content-text">
          <br />
          <div className="index-share-button">
            <h2 className="index-subheader">Recent Projects</h2>
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
          <div className="read-more-container">
            <Link to="/project" className="read-more-link">
              Explore all projects&nbsp;
              <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </section>
        <section className="medium-col content-text">
          <h2 className="index-subheader">Recent Blog Posts</h2>
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
          <div className="read-more-container">
            <Link to="/blog" className="read-more-link">
              Read all blog posts&nbsp;
              <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </section>
        <section className="medium-col content-text">
          <h2 className="index-subheader">All Tags</h2>
          <div className="card-tag-container-tagpage">
            {data.allStrapiTag.nodes
              ? data.allStrapiTag.nodes.map((elem) => (
                <Link to={`/tag/${elem.Tag}`} key={elem.Tag} className="card-tag-link">{elem.Tag}</Link>
              ))
              : <p className="error-message">No tags found</p>}
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default IndexPage;
