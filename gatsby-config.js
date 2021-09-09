require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.timothynewman.co.uk',
    title: 'Personal Website',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'tracedSVG',
          tracedSVGOptions: { color: '#653815', background: '#fbf3ed', turdSize: 10 },
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.GATSBY_API_URL || 'http://localhost:1337',
        collectionTypes: ['projectpost', 'blogpost', 'gallery', 'tag', 'socialMedia'],
        singleTypes: ['welcomenote', 'aboutpagecontent', 'global'],
        queryLimit: 200,
        loginData: {
          identifier: process.env.API_USERNAME,
          password: process.env.API_PWD,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Timothy Newman Website',
        short_name: 'Timothy Newman',
        start_url: '/',
        theme_color: '#653815',
        background_color: '#653815',
        display: 'standalone',
        icon: './src/images/icons/android-chrome-512x512.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
