import {random} from 'lodash/fp'
// grab assets

// SLOW REFRESH RATE
// SICK SOUND TRACK 
// GENERATIVE MAP 
// 16x16 PIXEL ART FROM 64x64 SPRITE SHEET 
// CARNAGE 

//import {log, logError} from './


const spriteSheet = new Image()
spriteSheet.src = require('../../images/egg.png')

const startupScreen = new Image()
startupScreen.src = require('../../images/egg-computer-startup-screen-icon.png')

const bindDrawRandomSquareCreator = (ctx) => (size) => () => {
  let x = random(0, 256 / size) * size
  let y = random(0, 128 / size) * size 
//
  let color = `rgb(${random(80, 255)},${random(80, 255)},${random(80, 255)})`
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
  console.log({size, x, y})
}
//const bindDrawRandom16x16Square = (ctx) => () => {
  //let x = random(0, 16) * 16
  //let y = random(0, 8) * 16 

  //let color = `rgb(${random(80, 255)},${random(80, 255)},${random(80, 255)})`

  //ctx.fillStyle = color
  //ctx.strokeStyle = 'none'
  ////console.log({x, y, color, ctx})

  //ctx.fillRect(x, y, 16, 16)
//}

const bindDrawSprite = (ctx) => (id, x, y, width, height) => {
  let verticleOffset = id < 5 ? 0 : id < 9 ? 1 : id < 13 ? 2 : 3   
  let horizontalOffset = (id % 4) - 1 
  horizontalOffset =  horizontalOffset > -1 ? horizontalOffset : 3 
  ctx.drawImage(spriteSheet, horizontalOffset * 16, verticleOffset * 16, 16, 16, x, y, width, height)
  console.log({id, verticleOffset, horizontalOffset})
}

const drawStartupScreen = (ctx) => {
  ctx.drawImage(startupScreen, 0, 0, 256, 128)
  console.log('booyee')
}

const bindFillBackground = (ctx) => (id) => {
  let drawSprite = bindDrawSprite(ctx)
  for (let x=0; x<16; x++){
    for(let y=0; y<8; y++){
      drawSprite(id, x * 16, y * 16, 16, 16) 
    }
  }
}

export default (ctx) => {
  ctx.drawImage(spriteSheet, 0, 0, 16, 16, 0, 0, 16, 16)
  ctx.drawImage(spriteSheet, 48, 48, 16, 16, 0, 0, 16, 16)

  window.drawSprite = bindDrawSprite(ctx)
  window.fillBackground = bindFillBackground(ctx)
  bindDrawSprite(ctx)(11, 50, 0, 16, 16) 
  //console.log(drawSprite(1), drawSprite(6), drawSprite(11), drawSprite(4))
  //drawStartupScreen(ctx)

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, 255, 128)

  let interval8 = setInterval(() => bindDrawRandomSquareCreator(ctx)(8)(), 30)
  let interval16 = setInterval(() => bindDrawRandomSquareCreator(ctx)(16)(), 25)
  let interval32 = setInterval(() => bindDrawRandomSquareCreator(ctx)(32)(), 100)

  setTimeout(() => {
    clearInterval(interval8) 
    clearInterval(interval16) 
    clearInterval(interval32) 
    drawStartupScreen(ctx)
    setTimeout(() => {
      let interval = setInterval(() => bindDrawRandomSquareCreator(ctx)(16)(), 5)
      setTimeout(() => {
          clearInterval(interval) 
          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, 255, 128)
          // wait for user click too start game
      }, 350)
    }, 2000)
    
  }, 2000)
    

  

  console.log({spriteSheet, ctx})

  // clear contect
  // play startup screen 
  // show main menu 
  //    -> play 
  //    -> quit 
  //    -> (easter in an easter) ? 
  // show select car scene
  // show three two one go 
  // generate track 
  // show death screen
  // when user dies generate score based on time alive 
  // show a leader board (three letter names) (stored in local storage)
  //     & show try again / main menu buttons
}
