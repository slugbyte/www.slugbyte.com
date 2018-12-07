import './egg.scss'
import React from 'react'
// TODO: make a topdown car racer game

class Egg extends React.Component {
  componentDidMount(){
    let canvas = document.getElementById('egg-canvas')
    let ctx = canvas.getContext('2d') 
    console.log({ctx, canvas})
  }

  render() {
    return (
      <div className='egg'>
        <h1>you found the egg</h1>
        <canvas id='egg-canvas' left='0px' top='0px' />
      </div>
    )
  }
}

export default Egg
