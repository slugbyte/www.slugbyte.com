import './_art-browser.scss'

import {smartClass} from '../../lib/util.js'
import React from 'react'

let count = 0 
let isRight = false
const artList = require('./art-list.js').default.map((e, i) => {
  if(!!(count % 9 == 0)) {
    isRight = !isRight
    e.isBig = true
    e.isRight = isRight
  } else {
    e.isBig = false
    e.isRight = isRight
  }
  count ++
  return e
})

console.log('artList', artList)

const ArtItem = ({art}) => {
  let className = smartClass({
    'art-item': true,
    'big': art.isBig,
    'is-right': art.isRight,
  })
  return (
    <div className={className}>
      <img src={art.imageURL} alt={art.description} />
    </div>
  )
}

class ArtBrowser extends React.Component {
  constructor(props){
    super(props)
  }
  render(){ 
    return (
      <div className='art-browser'>
        {artList.map((art, i) => <ArtItem key={i} art={art} />)}
      </div>
    )
  }
}

export default ArtBrowser
