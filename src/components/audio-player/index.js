import './_audio-player.scss'
import React from 'react'

import offset from '../../lib/offset.js'
import playIcon from './svg/play.svg'
import pauseIcon from './svg/pause.svg'
import resetIcon from './svg/reset.svg'
import forwardIcon from './svg/forward.svg'
import backIcon from './svg/back.svg'

function AudioMock(){
  this.load = () => {}
  this.addEventListener = () => {}
}

const Audio = typeof window === 'undefined' ? AudioMock : window.Audio

let minuteFormat = (seconds) => {
  let minutes = Math.floor(seconds / 60) | '0'
  seconds = Math.floor(seconds % 60) | '0'
  if (seconds < 10 ) 
    seconds = '0' + seconds 
  return minutes + ':' + seconds
}

let PlayIcon = ({onClick, display}) => 
  <svg style={{display: display ? 'block': 'none'}} onClick={onClick} className='play-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.99 29.7"><defs></defs><title>Play</title><g id="play" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path  className="cls-1" d="M.5,1.41s4.15,5.12,5.32,4c4.27-4.31,4.19,3.24,8.4.18,2-1.45.57,5.8,6.41,6,1.94.06,7.41,3,7.41,3A59.15,59.15,0,0,0,21.34,20c-3.53,3.41-5.71.24-7.48.93-4.41,1.71-1.56,5.87-6.58,5.94a16.37,16.37,0,0,0-6.78,2V1.41Z"/></g></g></svg>

let PauseIcon = ({onClick, display}) => 
  <svg style={{display: display ? '': 'none'}} onClick={onClick} className='pause-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.44 29.38"><defs></defs><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_2-2" data-name="Layer 2"><path className="cls-1" d="M7.87.5H.5V28.88H7.87s-1.78-8.34,0-10.15-1.48-6.84,0-9S7.87.5,7.87.5Z"/><path className="cls-1" d="M12.85.5c.25,3.17,5.64,14.83,1.79,14.61-2-.11-1.79,13.77-1.79,13.77h9.09V.5Z"/></g></g></svg>

let ResetIcon = ({onClick}) => 
  <svg onClick={onClick} className='reset-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.35 29.98"><defs></defs><title>Asset 5</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M15.21,27.65S13,22.78,12.41,23.9C10.15,28,10.19,20.81,8,23.73c-1,1.38-.3-5.53-3.38-5.7C3.56,18,.67,15.15.67,15.15A43.85,43.85,0,0,0,4.21,9.94c1.86-3.25,3-.23,4-.89C10.49,7.43,9,3.46,11.64,3.4c1.8,0,3.57-1.85,3.57-1.85V8.17L7.78,14.6l7.43,6.45Z"/><path className="cls-1" d="M28.85,2.33s-2.19,4.87-2.8,3.76c-2.26-4.1-2.22,3.08-4.44.17-1.05-1.38-.3,5.52-3.38,5.69-1,.06-3.92,2.88-3.92,2.88a43.5,43.5,0,0,1,3.54,5.22c1.86,3.24,3,.23,3.95.88,2.33,1.62.82,5.59,3.48,5.66,1.8,0,3.57,1.85,3.57,1.85V21.81l-7.43-6.43,7.43-6.45Z"/></g></g></svg>

let ForwardIcon = ({onClick}) => 
  <svg onClick={onClick} className='forward-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.99 29.7"><defs></defs><title>Asset 3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M.5,28.29s4.15-5.12,5.32-3.95c4.27,4.31,4.19-3.24,8.4-.17,2,1.45.57-5.81,6.41-6,1.94-.06,7.41-3,7.41-3a59.89,59.89,0,0,1-6.7-5.49c-3.53-3.41-5.71-.24-7.48-.92C9.45,7,12.3,2.87,7.28,2.8A16.43,16.43,0,0,1,.5.86v7l14.08,6.75L.5,21.35Z"/></g></g></svg>

let BackIcon = ({onClick}) => 
  <svg onClick={onClick} className='back-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.99 29.7"><defs></defs><title>Asset 4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M28.49,28.29s-4.15-5.12-5.31-3.95c-4.28,4.31-4.2-3.24-8.4-.17-2,1.45-.58-5.81-6.42-6-1.94-.06-7.4-3-7.4-3A60.31,60.31,0,0,0,7.65,9.67c3.53-3.41,5.71-.24,7.48-.92C19.55,7,16.7,2.87,21.72,2.8A16.42,16.42,0,0,0,28.49.86v7L14.42,14.57l14.07,6.78Z"/></g></g></svg>

