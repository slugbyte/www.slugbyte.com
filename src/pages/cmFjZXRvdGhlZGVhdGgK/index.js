import './egg.scss'
import React from 'react'
import egg from '../../lib/egg'
// TODO: make a topdown car racer game

class Egg extends React.Component {
  componentDidMount(){
    let canvas = document.getElementById('egg-canvas')
    let ctx = canvas.getContext('2d') 
    //ctx.imageSmoothingEnabled = false;
    //ctx.webkitImageSmoothingEnabled = false;
    canvas.width = '256'
    canvas.height = '128'
    console.log({ctx, canvas})
    egg(ctx)
  }

  render() {
    return (
      <div className='egg'>
        <div className='computer'>
            <main className='screen'>
              <canvas id='egg-canvas' left='0px' top='0px' />
              <footer>
                <nav>
                  <button>
                  </button>
                </nav>
              </footer>
          </main>
          <div className='power-switch'>
            <input type='checkbox' id='computer-power-switch' />
            <label for='computer-power-switch' />
            <div />
          </div>
        </div>
      </div>
    )
  }
}

export default Egg
