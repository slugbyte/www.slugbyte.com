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
    let data = this.props.data
    let runtime = new Runtime()
    let module = data.modules.filter(m => m.id == data.id)[0]
    let vars = module.variables.reduce((r, v) => {
      r[v.name] = v
      return r 
    }, {})

    let oChunkCount = 0 
    runtime.module(this.props.content, name => {
      let container = document.createElement('div')
      if (name) {
        container.className = ('ochunk-' + name).replace(' ', '-').toLowerCase()
      } else {
        container.className = 'ochunk-'+  oChunkCount++
      }
      ref.appendChild(container)
      let next = document.createElement('div')
      container.appendChild(next)
      if (this.props.expose.indexOf(name) > -1){
        let pre = document.createElement('pre')
        let fnText =  vars[name].value.toString().split('\n').slice(1, -1)
        fnText[0] = fnText[0].replace('return ', '')
        fnText = fnText.join('\n')
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
