import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import MarkdownView from 'react-showdown'
import { getFormattedDate, getFormattedLink } from "../util/CommonUtils";
import Card from '../components/card';
import Layout from '../components/layout'

const IndexPage = () => {
  const data = useStaticQuery(query);

  return (
    <Layout>
      <div className="medium-col content-text">
        <div className="blog-intro">
          <div className="intro-container">
            <div className="welcome-text-and-socials">
              {data.strapiWelcomenote
                ? <MarkdownView className="markdown-text"
                  markdown={data.strapiWelcomenote.welcometext}
                  options={{ tables: true, emoji: true, noHeaderId: true }}
                />
                : ""
              }
              <div className="social-media-icon-container">
                {data.socialmedias
                  ? data.socialmedias.map(media => (
                    <a href={media.link} key={media.id}><img src={media.image} alt={media.name} /></a>
                  ))
                  : ""
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="medium-col content-text">
        <br />
        <h2 className="blog-postlist-title">Recent Projects</h2>
        <div className="card-container">
          {data.projectposts
            ? data.projectposts.map(posts => (
              <Link to={getFormattedLink("/projects/", posts.slug)} key={posts.id}>
                <Card
                  img={posts.coverimage ? posts.coverimage.formats.medium.url : ""}
                  title={posts.title}
                  date={getFormattedDate(posts.published_at)}
                  description={posts.summary}
                  tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                  tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                  tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                />
              </Link>
            ))
            : <p className="error-message">No projects found</p>
          }
        </div>
        <p className="card-readmore">
          <Link to="/projects">Explore all projects <i className="fa fa-arrow-right"></i></Link>
        </p>
      </div>
      <div className="medium-col content-text">
        <h2 className="blog-postlist-title">Recent Blog Posts</h2>
        <div className="card-container">
          {data.blogposts
            ? data.blogposts.map(posts => (
              <Link to={getFormattedLink("/blog/", posts.slug)} key={posts.id}>
                <Card
                  title={posts.title}
                  date={getFormattedDate(posts.published_at)}
                  description={posts.summary}
                  tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                  tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                  tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                />
              </Link>
            ))
            : <p className="error-message">No blog posts found</p>
          }
        </div>
        <p className="card-readmore">
          <Link to="/blog">Read all blog posts <i className="fa fa-arrow-right"></i></Link>
        </p>
      </div>
      <div className="medium-col content-text">
        <h2 className="blog-postlist-title">All Tags</h2>
        <div className="card-tag-container-tagpage">
          {data.tags
            ? data.tags.map(elem => (
              <Link to={"/tag/" + elem.Tag} key={elem.Tag} className="card-tag-link">{elem.Tag}</Link>
            ))
            : <p className="error-message">No tags found</p>
          }
        </div>
      </div>
    </Layout>
  );
};

const query = graphql`  
  query HomeQuery {
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
    strapiWelcomenote {
      welcometext
    }
    allStrapiSocialmedia(sort: {fields: order, order: ASC}) {
      nodes {
        id
        image
        link
      }
    }
    strapiTag {
      Tag
    }
    allStrapiProjectpost(limit: 4, sort: {fields: published_at, order: DESC}) {
      nodes {
        id
        title
        coverimage {
          formats {
            medium {
              url
            }
          }
        }
        published_at
        slug
        summary
        tags {
          Tag
        }
      }
    }
  }`

export default IndexPage;