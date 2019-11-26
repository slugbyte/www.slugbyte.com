const path = require('path')

const allPostMetadata = require('./create-page-data.js').map(post => {
  let metadata = require(`${__dirname}${post.dir}/metadata.js`).default
  return {
    metadata, 
    image: {
      url: require(`${__dirname}${post.dir}/cover-image.png`), 
      thumbnail: require(`${__dirname}${post.dir}/thumbnail.png`),
      description: metadata.description,
    },
  }
})

export default allPostMetadata
