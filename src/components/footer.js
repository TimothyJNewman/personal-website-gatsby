/*
* Footer
*/
import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

const ButtonTextLink = [
  { text: 'Home', link: '/' },
  { text: 'About', link: '/about' },
  { text: 'CV', link: '/cv' },
  { text: 'Blog', link: '/blog' },
  { text: 'Projects', link: '/project' },
  // { text: 'Photos', link: '/photos' },
  { text: 'Contact', link: '/contact' },
];

const DropdownMenuButton = ({ text, link }) => (
  <Link className="pr-3 whitespace-nowrap hover:text-primary-dark" to={link} key={text}>
    <i className="fas fa-angle-double-right pr-1" />
    {text}
  </Link>
);

const Footer = () => (
  <footer className="bg-white text-primary">
    <div className="min-w-full">
      <div className="max-w-screen-lg mx-auto px-5 py-3">
        <div className="border-y-2 border-secondary-dark py-2">
          <p className="markdown-text">
            © 2021-
            {new Date().getFullYear()}
            &nbsp;Timothy Jabez Newman.&nbsp;
            <a href="https://github.com/TimothyJNewman/personal-website-gatsby">Source code</a>
            .&nbsp;
            <a href="/rss.xml">RSS Feed</a>
            .
            <br />
            Last gatsby build on&nbsp;
            <StaticQuery
              query={graphql`
            query BuildDateQuery {
              site {
                buildTime(formatString: "DD MMMM, YYYY")
              }
            }
          `}
              render={(data) => (
                <>
                  {data.site.buildTime}
                </>
              )}
            />
          </p>
          <div className="text-secondary-dark flex flex-wrap">
            {ButtonTextLink.map(({ text, link }) => DropdownMenuButton({ text, link }))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
