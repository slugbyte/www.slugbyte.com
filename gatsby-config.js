module.exports = {
  siteMetadata: {
    title: 'slugbyte.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    //{
      //resolve: `gatsby-source-filesystem`,
      //options: {
        //name: `images`,
        //path: `${__dirname}/src/images`,
      //},
    //},
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `art`,
        path: `${__dirname}/src/images/art`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tune`,
        path: `${__dirname}/src/asset/tune`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        lang: 'en',
        name: 'Slugbyte',
        short_name: 'Slugbyte',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'minimal-ui',
        icon: 'src/images/slugbyte-icon.png', // This path is relative to the root of the site.
      },
    },
  ],
}
