import React from 'react'

const LazyImage = ({image, className}) => {
  if (className)
    className += ' lazy-image'
  else 
    className = 'lazy-image'
  return (
    <img 
      className={className}
      alt={image.description} 
      src={image.url}
      style={{
        background: `url(${image.thumbnail})`,
        backgroundSize: 'cover',
      }} />
  )
}

export default LazyImage
