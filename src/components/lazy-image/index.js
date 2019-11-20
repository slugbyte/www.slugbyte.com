import React from 'react'

const LazyImage = ({image}) => {
  return (
    <img 
      className='lazy-image'
      alt={image.description} 
      src={image.url}
      style={{
        background: `url(${image.thumbnail})`,
        backgroundSize: 'cover',
      }} />
  )
}

export default LazyImage
