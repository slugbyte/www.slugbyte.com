const path = require('path')

const loadPostData = (dir) => {
  let result = {
    component: path.resolve(`${__dirname}/${dir}/index.js`),
    path: dir.replace('.', '/blog'),
    dir: path.resolve(`${__dirname}/${dir}`),
  }
  return result
}

module.exports = [
  loadPostData('./wut-hash-function-huh'),
  loadPostData('./for-the-lulz'),
  loadPostData('./5-crucial-vim-plugins'),
  loadPostData('./wut-abstract-data-type-huh'),
  loadPostData('./needy-for-speedy'),
]
