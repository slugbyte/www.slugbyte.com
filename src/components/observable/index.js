import React from 'react'
import uuid from 'uuid/v1'
import {Runtime, Inspector} from '@observablehq/runtime'


class Observable  extends React.Component {
  constructor(props){
    super(props)
    this.randomID = uuid()
  }

  componentDidMount(){
    let ref = document.getElementById(this.randomID)
    let runtime = new Runtime()

    let oChunkCount = 0 
    runtime.module(this.props.content, name => {
      let container = document.createElement('div')
      if (name) {
        try {
        container.className = ('ochunk-' + name).replace(' ', '-').toLowerCase()
        } catch(e) {
          console.error(e)
        }
      } else {
        container.className = 'ochunk-'+  oChunkCount++
      }
      ref.appendChild(container)
      let next = document.createElement('div')
      container.appendChild(next)

      let exposeNames = Object.keys(this.props.expose)
      if (exposeNames.indexOf(name) > -1){
        let pre = document.createElement('pre')
        let fnText = this.props.expose[name].trim()
        pre.textContent = fnText
        container.appendChild(pre)
      }
      ref.className = name
      return new Inspector(next)
    })

  }

  render(){
    return (
      <div className='observable-container'>
        <div id={this.randomID} />
      </div>
    )
  }
}

export default Observable
