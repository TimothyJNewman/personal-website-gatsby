/*
* Header
*/
import React, { useEffect, useState } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { Link } from 'gatsby';
import logo from '../images/logo.svg';

// Source of truth for navigation
const ButtonTextLink = [
  { text: 'Home', link: '/' },
  { text: 'About', link: '/about' },
  { text: 'CV', link: '/cv' },
  { text: 'Blog', link: '/blog' },
  { text: 'Projects', link: '/project' },
  // { text: 'Photos', link: '/photos' },
  { text: 'Contact', link: '/contact' },
];

const HeaderButton = ({ text, link }) => (
  <Link to={link} key={text}>
    <button className="header-button-wrapper" type="button">
      <div className="header-button">
        {text}
      </div>
    </button>
  </Link>
);

const DropdownMenuButton = ({ text, link }) => (
  <Link className="dropdown-link" to={link} key={text}>
    <i className="fa fa-angle-double-right dropdown-icon" />
    {text}
  </Link>
);

const ChangeDataTheme = (isDarkTheme) => {
  const targetTheme = isDarkTheme ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);
};

const Header = () => {
  const [menuExpanded, toggleMenuExpansion] = useState(false);
  const [isDarkTheme, toggleTheme] = useState(false);
  // Source for dark theme: https://lukelowrey.com/css-variable-theme-switcher/
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
      if (storedTheme === 'dark') {
        toggleTheme(true);
      } else if (storedTheme === 'light') {
        toggleTheme(false);
      }
    }
  }, []);
  return (
    <header className="header-dropdownmenu-container">
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
        <div className="dropdown-header">
          {ButtonTextLink.map(({ text, link }) => HeaderButton({ text, link }))}
        </div>
        <div className="dropdown-theme-buttons">
          <button
            className="theme-button"
            aria-label="Theme Toggle"
            type="button"
            onClick={() => {
              toggleTheme(!isDarkTheme);
              ChangeDataTheme(!isDarkTheme);
            }}
          >
            <i className={`fa dropdown-burger-symbol ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`} />
          </button>
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
        </div>
      </div>
      <SmoothCollapse expanded={menuExpanded} className="dropdown-menu-container medium-col">
        <div className="dropdown-menu">
          {ButtonTextLink.map(({ text, link }) => DropdownMenuButton({ text, link }))}
        </div>
      </SmoothCollapse>
    </header>
  );
};

export default Header;
