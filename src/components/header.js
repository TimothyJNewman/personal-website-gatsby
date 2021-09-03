import '../css/header.css';
import React, { useState } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { Link } from 'gatsby';
import ButtonHeader from './header-button';
import logo from '../images/logo.svg';

const Header = () => {
  const [menuExpanded, toggleMenuExpansion] = useState(false);
  return (
    <div className="header-dropdownmenu-container">
      <header className="header">
        <div className="header-wrapper large-col">
          <Link to="/">
            <div className="title-and-subtitle">
              <div className="header-logo-container"><img className="header-logo" src={logo} alt="logo" /></div>
              <h1 className="title">
                Timothy
                <span className="title-middlename"> Jabez </span>
                <span className="title-surname"> Newman </span>
              </h1>
              <h2 className="subtitle">Personal Website</h2>
            </div>
          </Link>
          <button
            className="dropdown-burger"
            aria-label="Toggle Menu"
            type="button"
            onClick={() => {
              toggleMenuExpansion(!menuExpanded);
            }}
          >
            <i className={`fa dropdown-burger-symbol ${!menuExpanded ? 'fa-bars' : 'fa-times'}`} />
          </button>
          <div className="nav-header">
            <ButtonHeader
              textValue="Home"
              linkValue="/"
            />
            <ButtonHeader
              textValue="About"
              linkValue="/about"
            />
            <ButtonHeader
              textValue="Blog"
              linkValue="/blog"
            />
            <ButtonHeader
              textValue="Projects"
              linkValue="/project"
            />
            <ButtonHeader
              textValue="Photos"
              linkValue="/photos"
            />
            <ButtonHeader
              textValue="Contact"
              linkValue="/contact"
            />
          </div>
        </div>
      </header>
      <SmoothCollapse expanded={menuExpanded} className="nav-dropdown-container medium-col">
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
      </SmoothCollapse>
    </div>
  );
};

export default Header;
