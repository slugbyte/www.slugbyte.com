import './_art-browser.scss'

import {smartClass} from '../../lib/util.js'
import React from 'react'

let count = 0 
let isLeft = true
const artList = require('./art-list.js').default.map((e, i) => {
  if(!!(count % 9 == 0)) {
    isLeft = !isLeft
    e.isBig = true
    e.isLeft = isLeft
  } else {
    e.isBig = false
    e.isLeft = isLeft
  }
  count ++
  return e
})

console.log('artList', artList)

const ArtItem = ({art}) => {
  let className = smartClass({
    'art-item': true,
    'big': art.isBig,
    'is-left': art.isLeft,
    'is-right': !art.isLeft,
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
