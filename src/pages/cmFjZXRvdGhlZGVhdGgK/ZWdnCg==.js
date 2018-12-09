import {random} from 'lodash/fp'
import metadata from './metadata.js'
import * as util from '../../lib/util.js'

const state  = {
  ctx: null,
  spriteSheet: util.loadImage(require('../../images/egg.png')),
  startupScreen: util.loadImage(require('../../images/egg-computer-startup-screen-icon.png')),
  gameStartScreen: util.loadImage(require('../../images/egg-race-to-the-death-start-screen.png')),
  gameMenuScreen: util.loadImage(require('../../images/egg-rttd-menu-screen.png')),
  gameHelpScreen: util.loadImage(require('../../images/egg-rttd-help-screen.png')),
  startupSound: new Audio(require('./assets/egg-startup-sound.mp3')),
  intervalIDCache: [],
}

export const delayFor = (ms, cb, ...args) => new Promise((resolve, reject) => {
   setTimeout(() => {
     try {
       resolve(cb)
     } catch(e) {
       reject(e)
     }
   }, ms)
})

export const repeatFor = (duration, freq, cb, ...args) => new Promise((resolve, reject) => {
  let intervalID = setInterval(() => {
    try {
      cb(...args)
    } catch (e) {
      reject(e)
    }
  }, freq)
  state.intervalIDCache.push(intervalID)
  setTimeout(() => {
    clearInterval(intervalID)
    resolve()
  }, duration)
})

const drawRandomSquare = (size) => {
  let x = random(0, metadata.width / size) * size
  let y = random(0, metadata.height / size) * size 
  let color = `rgb(${random(80, 255)},${random(80, 255)},${random(80, 255)})`
  state.ctx.fillStyle = color
  state.ctx.fillRect(x, y, size, size)
}

const drawSprite = (id, x, y) => {
  let verticleOffset = id < 5 ? 0 : id < 9 ? 1 : id < 13 ? 2 : 3   
  let horizontalOffset = (id % 4) - 1 
  horizontalOffset =  horizontalOffset > -1 ? horizontalOffset : 3 
  state.ctx.drawImage(state.spriteSheet, horizontalOffset * 16, verticleOffset * 16, 16, 16, x, y, 16, 16)
}

const createDrawScreenImage = (image) => () => {
  state.ctx.drawImage(image, 0, 0, metadata.width, metadata.height)
}
const drawStartupScreen = createDrawScreenImage(state.startupScreen)
const drawGameStartScreen = createDrawScreenImage(state.gameStartScreen)
export const drawGameMenuScreen = createDrawScreenImage(state.gameMenuScreen)
export const drawGameHelpScreen = createDrawScreenImage(state.gameHelpScreen)
export const drawBlackOutScreen = () => {
  state.ctx.fillStyle = '#000'
  state.ctx.fillRect(0, 0, metadata.width, metadata.height)
}

export const setupEngine = (ctx) => {
  state.ctx = ctx
  //drawGameMenuScreen()
}


export const stopEverything = () => {
  state.startupSound.pause()
  state.startupSound = new Audio(require('./assets/egg-startup-sound.mp3'))
  state.intervalIDCache.forEach(clearInterval)
  state.intervalIDCache = []
}

export const drawBootSequence = () => {
  util.log('start boot sequence')
  drawBlackOutScreen()
  state.startupSound.play()
  return Promise.all([
    util.repeatFor(2000, 30, drawRandomSquare, 8),
    util.repeatFor(2000, 25, drawRandomSquare, 16),
    util.repeatFor(2000, 100, drawRandomSquare, 32),
  ])
  .then(() => {
    drawStartupScreen()
    return util.delayFor(2000)
  })
  .then(() => util.repeatFor(350, 5, drawRandomSquare, 16))
  .then(() => drawBlackOutScreen())
}

const gameState = {
  showMenu: false,
}

const gameLoop = () => {
  
}

export const drawGameStartSequence = () => {
  util.log('game start sequence')
  drawBlackOutScreen()
  drawGameStartScreen()
  return util.delayFor(2000)
  .then(() => drawGameMenuScreen())
  //.then(() => {
    //state.ctx.canvas.addEventListener('click', (e) => {
      //util.log({e})
    //})
  //})
}
