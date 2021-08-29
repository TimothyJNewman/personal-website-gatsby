require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.timothynewman.co.uk",
    title: "Personal Website",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.API_URL || 'http://localhost:1337',
        collectionTypes: ["Projectpost", "Blogpost", "Gallery", "Tag", "SocialMedia"],
        singleTypes: ["Welcomenote", "Aboutpagecontent", "Global"],
        queryLimit: 1000,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Timothy Jabez Newman Website",
        short_name: "Tim Newman",
        start_url: "/",
        theme_color: "#653815",
        background_color: "#653815",
        display: "standalone",
        icons: [{
          "src": "/icons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/icons/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
        ],
      },
    },
    "gatsby-plugin-offline"
  ],
};
