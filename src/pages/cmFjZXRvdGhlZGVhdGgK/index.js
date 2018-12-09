import './ZWdnCg==.scss'

import React from 'react'
import {Link} from 'gatsby'
import egg from './ZWdnCg==.js'
import metadata from './metadata.js'

import { 
  setupEngine, 
  stopEverything,
  drawBootSequence, 
  drawBlackOutScreen,
  drawGameHelpScreen,
  drawGameMenuScreen,
  drawGameStartSequence,
} from './ZWdnCg==.js'

class Egg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      computerOn: false,
      showMenu: false,
      showMenuToggle: false,
      showGameMenu: false,
      showBackButton: false,
    }
  }

  componentDidUpdate(){
    console.log({__STATE__: this.state})
  }

  togglePower = () => {
    if(!this.state.computerOn){
      this.setState(state => ({ 
        computerOn: !state.computerOn,
        showMenuToggle: false,
      }))
      console.log('wat')
      drawBootSequence()
      .then(() => {
        console.log('show startup button')
        this.setState({showMenuToggle: true})
      })
    } else {
      stopEverything()
      this.setState(state => ({ 
        computerOn: !state.computerOn,
        showMenuToggle: false,
      }))
    }
  }

  toggleMenu = () => {
    this.setState(state => ({ showMenu: !state.showMenu }))
  }

  bootGame = () => {
    this.setState(state => ({ showMenu: !state.showMenu }))
    drawGameStartSequence()
    .then(() => {
      this.setState({showGameMenu: true})
    })
  }

  handleBackClick = () => {
    this.setState({showGameMenu: true, showBackButton: false})
    drawGameMenuScreen()
  }

  handleHelpClick = () => {
    this.setState({showGameMenu: false, showBackButton: true})
    drawGameHelpScreen()
  }

  handleQuitClick = () => {
  }

  handlePlayClick = () => {
  }

  componentDidMount(){
    let canvas = document.getElementById('egg-canvas')
    let ctx = canvas.getContext('2d') 
    canvas.width = metadata.width
    canvas.height = metadata.height
    setupEngine(ctx)
  }

  render() {
    return (
      <div className='egg'>
        <div className='computer'>
            <main className='screen'>
              <div className={this.state.computerOn ? '' : 'hide'}>
                <canvas id='egg-canvas' left='0px' top='0px' />
                <button className={'back-btn' + (this.state.showBackButton ? '' : ' hide')} onClick={this.handleBackClick}>BACK</button>
                <div className={'game-menu' + (this.state.showGameMenu ? '' : ' hide')}>
                  <button className='play-btn' onClick={this.handlePlayClick}>PLAY</button>
                  <button className='help-btn' onClick={this.handleHelpClick}>HELP</button>
                  <button className='quit-btn' onClick={this.handleQuitClick}>QUIT</button>
                </div>
                <footer>
                  <nav >
                    <button className={this.state.showMenuToggle ? '' : 'hide'} onClick={this.toggleMenu} />
                    <ul className={this.state.showMenu ? '' : 'hide'}>
                      <li onClick={this.bootGame}>RTTD</li>
                      <li><Link tabIndex='-1' to='/'>SHUTDOWN</Link></li>
                    </ul>
                  </nav>
                </footer>
              </div>
          </main>
          <div className='power-switch'>
            <input onChange={this.togglePower} type='checkbox' id='computer-power-switch' />
            <label htmlFor='computer-power-switch' />
            <div />
          </div>
        </div>
      </div>
    )
  }
}

export default Egg
