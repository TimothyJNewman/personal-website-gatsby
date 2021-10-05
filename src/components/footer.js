/*
* Footer
*/
import React from 'react';
import { Link } from 'gatsby';

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
    <i className="fa fa-angle-double-right dropdown-icon" />
    {text}
  </Link>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-dropdown-menu-container medium-col">
      <div className="dropdown-menu">
        {ButtonTextLink.map(({ text, link }) => DropdownMenuButton({ text, link }))}
      </div>
    </div>
    <p className="footer-copyright">
      © 2021 Timothy Jabez Newman. Source code can be viewed&nbsp;
      <a className="footer-link" href="https://github.com/TimothyJNewman/personal-website-gatsby">here.</a>
      &nbsp;Google analytics cookies are used in this website.
    </p>
  </footer>
);

export default Footer;
