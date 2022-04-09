/*
* Header
*/
import React, { useEffect, useState } from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import { Link } from 'gatsby';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

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
    {text}
  </Link>
);

const DropdownMenuButton = ({ text, link }) => (
  <Link className="pr-3 whitespace-nowrap hover:text-primary-dark" to={link} key={text}>
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
    <header className="bg-white text-primary flex justify-center">
      <div className="min-w-full">
        <div className="max-w-screen-lg mx-auto p-5">
          <div className="flex justify-between items-center">
            <Link to="/">
              <div id="logo-with-text" className="bg-secondary-light hover:bg-primary-dark hover:shadow-md p-2 rounded-full">
                <svg
                  width="90"
                  height="30"
                  alt="logo">
                  <g transform="matrix(1.25,0,0,-1.25,0,30)">
                    <g
                      id="penguin"
                      style={{ fill: "#f2f2f2", fillOpacity: 1 }}>
                      <g
                        clipPath="M 0,24 24,24 24,0 0,0 0,24 z"
                        style={{ fill: "#f2f2f2", fillOpacity: 1 }}>
                        <g
                          transform="translate(4.4448,6.9648)"
                          style={{ fill: "#f2f2f2", fillOpacity: 1 }}>
                          <path
                            d="m 0,0 c -0.033,3.313 1.667,5.014 1.697,8.982 0.004,1.922 1.017,3.598 2.53,4.556 C 5.692,13.7 7.377,12.992 7.662,10.544 7.783,9.502 7.685,7.84 7.671,5.912 2.63,2.436 4.705,-2.884 5.324,-2.884 c 0.542,0 0.444,2.028 2.649,3.789 0.275,-1.815 0.793,-3.621 1.734,-5.219 l -8.651,0 C 0.733,-3.851 0.002,-2.545 0,0 m 16.595,-4.505 c -3.474,3.347 -1.688,10.151 -2.95,14.942 l -10e-4,0 c -0.665,3.001 -3.34,5.248 -6.542,5.248 -3.325,0 -6.076,-2.422 -6.605,-5.595 L -1.979,8.991 0.354,8.111 C 0.127,5.208 -1.269,3.49 -1.299,0 c -0.004,-2.063 0.445,-3.45 0.866,-4.314 l -2.168,0 0,-1.3 3.076,0 0.269,0 16.964,0 -1.113,1.109 z"
                            style={{ fill: "#f2f2f2", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }} />
                        </g>
                        <g
                          transform="translate(9.4946,17.5088)"
                          style={{ fill: "#f2f2f2", fillOpacity: 1 }}>
                          <path
                            d="M 0,0 C 0,0.496 -0.4,0.895 -0.896,0.895 -1.389,0.895 -1.79,0.496 -1.79,0 c 0,-0.496 0.401,-0.895 0.894,-0.895 C -0.4,-0.895 0,-0.496 0,0"
                            style={{ fill: "#f2f2f2", fillOpacity: 1, fillRule: "nonzero", stroke: "none" }} />
                        </g>
                      </g>
                    </g>
                    <g
                      transform="scale(1,-1)"
                      id="text-timothy"
                      style={{ fill: "#f2f2f2", fillOpacity: 1, stroke: "none" }}>
                      <path
                        d="m 20.739187,-19.125735 0.197412,-2.340063 6.354321,0 0.19773,2.340063 -0.259937,0 c -0.02773,-0.312088 -0.05375,-0.558271 -0.07808,-0.73855 -0.02434,-0.180268 -0.06597,-0.355304 -0.12489,-0.52511 -0.05893,-0.169793 -0.124791,-0.296323 -0.197571,-0.379589 -0.07279,-0.08325 -0.178481,-0.157786 -0.317065,-0.223597 -0.138597,-0.0658 -0.298028,-0.107374 -0.478296,-0.124731 -0.180279,-0.01734 -0.405621,-0.02602 -0.676025,-0.02603 -0.319081,6e-6 -0.516704,0.0069 -0.592871,0.02063 -0.08316,0.02095 -0.135157,0.06089 -0.155994,0.119813 -0.02085,0.05893 -0.03127,0.150816 -0.03126,0.275646 l 0,5.480567 c -5e-6,0.138802 0.01385,0.235921 0.04158,0.291357 0.02771,0.05544 0.121341,0.103943 0.280884,0.14552 0.159533,0.04158 0.416083,0.06237 0.769653,0.06237 l 0.415771,0 0,0.322461 c -0.284168,-0.02074 -0.942843,-0.0311 -1.976025,-0.0311 -1.025995,0 -1.681179,0.01037 -1.965552,0.0311 l 0,-0.322461 0.416089,0 c 0.353562,0 0.610113,-0.02079 0.769653,-0.06237 0.159535,-0.04158 0.253163,-0.09008 0.280884,-0.14552 0.02772,-0.05544 0.04157,-0.152555 0.04158,-0.291357 l 0,-5.480567 c -3e-6,-0.09711 -0.0035,-0.16646 -0.01047,-0.208044 -0.007,-0.04157 -0.02608,-0.07971 -0.05729,-0.114416 -0.03121,-0.03469 -0.08147,-0.05897 -0.150757,-0.07284 -0.0693,-0.01385 -0.256501,-0.02078 -0.561608,-0.02079 -0.270413,6e-6 -0.495754,0.0087 -0.676026,0.02603 -0.180275,0.01736 -0.33976,0.05893 -0.478454,0.124731 -0.138698,0.06581 -0.244439,0.140343 -0.317225,0.223597 -0.07279,0.08327 -0.138644,0.209796 -0.19757,0.379589 -0.05893,0.169806 -0.100506,0.344842 -0.124732,0.52511 -0.02423,0.180279 -0.0502,0.426462 -0.07792,0.73855 z"
                        id="timothy-0-t"
                        className="text-timothy"
                      />
                      <path
                        d="m 28.223391,-14.424978 0,-0.322461 c 0.367528,0 0.594616,-0.02253 0.681262,-0.0676 0.08664,-0.04507 0.129967,-0.178474 0.129968,-0.400219 l 0,-2.79773 c -1e-6,-0.256441 -0.04332,-0.415873 -0.129968,-0.478296 -0.08665,-0.06241 -0.299875,-0.09362 -0.639685,-0.09363 l 0,-0.322461 1.456152,-0.114257 0,3.816528 c -2e-6,0.207992 0.03639,0.336267 0.10918,0.384826 0.07278,0.04856 0.279083,0.07284 0.618896,0.07284 l 0,0.322461 c -0.707342,-0.02074 -1.067888,-0.0311 -1.08164,-0.0311 -0.09712,0 -0.478509,0.01037 -1.144165,0.0311 z m 0.437036,-6.406372 c -10e-7,-0.138584 0.05369,-0.265114 0.161072,-0.37959 0.10738,-0.114462 0.237348,-0.171697 0.389905,-0.171704 0.152553,7e-6 0.282574,0.052 0.390063,0.155994 0.107485,0.104002 0.161229,0.235769 0.16123,0.3953 -1e-6,0.159544 -0.05374,0.291311 -0.16123,0.3953 -0.107489,0.104002 -0.23751,0.156 -0.390063,0.155994 -0.159328,6e-6 -0.290989,-0.05548 -0.394983,-0.166467 -0.103997,-0.110972 -0.155995,-0.239248 -0.155994,-0.384827 z"
                        id="timothy-1-i"
                        className="text-timothy"
                      />
                      <path
                        d="m 31.138234,-14.424978 0,-0.322461 c 0.367317,0 0.594299,-0.02253 0.680945,-0.0676 0.08665,-0.04507 0.129967,-0.178474 0.129968,-0.400219 l 0,-2.787256 c -1e-6,-0.256653 -0.04502,-0.417884 -0.135046,-0.483692 -0.09003,-0.0658 -0.315321,-0.0987 -0.675867,-0.09871 l 0,-0.322461 1.466309,-0.114257 0,1.091796 c 0.325844,-0.72786 0.838946,-1.091792 1.539306,-1.091796 0.811015,4e-6 1.272066,0.339709 1.383155,1.019116 0.11785,-0.263424 0.301561,-0.499133 0.551135,-0.707129 0.249563,-0.207987 0.56848,-0.311983 0.95675,-0.311987 0.520078,4e-6 0.884116,0.128227 1.092115,0.384668 0.152547,0.173295 0.244377,0.357006 0.275488,0.551135 0.0311,0.194136 0.04665,0.54077 0.04666,1.039905 l 0,1.986499 c 0.007,0.145573 0.06595,0.233964 0.176941,0.265173 0.11097,0.03121 0.3224,0.04681 0.63429,0.04681 l 0,0.322461 c -0.707137,-0.02074 -1.095402,-0.0311 -1.164795,-0.0311 -0.05544,0 -0.447094,0.01037 -1.174951,0.0311 l 0,-0.322461 c 0.367311,0 0.594292,-0.02253 0.680944,-0.0676 0.08664,-0.04507 0.129962,-0.178474 0.129969,-0.400219 l 0,-2.423218 c -7e-6,-0.353561 -0.0537,-0.634392 -0.161072,-0.842493 -0.107388,-0.208093 -0.310142,-0.312141 -0.608264,-0.312146 -0.360553,5e-6 -0.684706,0.150814 -0.972461,0.452429 -0.287765,0.301624 -0.431646,0.705493 -0.431641,1.211609 l 0,1.913819 c -5e-6,0.221745 0.04332,0.355151 0.129968,0.400219 0.08664,0.04507 0.313728,0.0676 0.681263,0.0676 l 0,0.322461 c -0.707134,-0.02074 -1.095399,-0.0311 -1.164795,-0.0311 -0.05544,0 -0.447197,0.01037 -1.175269,0.0311 l 0,-0.322461 c 0.367526,0 0.594613,-0.02253 0.681262,-0.0676 0.08664,-0.04507 0.129965,-0.178474 0.129969,-0.400219 l 0,-2.423218 c -4e-6,-0.353561 -0.05375,-0.634392 -0.161231,-0.842493 -0.107491,-0.208093 -0.310298,-0.312141 -0.608423,-0.312146 -0.360549,5e-6 -0.684703,0.150814 -0.972461,0.452429 -0.287762,0.301624 -0.431642,0.705493 -0.43164,1.211609 l 0,1.913819 c -2e-6,0.221745 0.04337,0.355151 0.130127,0.400219 0.08675,0.04507 0.313783,0.0676 0.681103,0.0676 l 0,0.322461 c -0.707131,-0.02074 -1.095395,-0.0311 -1.164795,-0.0311 -0.05544,0 -0.447087,0.01037 -1.174951,0.0311 z"
                        id="timothy-2-m"
                        className="text-timothy"
                      />
                      <path
                        d="m 40.476589,-14.986428 c -0.457455,-0.450683 -0.686182,-1.005362 -0.686181,-1.664038 -10e-7,-0.658673 0.223595,-1.228956 0.670788,-1.710852 0.447191,-0.481889 0.993142,-0.722835 1.637854,-0.72284 0.630954,5e-6 1.171774,0.239205 1.622461,0.717603 0.450679,0.478405 0.67602,1.050434 0.676025,1.716089 -5e-6,0.651694 -0.227092,1.204574 -0.681262,1.658642 -0.454178,0.454069 -0.996744,0.681103 -1.627698,0.681104 -0.616994,-10e-7 -1.154322,-0.225236 -1.611987,-0.675708 z m 0.176782,-1.747193 c -10e-7,0.67243 0.08664,1.161199 0.259937,1.466309 0.270408,0.464437 0.665655,0.696655 1.185742,0.696655 0.256442,0 0.492152,-0.06929 0.707129,-0.207886 0.21497,-0.13859 0.381385,-0.325845 0.499243,-0.561767 0.152551,-0.304898 0.228829,-0.769334 0.228833,-1.393311 -4e-6,-0.665654 -0.09014,-1.147547 -0.27041,-1.445678 -0.270414,-0.45068 -0.662169,-0.676021 -1.175269,-0.676026 -0.221747,5e-6 -0.441851,0.05893 -0.660315,0.176782 -0.218466,0.117859 -0.393503,0.29115 -0.525109,0.519873 -0.166522,0.305115 -0.249782,0.78013 -0.249781,1.425049 z"
                        id="timothy-3-o"
                        className="text-timothy"
                      />
                      <path
                        d="m 44.896778,-18.584915 0,-0.228833 c 0.318864,-0.01396 0.584037,-0.133613 0.79552,-0.35896 0.211482,-0.225336 0.353616,-0.47665 0.426404,-0.753942 0.07279,-0.277281 0.11267,-0.575356 0.119654,-0.894226 l 0.259936,0 0,1.9135 1.487256,0 0,0.322461 -1.487256,0 0,2.89104 c -2e-6,0.748813 0.232216,1.123218 0.696655,1.123218 0.201218,0 0.367685,-0.10225 0.499402,-0.30675 0.131711,-0.2045 0.197568,-0.490515 0.197571,-0.858045 l 0,-0.571924 0.259936,0 0,0.592871 c -3e-6,0.374301 -0.08665,0.70184 -0.259936,0.982618 -0.173294,0.280778 -0.429845,0.421166 -0.769653,0.421167 -0.12484,-10e-7 -0.249677,-0.01555 -0.374512,-0.04666 -0.124839,-0.0311 -0.266974,-0.08828 -0.426404,-0.171545 -0.159433,-0.08326 -0.289401,-0.22714 -0.389905,-0.431641 -0.100505,-0.204499 -0.150758,-0.455813 -0.150756,-0.753943 l 0,-2.87041 z"
                        id="timothy-4-t"
                        className="text-timothy"
                      />
                      <path
                        d="m 49.053859,-14.424978 0,-0.322461 c 0.367317,0 0.594298,-0.02253 0.680945,-0.0676 0.08664,-0.04507 0.129967,-0.178474 0.129968,-0.400219 l 0,-5.408203 c -1e-6,-0.256439 -0.04502,-0.417617 -0.135046,-0.483533 -0.09003,-0.0659 -0.315321,-0.09886 -0.675867,-0.09886 l 0,-0.322461 1.497412,-0.114258 0,3.619117 0.01047,0 c 0.11087,-0.249459 0.291143,-0.478186 0.54082,-0.686182 0.249672,-0.207987 0.568641,-0.311983 0.956909,-0.311987 0.519869,4e-6 0.883801,0.128227 1.091797,0.384668 0.152551,0.173295 0.244433,0.357006 0.275647,0.551135 0.0312,0.194136 0.04681,0.54077 0.04681,1.039905 l 0,1.986499 c 0.007,0.145573 0.06591,0.233964 0.176782,0.265173 0.110867,0.03121 0.32235,0.04681 0.634448,0.04681 l 0,0.322461 c -0.707133,-0.02074 -1.095398,-0.0311 -1.164795,-0.0311 -0.05544,0 -0.447196,0.01037 -1.175268,0.0311 l 0,-0.322461 c 0.367526,0 0.594613,-0.02253 0.681262,-0.0676 0.08664,-0.04507 0.129964,-0.178474 0.129968,-0.400219 l 0,-2.423218 c -4e-6,-0.353561 -0.05375,-0.634392 -0.16123,-0.842493 -0.107491,-0.208093 -0.310298,-0.312141 -0.608423,-0.312146 -0.36055,5e-6 -0.684703,0.150814 -0.972461,0.452429 -0.287762,0.301624 -0.431642,0.705493 -0.43164,1.211609 l 0,1.913819 c -2e-6,0.221745 0.04337,0.355151 0.130126,0.400219 0.08675,0.04507 0.313784,0.0676 0.681104,0.0676 l 0,0.322461 c -0.707131,-0.02074 -1.095395,-0.0311 -1.164795,-0.0311 -0.05544,0 -0.447088,0.01037 -1.174951,0.0311 z"
                        id="timothy-5-h"
                        className="text-timothy"
                      />
                      <path
                        d="m 54.707714,-13.135452 c 0,-0.145574 0.04332,-0.256499 0.129969,-0.332776 0.08665,-0.07628 0.188895,-0.114417 0.30675,-0.114416 0.124837,-10e-7 0.228832,0.03988 0.311987,0.119653 0.08315,0.07977 0.124731,0.185456 0.124732,0.317065 -1e-6,0.256656 -0.135206,0.402334 -0.405615,0.437037 0.131819,0.124835 0.294742,0.187253 0.488769,0.187255 0.20799,-2e-6 0.395193,-0.07628 0.561609,-0.228833 0.166413,-0.152556 0.286013,-0.301673 0.358801,-0.447351 0.07279,-0.145679 0.161229,-0.350232 0.265332,-0.613659 0.09712,-0.207992 0.183762,-0.412492 0.259937,-0.613501 l -1.559937,-3.795899 c -0.0694,-0.166516 -0.1561,-0.268819 -0.260095,-0.306909 -0.103996,-0.03808 -0.298076,-0.05712 -0.582239,-0.05713 l 0,-0.322461 c 0.311881,0.02074 0.648095,0.03111 1.008643,0.0311 0.214973,4e-6 0.592869,-0.01036 1.133691,-0.0311 l 0,0.322461 c -0.388267,5e-6 -0.582399,0.09014 -0.582397,0.270411 -2e-6,0.02074 0.02073,0.08316 0.06221,0.187255 l 1.154639,2.797412 1.050219,-2.558422 c 0.04168,-0.0969 0.06252,-0.180059 0.06252,-0.249463 -4e-6,-0.284371 -0.162927,-0.433435 -0.48877,-0.447193 l 0,-0.322461 c 0.457451,0.02074 0.75907,0.03111 0.904859,0.0311 0.284158,4e-6 0.544094,-0.01036 0.779809,-0.0311 l 0,0.322461 c -0.464442,5e-6 -0.786796,0.221855 -0.967065,0.665552 l -1.830347,4.44082 c -0.332831,0.790282 -0.776637,1.185423 -1.331421,1.185425 -0.263428,-2e-6 -0.488717,-0.08146 -0.675866,-0.244385 -0.187151,-0.162925 -0.280726,-0.362241 -0.280726,-0.597949 z"
                        id="timothy-6-y"
                        className="text-timothy"
                      />
                    </g>
                    <g
                      transform="scale(1,-1)"
                      id="text-newman"
                      style={{ fill: "#f2f2f2", fillOpacity: 1, stroke: "none" }}>
                      <path
                        d="m 30.46584,-3.3941131 0,-0.3224609 c 0.249674,3e-7 0.454227,-0.024279 0.61366,-0.072839 0.159431,-0.048559 0.26861,-0.1195999 0.327539,-0.2131226 0.05893,-0.093521 0.09532,-0.1714917 0.10918,-0.2339111 0.01386,-0.062418 0.02079,-0.1456777 0.02079,-0.2497803 l 0,-5.4288328 c -1e-6,-0.096901 -0.01211,-0.1575212 -0.03634,-0.1818602 -0.02423,-0.02433 -0.09527,-0.04337 -0.213123,-0.05713 -0.207992,-0.01396 -0.381283,-0.02094 -0.519873,-0.02095 l -0.301831,0 0,-0.322461 1.76814,0 c 0.09712,8e-6 0.159535,0.007 0.187256,0.02095 0.02772,0.01397 0.0658,0.05206 0.114257,0.114258 l 3.671167,5.3977291 0,-4.4408201 c -6e-6,-0.1038839 -0.0069,-0.1870381 -0.02079,-0.2494629 -0.01387,-0.062412 -0.05026,-0.1404355 -0.10918,-0.2340698 -0.05893,-0.093621 -0.168113,-0.1647153 -0.327539,-0.2132813 -0.159437,-0.04855 -0.363991,-0.07283 -0.61366,-0.07284 l 0,-0.322461 c 0.728071,0.02096 1.133686,0.03143 1.216846,0.03142 0.08315,7e-6 0.488763,-0.01047 1.216846,-0.03142 l 0,0.322461 c -0.249682,7e-6 -0.454235,0.02429 -0.61366,0.07284 -0.159439,0.04857 -0.268618,0.11966 -0.327539,0.2132813 -0.05893,0.093634 -0.09533,0.1716575 -0.10918,0.2340698 -0.01386,0.062425 -0.02079,0.145579 -0.02079,0.2494629 l 0,5.7408201 c -7e-6,0.1108725 -0.0069,0.1836589 -0.02079,0.2183594 -0.01387,0.034701 -0.0555,0.052051 -0.12489,0.052051 -0.04846,0 -0.107387,-0.045068 -0.176782,-0.135205 l -4.243091,-6.2400633 c -0.02772,-0.041465 -0.06242,-0.083042 -0.104101,-0.1247314 l 0,5.4078855 c -2e-6,0.1041026 0.0069,0.1873626 0.02079,0.2497803 0.01386,0.062419 0.05025,0.1403897 0.10918,0.2339111 0.05892,0.093523 0.168105,0.1645634 0.327539,0.2131226 0.159429,0.04856 0.363982,0.07284 0.613659,0.072839 l 0,0.3224609 c -0.728078,-0.020736 -1.133693,-0.031103 -1.216845,-0.031103 -0.08316,10e-8 -0.488771,0.010368 -1.216846,0.031103 z"
                        id="newman-0-n"
                        className="text-newman"
                      />
                      <path
                        d="m 38.214106,-5.6821257 c 0,-0.6516897 0.209684,-1.2098068 0.629053,-1.6743529 0.419367,-0.4645382 0.93067,-0.6968093 1.533911,-0.696814 0.610219,4.7e-6 1.073068,0.1975753 1.38855,0.5927124 0.315474,0.3951453 0.473213,0.8769848 0.473218,1.44552 -5e-6,0.104104 -0.01386,0.1665755 -0.04158,0.1874145 -0.02772,0.020844 -0.100509,0.031265 -0.21836,0.031262 l -2.901831,0 c -10e-7,0.7071306 0.103995,1.2271089 0.311988,1.5599365 0.291355,0.4644372 0.683111,0.6966554 1.175268,0.6966552 0.0694,2e-7 0.14393,-0.00693 0.223596,-0.020788 0.07966,-0.013859 0.202699,-0.050252 0.369116,-0.1091797 0.166411,-0.058927 0.322458,-0.1681067 0.46814,-0.3275391 0.145675,-0.1594312 0.260091,-0.3639842 0.34325,-0.6136596 0.02073,-0.097118 0.0658,-0.1456774 0.135205,-0.1456787 0.09013,1.3e-6 0.1352,0.041684 0.135205,0.1250488 -5e-6,0.06242 -0.03296,0.1611786 -0.09887,0.2962768 -0.06591,0.1351001 -0.161287,0.2841641 -0.286121,0.4471924 -0.124841,0.1630293 -0.308552,0.3051638 -0.551135,0.4264038 -0.242589,0.1212402 -0.509561,0.1818602 -0.800915,0.1818603 -0.610012,-10e-8 -1.143796,-0.2305255 -1.601355,-0.6915771 -0.457561,-0.4610504 -0.686341,-1.0312809 -0.686341,-1.7106933 z m 0.873438,-0.3329345 2.464795,0 c -4e-6,-0.1455702 -0.01212,-0.2998181 -0.03634,-0.4627442 -0.02423,-0.1629199 -0.07274,-0.3570522 -0.14552,-0.5823974 -0.07279,-0.2253379 -0.194135,-0.4090495 -0.364038,-0.5511352 -0.169908,-0.1420774 -0.379698,-0.2131182 -0.62937,-0.2131226 -0.110874,4.4e-6 -0.226984,0.024284 -0.348327,0.072839 -0.121348,0.048564 -0.254808,0.1300254 -0.400379,0.2443847 -0.145574,0.1143676 -0.268613,0.3015704 -0.369116,0.5616089 -0.100506,0.2600456 -0.15774,0.5702341 -0.171704,0.9305664 z"
                        id="newman-1-e"
                        className="text-newman"
                      />
                      <path
                        d="m 42.741255,-7.5540494 0,-0.322461 c 0.374299,0.02074 0.696654,0.031108 0.967065,0.031104 0.131819,4.4e-6 0.509715,-0.010363 1.133692,-0.031104 l 0,0.322461 c -0.409003,4.1e-6 -0.613503,0.093632 -0.613501,0.2808837 -2e-6,0.041475 0.01724,0.103788 0.05173,0.1869385 l 0.988013,2.7767821 0.894384,-2.5165282 c -0.124629,-0.3398074 -0.204292,-0.5305543 -0.238989,-0.5722412 -0.08316,-0.1038858 -0.301622,-0.1558308 -0.655395,-0.1558349 l 0,-0.322461 c 0.31209,0.02074 0.620691,0.031108 0.925805,0.031104 0.117851,4.4e-6 0.478398,-0.010363 1.081641,-0.031104 l 0,0.322461 c -0.409217,4.1e-6 -0.613823,0.093632 -0.613818,0.2808837 -5e-6,0.027722 0.01735,0.093526 0.05205,0.1974121 l 1.02959,2.9015136 0.946436,-2.6622069 c 0.03469,-0.090133 0.05204,-0.1629196 0.05205,-0.2183594 -6e-6,-0.1525515 -0.05375,-0.2721518 -0.16123,-0.3588012 -0.107493,-0.086641 -0.254864,-0.1334554 -0.442114,-0.1404419 l 0,-0.322461 c 0.395241,0.02074 0.717702,0.031108 0.967382,0.031104 0.277386,4.4e-6 0.530446,-0.010363 0.75918,-0.031104 l 0,0.322461 c -0.429955,0.013757 -0.721206,0.2356077 -0.873755,0.6655517 l -1.216528,3.4112303 c -0.07639,0.1248372 -0.14579,0.1906412 -0.208203,0.1974121 -0.09014,-1e-7 -0.159437,-0.065804 -0.207886,-0.1974121 l -1.061011,-2.9535643 -1.050219,2.9430907 c -0.02772,0.083154 -0.05375,0.1385905 -0.07808,0.1663086 -0.02434,0.027718 -0.06766,0.041577 -0.129969,0.041577 -0.06232,-10e-8 -0.107383,-0.017297 -0.135205,-0.051892 -0.02783,-0.034595 -0.0556,-0.093469 -0.08331,-0.1766236 l -1.310156,-3.6816405 c -0.06242,-0.1595338 -0.138697,-0.2600911 -0.228833,-0.3016723 -0.09014,-0.041573 -0.270411,-0.062362 -0.54082,-0.062366 z"
                        id="newman-2-w"
                        className="text-newman"
                      />
                      <path
                        d="m 50.402559,-3.3941131 0,-0.3224609 c 0.367316,3e-7 0.594298,-0.022534 0.680944,-0.067603 0.08664,-0.045068 0.129967,-0.1784744 0.129969,-0.4002197 l 0,-2.7872558 c -2e-6,-0.2566531 -0.04502,-0.4178834 -0.135047,-0.4836914 -0.09003,-0.0658 -0.31532,-0.098702 -0.675866,-0.098706 l 0,-0.322461 1.466308,-0.1142578 0,1.0917969 c 0.325844,-0.7278604 0.838946,-1.0917923 1.539307,-1.0917969 0.811014,4.6e-6 1.272065,0.3397097 1.383154,1.0191162 0.11785,-0.2634239 0.301561,-0.4991333 0.551135,-0.7071289 0.249563,-0.207987 0.56848,-0.3119827 0.956751,-0.3119873 0.520077,4.6e-6 0.884115,0.1282272 1.092114,0.384668 0.152548,0.173295 0.244377,0.3570066 0.275488,0.5511352 0.0311,0.194136 0.04665,0.5407705 0.04666,1.0399048 l 0,1.9864989 c 0.007,0.1455734 0.06596,0.2339644 0.176941,0.2651733 0.11097,0.03121 0.3224,0.046814 0.63429,0.046814 l 0,0.3224609 c -0.707137,-0.020736 -1.095401,-0.031103 -1.164795,-0.031103 -0.05544,1e-7 -0.447094,0.010368 -1.174951,0.031103 l 0,-0.3224609 c 0.367311,3e-7 0.594292,-0.022534 0.680945,-0.067603 0.08664,-0.045068 0.129961,-0.1784744 0.129968,-0.4002197 l 0,-2.4232177 c -7e-6,-0.3535609 -0.0537,-0.6343915 -0.161072,-0.8424927 -0.107388,-0.208093 -0.310142,-0.3121416 -0.608264,-0.312146 -0.360553,4.4e-6 -0.684706,0.150814 -0.972461,0.4524292 -0.287765,0.3016231 -0.431645,0.7054923 -0.431641,1.2116089 l 0,1.9138183 c -4e-6,0.2217453 0.04332,0.3551518 0.129969,0.4002197 0.08664,0.045069 0.313727,0.067603 0.681262,0.067603 l 0,0.3224609 c -0.707134,-0.020736 -1.095398,-0.031103 -1.164795,-0.031103 -0.05544,1e-7 -0.447196,0.010368 -1.175269,0.031103 l 0,-0.3224609 c 0.367526,3e-7 0.594613,-0.022534 0.681263,-0.067603 0.08664,-0.045068 0.129964,-0.1784744 0.129968,-0.4002197 l 0,-2.4232177 c -4e-6,-0.3535609 -0.05375,-0.6343915 -0.161231,-0.8424927 -0.10749,-0.208093 -0.310298,-0.3121416 -0.608422,-0.312146 -0.36055,4.4e-6 -0.684703,0.150814 -0.972461,0.4524292 -0.287763,0.3016231 -0.431643,0.7054923 -0.431641,1.2116089 l 0,1.9138183 c -2e-6,0.2217453 0.04337,0.3551518 0.130127,0.4002197 0.08675,0.045069 0.313784,0.067603 0.681104,0.067603 l 0,0.3224609 c -0.707131,-0.020736 -1.095396,-0.031103 -1.164795,-0.031103 -0.05544,1e-7 -0.447088,0.010368 -1.174951,0.031103 z"
                        id="newman-3-m"
                        className="text-newman"
                      />
                      <path
                        d="m 59.200091,-4.3821257 c 0,-0.5892725 0.346687,-1.0399556 1.040064,-1.3520508 0.415981,-0.2010065 1.053814,-0.3257378 1.913501,-0.3741943 l 0,-0.3849853 c -4e-6,-0.4297328 -0.112675,-0.7590171 -0.338013,-0.987854 -0.225345,-0.2288287 -0.480097,-0.3432451 -0.764258,-0.3432495 -0.506122,4.4e-6 -0.880527,0.1594363 -1.123218,0.4782959 0.20799,0.00699 0.348379,0.062475 0.421167,0.1664673 0.07279,0.1039994 0.109178,0.2079422 0.10918,0.3118286 -2e-6,0.1388054 -0.04332,0.2532747 -0.129968,0.3434082 -0.08665,0.09014 -0.202756,0.135208 -0.348328,0.135205 -0.138803,3e-6 -0.253219,-0.04332 -0.343249,-0.1299682 -0.09003,-0.086642 -0.135048,-0.2062426 -0.135047,-0.3588013 -10e-7,-0.3398073 0.152502,-0.6206379 0.457508,-0.8424926 0.305003,-0.221846 0.675864,-0.3327712 1.112585,-0.3327759 0.568535,4.7e-6 1.043551,0.1906458 1.425049,0.5719238 0.117851,0.1178588 0.206242,0.2530637 0.265173,0.4056152 0.05892,0.1525589 0.09183,0.2790887 0.09871,0.3795899 0.0069,0.1005077 0.01031,0.247879 0.01031,0.4421142 l 0,2.0798095 c -4e-6,0.041684 0.0069,0.09548 0.02079,0.1613892 0.01385,0.06591 0.05199,0.1421879 0.114416,0.228833 0.06241,0.086646 0.145674,0.1299685 0.24978,0.1299682 0.249458,3e-7 0.37419,-0.2218501 0.374195,-0.6655517 l 0,-0.5823975 0.260254,0 0,0.5823975 c -6e-6,0.3673182 -0.09707,0.6238162 -0.291199,0.7694946 -0.194137,0.1456787 -0.38134,0.218518 -0.561609,0.218518 -0.228943,0 -0.416199,-0.084953 -0.561768,-0.2548583 -0.145576,-0.1699053 -0.22873,-0.3692215 -0.249462,-0.5979492 -0.104105,0.2634282 -0.275756,0.4800418 -0.514954,0.6498412 -0.239204,0.1697998 -0.521727,0.2546996 -0.847571,0.2546997 -0.249676,-1e-7 -0.492368,-0.031157 -0.728076,-0.093469 -0.235711,-0.062313 -0.450632,-0.1801675 -0.644763,-0.3535644 -0.194133,-0.1733963 -0.291199,-0.3918084 -0.291199,-0.6552368 z m 0.800757,-0.010474 c -10e-7,0.2566577 0.09188,0.4681931 0.275647,0.634607 0.183763,0.1664145 0.403973,0.2496216 0.660632,0.2496215 0.291144,10e-8 0.566684,-0.1126706 0.826624,-0.3380127 0.259933,-0.2253411 0.389901,-0.559968 0.389905,-1.0038818 l 0,-1.039746 c -0.769551,0.027721 -1.320738,0.1940819 -1.653565,0.4990844 -0.33283,0.3050066 -0.499244,0.6377821 -0.499243,0.9983276 z"
                        id="newman-4-a"
                        className="text-newman"
                      />
                      <path
                        d="m 64.296306,-3.3941131 0,-0.3224609 c 0.367317,3e-7 0.594298,-0.022534 0.680945,-0.067603 0.08664,-0.045068 0.129967,-0.1784744 0.129968,-0.4002197 l 0,-2.7872558 c -10e-7,-0.2566531 -0.04502,-0.4178834 -0.135046,-0.4836914 -0.09003,-0.0658 -0.315321,-0.098702 -0.675867,-0.098706 l 0,-0.322461 1.466308,-0.1142578 0,1.0917969 c 0.325845,-0.7278604 0.838946,-1.0917923 1.539307,-1.0917969 0.519869,4.6e-6 0.883801,0.1282272 1.091797,0.384668 0.152551,0.173295 0.244433,0.3570066 0.275647,0.5511352 0.0312,0.194136 0.04681,0.5407705 0.04681,1.0399048 l 0,1.9864989 c 0.007,0.1455734 0.06591,0.2339644 0.176782,0.2651733 0.110867,0.03121 0.32235,0.046814 0.634448,0.046814 l 0,0.3224609 c -0.707134,-0.020736 -1.095398,-0.031103 -1.164795,-0.031103 -0.05544,1e-7 -0.447196,0.010368 -1.175268,0.031103 l 0,-0.3224609 c 0.367525,3e-7 0.594613,-0.022534 0.681262,-0.067603 0.08664,-0.045068 0.129964,-0.1784744 0.129968,-0.4002197 l 0,-2.4232177 c -4e-6,-0.3535609 -0.05375,-0.6343915 -0.16123,-0.8424927 -0.107491,-0.208093 -0.310298,-0.3121416 -0.608423,-0.312146 -0.36055,4.4e-6 -0.684703,0.150814 -0.972461,0.4524292 -0.287762,0.3016231 -0.431642,0.7054923 -0.431641,1.2116089 l 0,1.9138183 c -10e-7,0.2217453 0.04337,0.3551518 0.130127,0.4002197 0.08675,0.045069 0.313784,0.067603 0.681104,0.067603 l 0,0.3224609 c -0.707131,-0.020736 -1.095396,-0.031103 -1.164795,-0.031103 -0.05544,1e-7 -0.447088,0.010368 -1.174951,0.031103 z"
                        id="newman-5-n"
                        className="text-newman"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </Link>
            <div className="flex items-center">
              <div className="items-center sm:flex hidden px-2">
                {ButtonTextLink.map(({ text, link }) => HeaderButton({ text, link }))}
              </div>
              <div className="rounded">
                <button
                  className="std-button py-0.5 text-lg rounded-none rounded-l sm:rounded"
                  aria-label="Theme Toggle"
                  type="button"
                  onClick={() => {
                    toggleTheme(!isDarkTheme);
                    ChangeDataTheme(!isDarkTheme);
                    trackCustomEvent({
                      // string - required - The object that was interacted with (e.g.video)
                      category: 'Theme toggle button',
                      // string - required - Type of interaction (e.g. 'play')
                      action: 'Click',
                      // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
                      label: 'Cosmetic',
                    })
                  }}
                >
                  <i className={`far ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`} />
                  <span className="hidden sm:inline">&nbsp;{isDarkTheme ? 'light' : 'dark'}</span>
                </button>
                <button
                  className="std-button py-0.5 text-lg rounded-none rounded-r sm:hidden"
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
            <div className="my-2 text-secondary-dark flex flex-wrap">
              {ButtonTextLink.map(({ text, link }) => DropdownMenuButton({ text, link }))}
            </div>
          </SmoothCollapse>
        </div>
      </div>
    </header>
  );
};

export default Header;
