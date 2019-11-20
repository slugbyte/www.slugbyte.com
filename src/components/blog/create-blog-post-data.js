const path = require('path')

const loadPostData = (dir, buildMode) => {
  let result = {}
  result.component = path.resolve(`${__dirname}/${dir}/index.js`)
  result.metadata = require(`${dir}/metadata.json`)
  if (!buildMode) // will crash gastby build if ran cuz no babel
    result.image = {
      url: require(`${dir}/cover-image.png`), 
      thumbnail: require(`${dir}/thumbnail.png`),
      description: result.metadata.description,
    }
  return result
}

// newest to oldest
module.exports = (options={}) => {
  let {buildMode} = options
  return [
    loadPostData('./wut-hash-function-huh', buildMode),
    loadPostData('./for-the-lulz', buildMode),
    loadPostData('./5-crutial-vim-plugins', buildMode),
    loadPostData('./wut-abstract-data-type-huh', buildMode),
    loadPostData('./day-6-with-the-space-heater', buildMode),
  ]
}