class AudioPlayer extends React.Component {
  constructor(props){

    let media = new Audio(props.audioURI)
    media.load()

    media.addEventListener('timeupdate', () => {
      let currentProgress = media.currentTime / media.duration * 100 
      if (currentProgress == 100) return this.handleReset()
      this.setState({currentProgress})
    })

    media.addEventListener('loadeddata', () => {
      this.setState({duration: media.duration})
    })
    super(props)
    this.progressRef = React.createRef()
    this.state = {
      media,
      currentProgress: 0,
      displayTracker: 'false',
      playing: false,
      playRate: 1,
    }
  }

  handleRateChage = (e) => {
    this.setState({playRate: e.target.value})
    this.state.media.playbackRate = e.target.value
  }

  handleProgressClick = (e) => {
    //this.setState({currentProgress: e.clientX / this.progressRef.current.cleintWidth * 100})
    let media = this.state.media
    let offsetLeft = offset(this.progressRef.current).left
    let currentProgress = (e.clientX - offsetLeft) / this.progressRef.current.offsetWidth* 100 
    this.setState({currentProgress})
    media.currentTime = media.duration * (currentProgress / 100)
    media.play()
    this.setState({playing: true})
  }

  handlePlayPause = () => {
    if (this.state.playing) {
      this.state.media.pause()
      this.setState({playing: false})
      return 
    }

    this.state.media.play()
    this.setState({playing: true})
  }

  handleReset = () => {
    this.state.media.currentTime = 0
    this.state.media.pause()
    this.setState({playing: false})
  }
  
  handleSeekForward = () => {
    this.state.media.currentTime += 5
  }

  handleSeekBack = () => {
    this.state.media.currentTime -= 5
  }

  handleMouseMove = (e) => {
    //let offsetLeft =  this.progressRef.current.offsetLeft
    //let media = this.state.media
    //let currentProgress = (e.clientX - offsetLeft )  / (this.progressRef.current.offsetWidth )  * 100 
    //this.setState({hoverLocation: currentProgress})
    
    let offsetLeft = offset(this.progressRef.current).left
    let media = this.state.media
    let currentProgress = (e.clientX - offsetLeft)  / (this.progressRef.current.offsetWidth )  * 100 
    this.setState({hoverLocation: currentProgress})
  }

  handleMouseEnter = () => {
    this.setState({ displayTracker: true })
  }
  
  handleMouseLeave = () => {
    this.setState({ displayTracker: false })
  }
  

	componentWillUnmount(){
		this.state.media.pause()
	}
  render(){
    let currentTime = minuteFormat(this.state.media.currentTime)
    let duration = minuteFormat(this.state.media.duration)
        //<p> {minuteFormat(Math.round(this.state.media.currentTime))} / {minuteFormat(this.state.duration)} </p>
    return (
      <div className='audio-player' >
        <h2 className='title'>{this.props.title}</h2>
        <p className='time'> {currentTime} / {duration} </p>
        <div 
          className='progress-container' 
          ref={this.progressRef} 
          onClick={this.handleProgressClick} 
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove} 
          style={{
            background: 'black',
            height: '2em',
          }}> 
          <div className='progress-tracker'  style={{
              height: '100%',
              display: this.state.displayTracker ? 'block': 'none',
              borderRight: '2px solid yellow',
              float: 'left', 
              width: this.state.hoverLocation + '%',
            }}/>
          <div className={'progress-bar' + (this.state.playing ? ' playing' : ' paused') }  style={{
              height: '100%',
              width: this.state.currentProgress + '%',
            }}>
          </div>
        </div>
        <div className='controls' style={{height: '48px'}}>
          <PlayIcon display={!this.state.playing} onClick={this.handlePlayPause} />
          <PauseIcon display={this.state.playing}  onClick={this.handlePlayPause} />
          <ResetIcon onClick={this.handleReset}/>
          <BackIcon onClick={this.handleSeekBack}/>
          <ForwardIcon onClick={this.handleSeekForward} />
          {/* TODO: make a rate slier ? <input type="range" min="0.1" max="2" value={this.state.playRate} onChange={this.handleRateChage} step="0.1" />
          /<p> Rate {this.state.playRate} </p>*/}
        </div>
      </div>
    )
  }
}

export default AudioPlayer
