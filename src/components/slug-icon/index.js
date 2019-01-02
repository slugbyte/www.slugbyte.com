import './slug-icon.scss'
import React from 'react'

const SlugIcon = ({name, width='20px', height='', alt}) => {
  console.log('naname', name)
   return (
    <img alt={alt || name} style={{width, height}} className='slug-icon' src={require('../../images/icon/' + name)} /> 
   )
}

export default SlugIcon 
