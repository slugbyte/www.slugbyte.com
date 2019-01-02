// See: https://www.gatsbyjs.org/docs/node-apis/
require('dotenv').load()
const path = require('path')
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

//exports.onCreateNode = ({ node, getNode, actions }) => {
  //const { createNodeField } = actions
  //if (node.internal.type === 'BlogPost') {
    //console.log('haha', node.internal.type, node)
    ////createNodeField({ node,
      ////name: `slug`,
      ////value: slug,
    ////})
  //}
//}


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve(`${__dirname}/src/components/blog-post/index.js`)
    console.log('blogPostTemplate', blogPostTemplate)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql( `{
        allBlogPost(limit: 1000) {
          edges {
            node {
              url
            }
          }
        }
      }`
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        console.log({creratePageData: result.data})

        // Create blog post pages.
        result.data.allBlogPost.edges.forEach(edge => {
          console.log('create page', edge.node.url)
            createPage({
              path: `${edge.node.url}`, 
              component: blogPostTemplate,
              context: {
                daSlug: edge.node.url,
              },
            })
        })

        return
      })
    )
  })
}
