const path = require('path')

const loadPostData = (dir) => {
  let result = {
    component: path.resolve(`${__dirname}/${dir}/index.js`),
    path: dir.replace('./posts', '/blog'),
    dir: path.resolve(`${__dirname}/${dir}`),
  }
  return result
}

module.exports = [
  loadPostData('./posts/wut-hash-function-huh'),
  loadPostData('./posts/for-the-lulz'),
  loadPostData('./posts/5-crucial-vim-plugins'),
  loadPostData('./posts/wut-abstract-data-type-huh'),
  loadPostData('./posts/needy-for-speedy'),
]
