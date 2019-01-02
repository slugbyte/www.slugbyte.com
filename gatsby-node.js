// See: https://www.gatsbyjs.org/docs/node-apis/
require('dotenv').load()
const sourceBlog = require('./lib/source-blog.js')

exports.sourceNodes = (props) => {
  return Promise.all([
    sourceBlog('blog', 'BlogPost',  props),
    sourceBlog('project', 'ProjectPost',  props),
  ])
}

exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions, }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        __PRODUCTION__: process.env.NODE_ENV === 'production'
      }),
    ],
  })
}
