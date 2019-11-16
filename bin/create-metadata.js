#!/usr/bin/env node

const fs = require('fs-extra')
const {promisify} = require('es6-promisify')
const prompt = require('prompt')

function pbcopy(data) {
  var proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); proc.stdin.end();
}

function isYes(text) {
  if (['YES', 'YES'].indexOf(text.toUpperCase()) > -1) return true 
  return false
}

function toURL(text){
  let url = text.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-') 
  if (!url.startsWith('/')) url = '/' + url
  return url
}

prompt.start()
promisify(prompt.get)({ 
  properties: {
    title: {
      required: true,
      type: 'string',
    },
    description: {
      required: true,
      type: 'string',
    },
    keywords: {
      message: 'enter space seporated keywords: (optional)', 
    },
    customURL: {
      message: 'set a custom url? (optional)', 
    },
    isBlogPost: {
      description: 'is it a blog post? (y/n*)', 
      ask:() => {
        return !prompt.history('customURL').value
      },
    },
    shouldOutput: {
      //type: 'boolean',
      description: 'write metadata to file? (y/n*)'
    },
  },
})
.then(result => {
  let url = result.url  ? toURL(result.url) : toURL(result.title)
  if (isYes(result.isBlogPost)) url = '/blog' + url

  let metadata = {
    title: result.title.trim(),
    url,
    description: result.description.trim(),
    published: true,
    timestamp: new Date(),
    keywords: result.keywords.split(' ').filter(keyword => keyword),
  }

  let json = JSON.stringify(metadata, null, 2)
  console.log(json)
  if(isYes(result.shouldOutput)) {
    fs.writeFile(`${process.cwd()}/metadata.json`, json)
    console.log(`wrote output to ${process.cwd()}/metadata.json`)
  } else {
    pbcopy(json)
    console.log(`copyed metadata.json to clipboard`)
  }
})
.catch(console.error)
