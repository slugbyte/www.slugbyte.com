import './_art-browser.scss'

import {smartClass} from '../../lib/util.js'
import React from 'react'
import LazyImage from '../lazy-image'

let count = 0 
let isRight = false
const artList = require('./art-list.js').default
  .sort(() => Math.random() > 0.5 ? -1 : 1)
  .map((e, i) => {
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

const ArtItem = ({art, onClick}) => {
  let className = smartClass({
    'art-item': true,
    'big': art.isBig,
    'is-right': art.isRight,
  })
  return (
    <div onClick={() => onClick(art)} className={className}>
      <LazyImage image={art} />
    </div>
  )
}

class ArtBrowser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: null,
    }
  }

  handleSelectArt = (art) => {
    this.setState({selected: art})
    console.log('wam')
  }

  handleUnselectArt = () => {
    this.setState({selected: null})
    console.log('wamy')
  }

  render(){ 
    return (
      <div className='art-browser'>
        { this.state.selected ? (
          <div onClick={this.handleUnselectArt} className='selected'>
            <ArtItem 
              onClick={this.handleUnselectArt} 
              art={this.state.selected} 
              selected /> 
            <p>click anywhere to close</p>
          </div>
        ) : '' }
        <div className='art-item-container clearfix'>
        {artList.map((art, i) => 
           <ArtItem 
              key={i} 
              onClick={this.handleSelectArt} 
              art={art} />)}
        </div>
      </div>
    )
  }
}

export default ArtBrowser
