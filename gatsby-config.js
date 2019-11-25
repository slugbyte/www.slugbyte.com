module.exports = {
  siteMetadata: {
    title: 'slugbyte.com',
    siteUrl: 'https://www.slugbyte.com',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    `gatsby-plugin-sitemap`,
		{
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.slugbyte.com',
        sitemap: 'https://www.example.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `art`,
        path: `${__dirname}/src/asset/image/art`,
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
        icon: 'src/asset/image/icon/slugbyte-icon.png', // browser tab icon
      },
    },
  ],
}
