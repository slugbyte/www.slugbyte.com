const path = require('path')

const loadPostData = (dir, buildMode) => {
  let result = {}
  if (!buildMode) result.imageURL = require(`${dir}/cover-image.png`) // will crash gastby build if ran cuz no babel
  result.component = path.resolve(`${__dirname}/${dir}/index.js`)
  result.metadata = require(`${dir}/metadata.json`)
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
