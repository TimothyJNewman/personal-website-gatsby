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
  <Link className="dropdown-link" to={link} key={text}>
    <i className="fas fa-angle-double-right dropdown-icon" />
    {text}
  </Link>
);

const Footer = () => (
  <footer className="footer">
    <div className="max-w-3xl" style={{ width: '100%' }}>
      <div className="footer-dropdown-menu-container">
        <div className="dropdown-menu">
          {ButtonTextLink.map(({ text, link }) => DropdownMenuButton({ text, link }))}
        </div>
      </div>
      <p className="footer-copyright markdown-text">
        © 2021-
        {new Date().getFullYear()}
        &nbsp;Timothy Jabez Newman.&nbsp;
        <a className="footer-link" href="https://github.com/TimothyJNewman/personal-website-gatsby">Source code</a>
        .&nbsp;
        <a className="footer-link" href="/rss.xml">RSS Feed</a>
        .
        <br />
        Google analytics cookies are used on this website. Last gatsby build on&nbsp;
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
    </div>
  </footer>
);

export default Footer;
