// See: https://www.gatsbyjs.org/docs/node-apis/

require('dotenv').load()

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions, }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        __PRODUCTION__: process.env.NODE_ENV === 'production'
      }),
    ],
  })
}