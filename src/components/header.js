/*
 * Header
 */
import React, { useEffect, useState } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { Link } from 'gatsby';

// Source of truth for navigation
const ButtonTextLink = [
  { text: 'About', link: '/about' },
  { text: 'CV', link: '/cv' },
  { text: 'Blog', link: '/blog' },
  { text: 'Projects', link: '/project' },
  { text: 'Photos', link: '/photography' },
  { text: 'Contact', link: '/contact' },
];

const HeaderButton = ({ text, link }) => (
  <Link to={link} key={text} className="header-button-wrapper m-1 p-1">
    {text}
  </Link>
);

const DropdownMenuButton = ({ text, link }) => (
  <Link
    className="whitespace-nowrap pr-3 hover:text-primary-dark"
    to={link}
    key={text}
  >
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
    const storedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
      if (storedTheme === 'dark') {
        toggleTheme(true);
      } else if (storedTheme === 'light') {
        toggleTheme(false);
      }
    }
  }, []);

  const [isAtTop, setIsAtTop] = useState(true);
  const handleScroll = () => {
    const isAtTopLocal = window.pageYOffset === 0;
    if (isAtTop !== isAtTopLocal) setIsAtTop(isAtTopLocal);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAtTop]);

  return (
    <>
      {/* collapsable sticky header from https://css-tricks.com/how-to-create-a-shrinking-header-on-scroll-without-javascript/ */}
      <header
        className={`sticky top-[-24px] z-10 flex bg-white text-primary sm:top-[-16px] ${isAtTop ? 'h-24 items-end' : 'h-20 shadow-md items-center'}`}
      >
        <div className="sticky top-0 h-15 min-w-full  py-2 px-4 pt-[0.6rem] sm:pt-2">
          <div className="mx-auto flex lg:w-[54rem] justify-between">
            <Link to="/">
              <h1 className='font-serif sm:text-4xl text-3xl' id="logo-with-text">
                <span className="text-timothy">T</span>
                <span className="text-timothy">i</span>
                <span className="text-timothy">m</span>
                <span className="text-timothy">o</span>
                <span className="text-timothy">t</span>
                <span className="text-timothy">h</span>
                <span className="text-timothy">y</span>
                &nbsp;
                <span className="text-timothy">N</span>
                <span className="text-timothy">e</span>
                <span className="text-timothy">w</span>
                <span className="text-timothy">m</span>
                <span className="text-timothy">a</span>
                <span className="text-timothy">n</span>
              </h1>
              {isAtTop && <span className='italic mb-2 ease-in'>welcomes you to his website</span>}
            </Link>
            <div className={`${isAtTop ? "" : 'sm:mt-[0.4rem]'}`}>
              <div className={`flex ${isAtTop ? 'items-center' : 'items-start'}`}>
                <div className="hidden px-2 sm:flex">
                  {ButtonTextLink.map(({ text, link }) =>
                    HeaderButton({ text, link })
                  )}
                </div>
                <div className="flex rounded">
                  <button
                    className="std-button flex h-8 w-8 items-center justify-center rounded-none rounded-l px-0 py-0 text-lg sm:w-fit sm:rounded sm:px-2"
                    aria-label="Theme Toggle"
                    type="button"
                    onClick={() => {
                      toggleTheme(!isDarkTheme);
                      ChangeDataTheme(!isDarkTheme);
                    }}
                  >
                    <i className={`far ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`} />
                    <span className="ml-1.5 hidden sm:inline">
                      {isDarkTheme ? 'light' : 'dark'}
                    </span>
                  </button>
                  <button
                    className="std-button flex h-8 w-8 items-center justify-center rounded-none rounded-r px-0 py-0 text-lg sm:hidden"
                    aria-label="Toggle Menu"
                    type="button"
                    onClick={() => {
                      toggleMenuExpansion(!menuExpanded);
                    }}
                  >
                    <i
                      className={`fa ${!menuExpanded ? 'fa-bars' : 'fa-times'}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SmoothCollapse
        expanded={menuExpanded}
        className={`fixed flex w-full max-w-screen-md justify-center border-y-2 border-secondary-dark bg-white text-primary sm:hidden ${isAtTop ? 'top-22' : 'top-14'}`}
      >
        <div className="my-2 mx-4 flex flex-wrap text-secondary-dark">
          {ButtonTextLink.map(({ text, link }) =>
            DropdownMenuButton({ text, link })
          )}
        </div>
      </SmoothCollapse>
    </>
  );
};

export default Header;
