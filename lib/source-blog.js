const fs = require('fs-extra')
var md = require('markdown-it')({ html: true, linkify: true, typographer: true })

module.exports  = function(dataDir, type,  sourceProps){
  const {actions, createNodeId, createContentDigest } = sourceProps
  const {createNode} = actions

  const BLOG_DIR = `${__dirname}/../src/data/` + dataDir
  return fs.readdir(BLOG_DIR).then(blogNames => {
    return Promise.all(blogNames.map(dir => {
      return Promise.all([
        fs.readFile(`${BLOG_DIR}/${dir}/index.md`),
        fs.readJson(`${BLOG_DIR}/${dir}/metadata.json`),
      ])
      .then(([content, metadata]) => ({content: md.render(content.toString()), ...metadata}))
    }))
  })
  .then(posts => posts.filter(post => post.published))
  .then(blogs => {
    blogs.forEach(blog => {
      const nodeContent = JSON.stringify(blog)
      const nodeMeta = {
        id: createNodeId(`blog-${blog.title}-${blog.timestamp}`),
        parent: null,
        children: [],
        internal: {
          type,
          mediaType: `application/json`,
          content: nodeContent,
          contentDigest: createContentDigest(blog)
        }
      }
      const node = Object.assign({}, blog, nodeMeta)
      createNode(node)
    })
  })
}
