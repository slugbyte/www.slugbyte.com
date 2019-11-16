const loadPostData = (dir) => ({
  metadata: require(`${dir}/metadata.json`),
  imageURL: require(`${dir}/cover-image.png`),
})

// newest to oldest
export default [
  loadPostData('./wut-hash-function-huh'),
  loadPostData('./for-the-lulz'),
  loadPostData('./5-crutial-vim-plugins'),
  loadPostData('./wut-abstract-data-type-huh'),
  loadPostData('./day-6-with-the-space-heater'),
]


