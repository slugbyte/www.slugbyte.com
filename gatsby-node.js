// See: https://www.gatsbyjs.org/docs/node-apis/
require('@babel/register')
require('dotenv').load()

exports.createPages = ({actions}) => {
  const {createPage} = actions
  const postData = require('./src/components/blog/create-post-pages.js')
  console.log('postData', postData)
  postData.forEach(post => {
    createPage({
      path: post.path,
      component: post.component,
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions, }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: 'raw-loader', 
        },
      ],
    },
    plugins: [
      plugins.define({
        __PRODUCTION__: process.env.NODE_ENV === 'production'
      }),
    ],
  })
}
