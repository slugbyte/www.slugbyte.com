import './_wut-hash-function-huh.scss'
import React from 'react'

import {Link} from 'gatsby'
import Layout from '../../layout'
import Observable from '../../observable'
import BlogNav from '../blog-nav.js'

import oContent from './observable-function.js'
import oData from './observable-data.js'
import metadata from './metadata.json'

let expose = {
  stringTo32BitBlocks: `
function stringTo32BitBlocks(string){
  let result = []
  // turn every four bytes into a 32bit number and push to results
  for(let i=0;i<string.length; i+=4){
    let bytes = string.slice(i, i+4).split('').map(c => c.charCodeAt(0))
    let block = (bytes[3] << 16) | (bytes[2] << 12) | (bytes[1] << 8) | bytes[0]
    result.push(block)
  }
  return result
}
`, hash:`
function hash(data){
  // STEP 1 intialize the internal state
  let state = [0xffaaffbb, 0x7fffffff, 0xfabbaafb, 0x40f777a7] // MAGIC NUMBERS
  
  // STEP 2 consume the input data in 32bit blocks (i+=4)
  for(let i=0;i<data.length/*STEP 5 if more data repeat STEP 2*/; i+=4){
    let bytes = data.slice(i, i+4).split('').map(c => c.charCodeAt(0))
    let block = (bytes[3] << 16) | (bytes[2] << 12) | (bytes[1] << 8) | bytes[0]
    
    // STEP 3 and 4 mix the current block with the state and update the state 
    state = mix(state, block)
  } 
  // STEP 6 FINILISE DATA AND RETURN HASH VALUE
  return state.map(n => Math.abs(n).toString(16)).join('')
}
`, mix: `
// This is function generates the points plotted above
function hashedLoremToPoints(){
  let allHashes = hashedLorem.join('')
  let result = []  
  for(var i=0;i<allHashes.length; i+=16){
    // x and y are both 32 bit numbers
    result.push({
      x: parseInt(allHashes.slice(i, i+8), 16), 
      y: parseInt(allHashes.slice(i+8, i+16), 16), 
    })
  }
  return result
}
`, hashedLoremToPoints: `
// This is function generates the points plotted above
function hashedLoremToPoints(){
  let allHashes = hashedLorem.join('')
  let result = []  
  for(var i=0;i<allHashes.length; i+=16){
    // x and y are both 32 bit numbers
    result.push({
      x: parseInt(allHashes.slice(i, i+8), 16), 
      y: parseInt(allHashes.slice(i+8, i+16), 16), 
    })
  }
  return result
}
`,
}

const Page = () => (
  <Layout metadata={metadata}>
    <div className='blog-post'>
      <Observable content={oContent} data={oData} expose={['stringTo32BitBlocks', 'hash', 'mix', 'hashedLoremToPoints']}/>
      <BlogNav metadata={metadata} />
    </div>
  </Layout>
)

export default Page 
