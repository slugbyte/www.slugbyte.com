const path = require('path')

const blogPosts = require('./create-post-pages.js').map(post => {
  return {
    metadata: require(`${__dirname}${post.dir}/metadata.js`).default,
    image: {
      url: require(`${__dirname}${post.dir}/cover-image.png`), 
      thumbnail: require(`${__dirname}${post.dir}/thumbnail.png`),
    },
  }
})

export default blogPosts