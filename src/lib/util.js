export const log = (...args) => __PRODUCTION__ ? undefined : console.log(...args)
export const logError = (...args) => __PRODUCTION__ ? undefined : console.error(...args)


// for gatsby build
const Image = typeof window === 'undefined' ? function Image(){} : window.Image

// used by ZWdnCg== and for canvas images
export const loadImage = (url) => {
  const img = new Image()
  img.src = url
  return img
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
  let interval = setInterval(() => {
    try {
      cb(...args)
    } catch (e) {
      reject(e)
    }
  }, freq)
  setTimeout(() => {
    clearInterval(interval)
    resolve()
  }, duration)
})

export const smartClass = (options) => {
  return Object.keys(options).filter(key => !!options[key]).join(' ')
}
