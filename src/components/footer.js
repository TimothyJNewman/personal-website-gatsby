import React from 'react';
import { Link } from 'gatsby';
import '../css/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav-dropdown-container medium-col">
        <div className="nav-dropdown">
          <Link className="nav-link" to="/about">
            <i className="fa fa-angle-double-right nav-icon" />
            About
          </Link>
          <Link className="nav-link" to="/blog">
            <i className="fa fa-angle-double-right nav-icon" />
            Blog
          </Link>
          <Link className="nav-link" to="/project">
            <i className="fa fa-angle-double-right nav-icon" />
            Projects
          </Link>
          <Link className="nav-link" to="/photos">
            <i className="fa fa-angle-double-right nav-icon" />
            Photos
          </Link>
          <Link className="nav-link" to="/contact">
            <i className="fa fa-angle-double-right nav-icon" />
            Contact
          </Link>
        </div>
      </div>
      <p className="footer-copyright">
        © 2021 Timothy Jabez Newman. All rights reserved.
        Source code can be viewed&nbsp;
        <a className="footer-link" href="https://github.com/TimothyJNewman/personal-website-reactjs"> here</a>
      </p>
    </footer>
  );
}

export default Footer;
