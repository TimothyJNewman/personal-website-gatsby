/*
* Header
*/
import React, { useEffect, useState } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { Link } from 'gatsby';
import logo from '../images/logo-with-text.svg';

// Source of truth for navigation
const ButtonTextLink = [
  { text: 'About', link: '/about' },
  { text: 'CV', link: '/cv' },
  { text: 'Blog', link: '/blog' },
  { text: 'Projects', link: '/project' },
  // { text: 'Photos', link: '/photos' },
  { text: 'Contact', link: '/contact' },
];

const HeaderButton = ({ text, link }) => (
  <Link to={link} key={text} className="header-button-wrapper p-1 m-1">
    <button type="button">
      {text}
    </button>
  </Link>
);

const DropdownMenuButton = ({ text, link }) => (
  <Link className="pr-3 whitespace-nowrap hover:text-blue" to={link} key={text}>
    <i className="fas fa-angle-double-right pr-1" />
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
  /*  Credit: Luke Lowry
      Source for dark theme: https://lukelowrey.com/css-variable-theme-switcher/ */
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
    <header className="bg-white text-primary p-5 flex justify-center">
      <div className="min-w-full">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/">
              <div className="bg-secondary-light hover:bg-primary-dark hover:shadow-md p-2 rounded-full">
                <img src={logo} alt="logo" />
              </div>
            </Link>
            <div className="flex items-center">
              <div className="items-center sm:flex hidden px-2">
                {ButtonTextLink.map(({ text, link }) => HeaderButton({ text, link }))}
              </div>
              <div className="text-secondary bg-secondary-light rounded">
                <button
                  className="px-2 py-0.5 text-lg text-std-secondary hover:bg-primary-dark hover:shadow-md rounded-l sm:rounded"
                  aria-label="Theme Toggle"
                  type="button"
                  onClick={() => {
                    toggleTheme(!isDarkTheme);
                    ChangeDataTheme(!isDarkTheme);
                  }}
                >
                  <i className={`far ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`} />
                  <span className="hidden sm:inline">&nbsp;{isDarkTheme ? 'light' : 'dark'}</span>
                </button>
                <button
                  className="px-2 py-0.5 text-lg text-std-secondary hover:bg-primary-dark hover:shadow-md rounded-r sm:hidden"
                  aria-label="Toggle Menu"
                  type="button"
                  onClick={() => {
                    toggleMenuExpansion(!menuExpanded);
                  }}
                >
                  <i className={`fa ${!menuExpanded ? 'fa-bars' : 'fa-times'}`} />
                </button>
              </div>
            </div>
          </div>
          <SmoothCollapse expanded={menuExpanded} className="max-w-screen-md flex justify-center sm:hidden">
            <div className="my-2 text-secondary-dark">
              {ButtonTextLink.map(({ text, link }) => DropdownMenuButton({ text, link }))}
            </div>
          </SmoothCollapse>
        </div>
      </div>
    </header>
  );
};

export default Header;
