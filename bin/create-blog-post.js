#!/usr/bin/env node
const fs = require('fs-extra')
const {promisify} = require('es6-promisify')
const prompt = require('prompt')

function pbcopy(data) {
  var proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); proc.stdin.end();
}

prompt.start()
promisify(prompt.get)([
  'url', 
  'title',
  'description',
  'keywords',
  'imageUrl',
])
.then(result => {
  result.title = '/blog/' + result.title
  result.published = true
  result.timestamp = new Date()
  result.keywords = result.keywords.split(', ')
  let json = JSON.stringify(result, null, 2)
  console.log(json)
  pbcopy(json)
})
.catch(console.error)
